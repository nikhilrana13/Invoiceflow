const {Worker} = require("bullmq");
const Invoice = require("../models/invoice.Model.js");
const GenerateInvoicePDF = require("../services/pdfService.js");
const uploadInvoicePDF = require("../services/imageKitService.js");
const SendInvoiceOnEmail = require("../services/emailService.js");
const redis = require("../config/redis.js");


const InvoiceWorker = new Worker('invoice-queue',async(job)=>{
    const { invoiceId } = job.data; 
    console.log( `Processing invoice: ${invoiceId}` );
    // find invoice
    const invoice = await Invoice.findById(invoiceId); 
    if (!invoice){ 
        throw new Error( `Invoice not found: ${invoiceId}` ); 
    }
    // mark invoice as processing
    await Invoice.findByIdAndUpdate(invoiceId,{ 
        status: "processing", error: null, 
    });
      try {
      // Generate PDF
      const pdfBuffer = await GenerateInvoicePDF(invoice);
      console.log(`PDF generated: ${invoiceId}`);
      // Upload PDF to ImageKit
      const uploadedPDF = await uploadInvoicePDF(
        pdfBuffer,
        invoiceId
      );
      console.log(`PDF uploaded: ${invoiceId}`);
      // Save PDF details
      invoice.pdfUrl = {
        url: uploadedPDF.url,
        fileId: uploadedPDF.fileId,
      };
      await invoice.save();
      // Send email
      await SendInvoiceOnEmail({
        email: invoice.billedTo.customerEmail,
        customerName: invoice.billedTo.customerName,
        pdfUrl: uploadedPDF.url,
        invoiceId,
        total:invoice.total,
      });
      console.log(`Invoice email sent: ${invoiceId}`);
      // Mark completed
      await Invoice.findByIdAndUpdate(invoiceId, {
        status: "completed",
        emailStatus: "sent",
        completedAt: new Date(),
        error: null,
      });
      console.log(`Invoice completed: ${invoiceId}`);
      return {
        success: true,
        invoiceId,
        pdfUrl: uploadedPDF.url,
      };
    } catch (error) {
      console.error(`Invoice processing failed: ${invoiceId}`,error);
       // BullMQ starts attempts Made from 0.
      // If attempts = 3, final attempt has attempts Made = 2.
      const maxAttempts = job.opts.attempts || 1;
      const currentAttempt = job.attemptsMade + 1;

      if (currentAttempt >= maxAttempts) {
        await Invoice.findByIdAndUpdate(invoiceId, {
          status: "failed",
          error: error.message,
        });
      }
      // Important:
      // Re-throw so BullMQ performs retry.
      throw error;
    }
  },{
    connection:redis,
    // worker run  5 invoice jobs at a time
    concurrency: 5,
  });

  InvoiceWorker.on("completed", (job) => {
  console.log(`Invoice job completed: ${job.id}`);
  });

  InvoiceWorker.on("failed", (job, error) => {
  console.error(`Invoice job failed: ${job?.id}`,error.message
  );
});

InvoiceWorker.on("error", (error) => {
  console.error("Invoice worker error:", error);
});

console.log("Invoice worker is running...");

module.exports = InvoiceWorker
const Invoice = require("../models/invoice.Model.js");
const invoiceQueue = require("../queues/invoiceQueue.js");
const mongoose = require("mongoose")

// create invoice
const CreateInvoice = async (req, res) => {
  try {
    const {businessName,businessEmail,businessAddress,billedTo,items,tax,discount} = req.body;
    // calculate item totals
    const processedItems = items.map((item) => {
      const totalAmount = Math.round(item.quantity * item.price * 100) / 100;
      return {
        name: item.name.trim(),
        quantity: item.quantity,
        price: item.price,
        totalAmount,
      };
    });
    // calculate sub total
    const subtotal = processedItems.reduce(
      (sum, item) => sum + item.totalAmount,
      0,
    );
    const roundedSubtotal = Math.round(subtotal * 100) / 100;
    //  calculate final total
    const calculatedTotal = roundedSubtotal + tax - discount;
    const total = Math.round(calculatedTotal * 100) / 100;
    // safety check
    if (!Number.isFinite(total) || total < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid invoice total" });
    }
    // invoice create
    const invoice = await Invoice.create({
      businessName: businessName.trim(),
      businessEmail: businessEmail.trim().toLowerCase(),
      businessAddress: businessAddress ? businessAddress.trim() : "NA",
      billedTo: {
        customerName: billedTo.customerName.trim(),
        customerEmail: billedTo.customerEmail.trim().toLowerCase(),
      },
      items: processedItems,
      subtotal: roundedSubtotal,
      tax,
      discount,
      total,
      status: "pending",
      emailStatus: "pending",
    });
    // add background jobs
    try {
      await invoiceQueue.add(
        "generate-invoice",
        {
          invoiceId: invoice._id.toString(),
        },
        {
          attempts: 3,
          // delay: 60 * 1000, // 1 minute delay
          backoff: {
            type: "exponential",
            delay: 5000,
          },
          removeOnComplete: { age: 24 * 60 * 60 },
          removeOnFail: { age: 7 * 24 * 60 * 60 },
        },
      );
    } catch (queueError) {
      console.error("Invoice queue error:", queueError);
      await Invoice.findByIdAndUpdate(invoice._id, {
        status: "failed",
        error: "Failed to queue invoice processing",
      });
      return res.status(503).json({
        success: false,
        message: "Invoice created but could not be queued for processing",
        invoiceId: invoice._id,
      });
    }
    return res.status(201).json({
        success: true,
        message:"Invoice created successfully. Your customer will receive the invoice within 10 minutes. If the invoice is not received, please contact us at help@invoiceflow.com with your invoice number.",
        invoiceId: invoice._id,
        status: invoice.status,
      });
  } catch (error) {
    // Mongoose validation error
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400)
        .json({
          success: false,
          message: "Invalid invoice data",
          errors: Object.values(error.errors).map((err) => err.message),
        });
    }
    console.error("CreateInvoice error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create invoice" });
  }
};

module.exports = CreateInvoice;

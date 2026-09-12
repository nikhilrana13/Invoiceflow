const dotenv = require("dotenv") 
const nodemailer = require("nodemailer") 
const fs = require("fs");
const path = require("path");

const invoiceTemplatePath = path.join(
  __dirname,
  "../templates/invoice/invoice.html"
);

const invoiceCssPath = path.join(
  __dirname,
  "../templates/invoice/invoice.css"
);

const invoiceTemplate = fs.readFileSync(
  invoiceTemplatePath,
  "utf8"
);

const invoiceCss = fs.readFileSync(
  invoiceCssPath,
  "utf8"
);

dotenv.config()

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.PASS_USER,
    }
})

transporter.verify((error, success) => {
  if (error) {
    console.log("Gmail services connection failed");
  } else {
    console.log("Gmail configured properly and ready to send email");
  }
});

const SendInvoiceOnEmail = async({email,customerName,pdfUrl,invoiceId,total})=>{
        if (!email || !pdfUrl || !invoiceId){ 
            throw new Error( "Email, PDF URL and Invoice ID are required" ); 
     }
      const formattedTotal = typeof total === "number" ? `₹${total.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : null;
      const html = invoiceTemplate
      .replace("{{CSS}}", invoiceCss)
  .replace("{{CUSTOMER_NAME}}", customerName || "there")
  .replace("{{INVOICE_ID}}", invoiceId)
  .replace("{{TOTAL}}", formattedTotal)
  .replace(/{{PDF_URL}}/g, pdfUrl)
  .replace("{{YEAR}}", new Date().getFullYear());
     
    //  send email
   const info = await transporter.sendMail({
        from: `Invoiceflow <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Invoice from InvoiceFlow",
        html: html,
    })
    console.log( `Invoice email sent: ${info.messageId}` ); 
    return { success: true, messageId: info.messageId, };
}

module.exports = SendInvoiceOnEmail
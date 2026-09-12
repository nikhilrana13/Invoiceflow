
const PDFDocument = require("pdfkit");

/**
 * Generate professional invoice PDF
 *
 * @param {Object} invoice
 * @returns {Promise<Buffer>}
 */
const GenerateInvoicePDF = (invoice) => {
  return new Promise((resolve, reject) => {
    try {
      if (!invoice) {
        return reject(
          new Error("Invoice data is required")
        );
      }

      if (!invoice.items || !Array.isArray(invoice.items)) {
        return reject(
          new Error("Invoice items are required")
        );
      }

      const chunks = [];

      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        bufferPages: true,
      });
      // -----------------------------------------
      // Collect PDF data
      // -----------------------------------------

      doc.on("data", (chunk) => {
        chunks.push(chunk);
      });

      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });

      doc.on("error", (error) => {
        reject(error);
      });

      // -----------------------------------------
      // Helpers
      // -----------------------------------------

      const formatCurrency = (amount = 0) => {
        return `₹${Number(amount).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      };

      const formatDate = (date) => {
        return new Date(date).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        );
      };

      const pageWidth =
        doc.page.width -
        doc.page.margins.left -
        doc.page.margins.right;

      // -----------------------------------------
      // Header
      // -----------------------------------------

      doc
        .fontSize(26)
        .font("Helvetica-Bold")
        .text("INVOICE", 50, 50);

      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#666666")
        .text(
          "InvoiceFlow",
          50,
          82
        );

      // Invoice information
      doc
        .fillColor("#000000")
        .fontSize(10)
        .font("Helvetica-Bold")
        .text(
          "Invoice ID",
          400,
          52
        );

      doc
        .font("Helvetica")
        .text(
          invoice._id.toString(),
          400,
          67,
          {
            width: 145,
          }
        );

      doc
        .font("Helvetica-Bold")
        .text(
          "Date",
          400,
          88
        );

      doc
        .font("Helvetica")
        .text(
          formatDate(invoice.createdAt || new Date()),
          400,
          103
        );

      // -----------------------------------------
      // Divider
      // -----------------------------------------

      doc
        .moveTo(50, 135)
        .lineTo(545, 135)
        .strokeColor("#dddddd")
        .stroke();

      // -----------------------------------------
      // Business / Customer information
      // -----------------------------------------

      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .fillColor("#666666")
        .text(
          "FROM",
          50,
          160
        );

      doc
        .fontSize(13)
        .font("Helvetica-Bold")
        .fillColor("#000000")
        .text(
          invoice.businessName,
          50,
          180,
          {
            width: 220,
          }
        );

      doc
        .fontSize(10)
        .font("Helvetica")
        .text(
          invoice.businessEmail,
          50,
          200,
          {
            width: 220,
          }
        );

      if (invoice.businessAddress) {
        doc.text(
          invoice.businessAddress,
          50,
          216,
          {
            width: 220,
          }
        );
      }

      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .fillColor("#666666")
        .text(
          "BILL TO",
          320,
          160
        );

      doc
        .fontSize(13)
        .font("Helvetica-Bold")
        .fillColor("#000000")
        .text(
          invoice.billedTo.customerName,
          320,
          180,
          {
            width: 225,
          }
        );

      doc
        .fontSize(10)
        .font("Helvetica")
        .text(
          invoice.billedTo.customerEmail,
          320,
          200,
          {
            width: 225,
          }
        );

      // -----------------------------------------
      // Items Table
      // -----------------------------------------

      const tableTop = 270;

      const columns = {
        item: 50,
        quantity: 330,
        price: 400,
        amount: 480,
      };

      // Table header background
      doc
        .rect(
          50,
          tableTop,
          pageWidth,
          30
        )
        .fill("#f3f4f6");

      doc
        .fillColor("#333333")
        .fontSize(9)
        .font("Helvetica-Bold");

      doc.text(
        "ITEM",
        columns.item + 8,
        tableTop + 10
      );

      doc.text(
        "QTY",
        columns.quantity,
        tableTop + 10
      );

      doc.text(
        "PRICE",
        columns.price,
        tableTop + 10
      );

      doc.text(
        "AMOUNT",
        columns.amount,
        tableTop + 10
      );

      // -----------------------------------------
      // Table rows
      // -----------------------------------------

      let currentY = tableTop + 30;

      doc.font("Helvetica").fontSize(9);

      invoice.items.forEach((item) => {
        const rowHeight = 35;

        // Row divider
        doc
          .moveTo(50, currentY + rowHeight)
          .lineTo(545, currentY + rowHeight)
          .strokeColor("#e5e7eb")
          .stroke();

        doc
          .fillColor("#000000")
          .text(
            item.name,
            columns.item + 8,
            currentY + 12,
            {
              width: 260,
            }
          );

        doc.text(
          String(item.quantity),
          columns.quantity,
          currentY + 12
        );

        doc.text(
          formatCurrency(item.price),
          columns.price,
          currentY + 12
        );

        doc.text(
          formatCurrency(item.totalAmount),
          columns.amount,
          currentY + 12
        );

        currentY += rowHeight;
      });

      // -----------------------------------------
      // Summary
      // -----------------------------------------

      const summaryY = currentY + 30;

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#555555");

      doc.text(
        "Subtotal",
        350,
        summaryY
      );

      doc
        .fillColor("#000000")
        .text(
          formatCurrency(invoice.subtotal),
          480,
          summaryY
        );

      doc
        .fillColor("#555555")
        .text(
          "Tax",
          350,
          summaryY + 22
        );

      doc
        .fillColor("#000000")
        .text(
          formatCurrency(invoice.tax),
          480,
          summaryY + 22
        );

      doc
        .fillColor("#555555")
        .text(
          "Discount",
          350,
          summaryY + 44
        );

      doc
        .fillColor("#000000")
        .text(
          `-${formatCurrency(invoice.discount)}`,
          480,
          summaryY + 44
        );

      // -----------------------------------------
      // Total
      // -----------------------------------------

      doc
        .moveTo(350, summaryY + 70)
        .lineTo(545, summaryY + 70)
        .strokeColor("#cccccc")
        .stroke();

      doc
        .fontSize(13)
        .font("Helvetica-Bold")
        .fillColor("#000000")
        .text(
          "TOTAL",
          350,
          summaryY + 85
        );

      doc
        .text(
          formatCurrency(invoice.total),
          470,
          summaryY + 85
        );

      // -----------------------------------------
      // Footer
      // -----------------------------------------

      const footerY = 760;

      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor("#777777")
        .text(
          "Thank you for your business!",
          55,
          footerY,
          {
            align: "center",
            width: pageWidth,
          }
        );
      doc
        .fontSize(8)
        .text(
          "Generated by InvoiceFlow",
          50,
          footerY + 15,
          {
            align: "center",
            width: pageWidth,
          }
        );

      // -----------------------------------------
      // Finalize PDF
      // -----------------------------------------

      doc.end();

    } catch (error) {
      reject(error);
    }
  });
};

module.exports = GenerateInvoicePDF;


const { toFile } = require("@imagekit/nodejs");
const imagekit = require("../config/imagekit.js");

const uploadInvoicePDF = async (pdfBuffer,fileName,folder = "/invoices") => {
  try {
    if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer)) {
      throw new Error("Valid PDF buffer is required");
    }
    if (!fileName) {
      throw new Error("File name is required");
    }
    const safeFileName = `${Date.now()}-${fileName}.pdf`;
    const response = await imagekit.files.upload({
      file: await toFile(pdfBuffer, safeFileName),
      fileName: safeFileName,
      folder,
    });
    return {
      url: response.url,
      fileId: response.fileId,
    };
  } catch (error) {
    console.error("ImageKit upload error:",error);
    throw new Error("Invoice PDF upload failed");
  }
};

module.exports =  uploadInvoicePDF
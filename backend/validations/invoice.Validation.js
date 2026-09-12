
const validateInvoice = (req, res, next) => {
  const {businessName,businessEmail,businessAddress,billedTo,items,tax,discount} = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Business name
  if (!businessName || typeof businessName !== "string") {
    return res.status(400).json({
      success: false,
      message: "Business name is required",
    });
  }
  if (businessName.trim().length < 2 || businessName.trim().length > 40) {
    return res.status(400).json({
      success: false,
      message: "Business name must be between 2 and 40 characters",
    });
  }
  // Business email
  if (!businessEmail || !emailRegex.test(businessEmail)) {
    return res.status(400).json({
      success: false,
      message: "Valid business email is required",
    });
  }
  // Business address
  if (
    businessAddress &&
    (typeof businessAddress !== "string" ||
      businessAddress.trim().length > 100)
  ) {
    return res.status(400).json({
      success: false,
      message: "Business address cannot exceed 100 characters",
    });
  }

  // Customer details
  if (!billedTo || typeof billedTo !== "object") {
    return res.status(400).json({
      success: false,
      message: "Customer details are required",
    });
  }

  if (
    !billedTo.customerName ||
    typeof billedTo.customerName !== "string" ||
    billedTo.customerName.trim().length < 2 ||
    billedTo.customerName.trim().length > 20
  ) {
    return res.status(400).json({
      success: false,
      message: "Customer name must be between 2 and 20 characters",
    });
  }

  if (
    !billedTo.customerEmail ||
    !emailRegex.test(billedTo.customerEmail)
  ) {
    return res.status(400).json({
      success: false,
      message: "Valid customer email is required",
    });
  }

  // Items
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one invoice item is required",
    });
  }

  for (const item of items) {
    if (!item.name || typeof item.name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Each item must have a name",
      });
    }

    if (
      typeof item.quantity !== "number" ||
      item.quantity <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Item quantity must be greater than 0",
      });
    }

    if (
      typeof item.price !== "number" ||
      item.price < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Item price cannot be negative",
      });
    }
  }

  // Tax
  if (tax !== undefined && (typeof tax !== "number" || tax < 0)) {
    return res.status(400).json({
      success: false,
      message: "Tax must be a valid positive number",
    });
  }

  // Discount
  if (
    discount !== undefined &&
    (typeof discount !== "number" || discount < 0)
  ) {
    return res.status(400).json({
      success: false,
      message: "Discount must be a valid positive number",
    });
  }

  next();
};

module.exports = validateInvoice;

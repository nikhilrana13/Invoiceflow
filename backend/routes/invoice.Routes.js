const express = require("express")
const validateInvoice = require("../validations/invoice.Validation.js")
const CreateInvoice = require("../controllers/invoice.Controller.js")
const router = express.Router() 


router.post("/create-invoice",validateInvoice,CreateInvoice)


module.exports = router
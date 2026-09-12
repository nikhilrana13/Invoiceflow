const express = require("express")
const cors = require("cors") 
const cookieParser = require("cookie-parser") 
const dotenv = require("dotenv")
const configure = require("./config/db")
const InvoiceRoute = require("./routes/invoice.Routes.js")

dotenv.config()

const PORT = process.env.PORT || 4000 
const app = express()



// middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser()) 


// routes 
app.use("/api/invoices",InvoiceRoute)

// Start worker
require("./workers/invoiceWorker.js");


// connect to db 
configure()

app.listen(PORT,async()=>{
    console.log(`Server is running on port ${PORT}`)
})
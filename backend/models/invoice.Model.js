const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
  businessName:{type:String,required:true,maxlength:40,trim:true,},
  businessEmail:{type:String,required:true,lowercase:true},
  businessAddress:{type:String,length:100,trim:true,default:"NA"},
  billedTo:{
    customerName:{type:String,required:true,maxlength:20,trim:true},
    customerEmail:{type:String,required:true},
  },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
    },
  ],
  subtotal:{type:Number,required:true,min: 0,},
  tax:{type:Number,default:0, min: 0,},
  discount:{type:Number,default:0, min: 0,},
  total:{type:Number,required:true},
  status:{type:String, enum: ["pending", "processing", "completed", "failed"],default: "pending"},
  emailStatus: {type: String,enum: ["pending", "sent", "failed"],default: "pending"},
  pdfUrl:{
    url:{type:String},
    fileId:{type:String}
  },
  error:{type:String},
  completedAt:{type:Date}
},{timestamps:true});

const Invoice = mongoose.model("Invoice",invoiceSchema)
module.exports = Invoice


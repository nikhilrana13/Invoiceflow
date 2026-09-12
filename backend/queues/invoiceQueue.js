const {Queue} = require("bullmq")
const redis = require("../config/redis.js")

const invoiceQueue = new Queue('invoice-queue',{
    connection:redis
})

module.exports = invoiceQueue
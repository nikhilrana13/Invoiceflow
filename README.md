# InvoiceFlow

A full-stack invoice automation platform focused on **asynchronous background job processing using BullMQ and Redis**.

## Features

* Create invoices with multiple items
* Automatic invoice calculations
* PDF generation using PDFKit
* PDF storage using ImageKit
* Email delivery using Nodemailer
* Background processing with BullMQ + Redis
* Delayed jobs
* Automatic retries with exponential backoff
* Worker concurrency
* Invoice processing status tracking

## Architecture

```text
React
  ↓
Express API
  ↓
MongoDB
  ↓
BullMQ
  ↓
Redis
  ↓
Worker
  ↓
PDF → ImageKit → Email
```

The API responds immediately after adding the job to the queue, while PDF generation, file upload, and email delivery are handled asynchronously by the worker.

## Tech Stack

**Frontend:** React, React Hook Form, Tailwind CSS, Axios

**Backend:** Node.js, Express.js, MongoDB, Mongoose

**Background Jobs:** BullMQ, Redis

**Services:** PDFKit, ImageKit, Nodemailer

## Background Job Flow

```text
pending
   ↓
processing
   ↓
completed

processing
   ↓
failed
   ↓
retry
```

Jobs are configured with retries and exponential backoff to handle temporary failures.

## Getting Started

```bash
git clone https://github.com/your-username/invoiceflow.git
cd invoiceflow
npm install
```

Create a `.env` file with:

```env
MONGO_URI=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
EMAIL_USER=
EMAIL_PASS=
```

Start Redis:

```bash
docker run --name invoiceflow-redis -p 6379:6379 -d redis
```

Start the frontend and backend:

```bash
npm run dev
```

## Learning Focus

The main goal of InvoiceFlow was to understand how **BullMQ, Redis, queues, and workers** can be used to move time-consuming tasks outside the HTTP request-response cycle.

This allows users to get an immediate response without waiting for background processing to finish.

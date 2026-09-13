import BusinessDetails from '@/components/BusinessDetails';
import CustomerDetails from '@/components/CustomerDetails';
import ErrorState from '@/components/ErrorState';
import Header from '@/components/Header';
import InvoiceItems from '@/components/InvoiceItems';
import InvoiceSummary from '@/components/InvoiceSummary';
import ProcessingState from '@/components/ProcessingState';
import SuccessState from '@/components/SuccessState';
import React, { useState } from 'react';




const Home = () => {
     const [previewView, setPreviewView] = useState("form");
  return (
    <div className='min-h-screen bg-canvas'>
      <Header />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
            Create your invoice
          </h1>
          <p className="mt-2 text-base text-ink-muted">
            Generate a professional invoice and send it directly to your customer.
          </p>
        </div>
        <div className="mt-8 sm:mt-10">
          {previewView === "form" && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-3 space-y-6">
                <BusinessDetails />
                <CustomerDetails />
                <InvoiceItems />
              </div>
              <div className="lg:col-span-2 lg:sticky lg:top-24">
                <InvoiceSummary />
              </div>
            </div>
          )}
          {previewView === "processing" && <ProcessingState />}
          {previewView === "success" && <SuccessState />}
          {previewView === "error" && <ErrorState />}
        </div>
      </main>
    </div>
  );
}

export default Home;

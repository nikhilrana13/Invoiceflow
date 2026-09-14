import BusinessDetails from '@/components/BusinessDetails';
import CustomerDetails from '@/components/CustomerDetails';
import ErrorState from '@/components/ErrorState';
import Header from '@/components/Header';
import InvoiceItems from '@/components/InvoiceItems';
import InvoiceSummary from '@/components/InvoiceSummary';
import ProcessingState from '@/components/ProcessingState';
import SuccessState from '@/components/SuccessState';
import axios from 'axios';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';



const Home = () => {
    const [previewView, setPreviewView] = useState("form");
    const methods = useForm({
        defaultValues: {
            businessName: "",
            businessEmail: "",
            businessAddress: "",
            billedTo: {
                customerName: "",
                customerEmail: "",
            },
            items: [
                {
                    name: "",
                    quantity: 1,
                    price: 0,
                }
            ],
            tax: 0,
            discount: 0
        }
    })
    const { handleSubmit } = methods;
    const [successMessage,setSuccessMessage] = useState(null)
    const [invoiceId,setInvoiceId] = useState(null)
    const [status,setStatus] = useState(null)

    const onSubmit = async(data)=>{
        try {
            setPreviewView("processing")
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/invoices/create-invoice`,data)
            if(response?.data.success){
                setPreviewView("success")
                const message = response?.data?.message
                setSuccessMessage(message)
                const invoiceId = response?.data?.invoiceId
                setInvoiceId(invoiceId)
                const status = response?.data?.status
                setStatus(status)
                methods.reset()
            }
        } catch (error) {
            console.error("failed to create invoice",error)
            setPreviewView("error")
        }
    }

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
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
                                <div className="lg:col-span-3 space-y-6">
                                    <BusinessDetails />
                                    <CustomerDetails />
                                    <InvoiceItems />
                                </div>
                                <div className="lg:col-span-2 lg:sticky lg:top-24">
                                    <InvoiceSummary />
                                </div>
                            </form>
                        </FormProvider>
                    )}
                    {previewView === "processing" && <ProcessingState />}
                    {previewView === "success" && <SuccessState invoiceId={invoiceId} status={status} message={successMessage} setPreviewView={setPreviewView} />}
                    {previewView === "error" && <ErrorState />}
                </div>
            </main>
        </div>
    );
}

export default Home;

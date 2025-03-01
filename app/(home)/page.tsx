"use client";

import Navbar from "@/components/Navbar";
import NewInvoice from "../invoice/new/page";

export default function Home() {
  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pt-16 sm:pt-20 lg:pt-24 mb-6 sm:mb-8">
          <h1 className="text-gray-900 dark:text-white text-balance font-bold text-center text-4xl sm:text-5xl md:text-6xl xl:text-7xl">
            Invoice Your Customers in Seconds
          </h1>
          <p className="mt-4 sm:mt-6 md:mt-8 text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg text-center max-w-2xl mx-auto">
            Quickly create professional invoices and estimates wherever you
            are😊
          </p>
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 pb-16 sm:pb-20">
          <NewInvoice />
        </div>
      </div>
    </main>
  );
}

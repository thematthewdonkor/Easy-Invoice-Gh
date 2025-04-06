"use client";

import { Navbar } from "@/components/nav-bar";

import Image from "next/image";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pt-14 sm:pt-16 lg:pt-16 mb-8 sm:mb-12">
          <h1 className="text-gray-900 dark:text-white text-balance font-bold text-center text-4xl sm:text-5xl md:text-6xl xl:text-7xl">
            Invoice Your Customers in Seconds
          </h1>
          <p className="mt-4 sm:mt-6 md:mt-8 text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg text-center max-w-2xl mx-auto">
            Quickly create professional invoices and estimates wherever you
            are😊
          </p>
        </div>

        <div className="min-w-full flex flex-col items-center">
          <Image
            src="/Screenshot.png"
            alt="page"
            width={800}
            height={100}
            className="object-contain"
          />
        </div>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { LogIn } from "@/components/login";
import Image from "next/image";
import { LayoutDashboard } from "lucide-react";
import { NewInvoice } from "./new-invoice";

const Page = () => {
  return (
    <div className="min-h-screen p-2 sm:p-6 bg-gray-100">
      <header className="border-b space-y-6 flex flex-col justify-center w-full relative">
        <div className="container items-center md:max-w-8xl mx-auto flex h-16 sm:items-end md:items-end lg:items-center md:pb-3 justify-between px-6 md:px-6 gap-6">
          <Link
            href="/"
            className="
        w-full 
        lg:w-fit"
          >
            <Image src="/logo.svg" alt="Logo" width={50} height={50} />
          </Link>
          <nav
            className="
        flex 
        items-center 
        gap-6
        "
          >
            <Link
              href="/dashboard"
              className="
            hidden 
            sm:flex     
            sm:text-lg
            text-sm
            font-medium 
            text-gray-900
            hover:text-indigo-950
            transition
           
            "
            >
              My Invoices
            </Link>

            <Link
              href="/invoice/new"
              className="hidden 
            sm:flex
            sm:text-lg
            text-sm  
            text-gray-900
            hover:text-indigo-900
            transition 
            font-medium 
            text-primary"
            >
              New Invoice
            </Link>
          </nav>
          <div className="mb-6 sm:mb-0 lg:mb ml-4">
            <LogIn />
          </div>
        </div>

        <nav className="md:hidden flex items-center justify-between px-8 py-2 border-t">
          <Link
            href="/"
            className="
        text-sm 
        font-medium 
        text-primary
         text-gray-900
            hover:text-indigo-900
            transition
        "
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="
          flex
          items-center
            text-sm 
            transition
            font-medium
            bg-indigo-700
            px-3
            py-1.5
            rounded-lg
            text-white
            "
          >
            <LayoutDashboard className="h-4 w-4 mr-2" />
            My invoices
          </Link>
        </nav>
      </header>
      <div className="mt-4 h-full">
        <NewInvoice />
      </div>
    </div>
  );
};

export default Page;

"use client";

import Link from "next/link";
import { LogIn } from "./login";
import Image from "next/image";
import { Plus } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="border-b space-y-6 flex sm:items-center flex-col justify-center w-full relative">
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
        sm:space-x-12
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
            Invoices
          </Link>

          <Link
            href="/invoice/new"
            className="hidden 
            sm:flex
            sm:items-center
            sm:justify-center 
            sm:gap-2
            text-lg
           text-white
            transition 
            font-medium 
            text-primary
           bg-indigo-600
            px-3
            py-1
            rounded-lg
            "
          >
            <Plus className="h-4 w-4" />
            Create
          </Link>
        </nav>
        <div className="mb-6 sm:mb-0 lg:mb ml-4">
          <LogIn />
        </div>
      </div>

      <nav className="md:hidden flex items-center justify-between px-8 py-2 border-t">
        <Link
          href="/dashboard"
          className="
        text-sm 
        font-medium 
        text-primary
         text-gray-900
            hover:text-indigo-900
            transition
        "
        >
          My Invoices
        </Link>
        <Link
          href="/invoice/new"
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
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Link>
      </nav>
    </header>
  );
};

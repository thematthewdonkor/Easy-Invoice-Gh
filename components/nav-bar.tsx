"use client";

import Link from "next/link";
import Image from "next/image";

import { Login } from "./login";

export const Navbar = () => {
  return (
    <nav className="w-full border-b border-black/5 dark:border-white/5 lg:border-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 dark:bg-gray-950 flex items-center justify-between py-2 md:py-4">
        <Link href="/" className="w-full lg:w-fit md:px-0 mt-12 lg:mt-0">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        </Link>
        <Login />
      </div>
    </nav>
  );
};

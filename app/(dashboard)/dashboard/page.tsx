"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useInvoices } from "@/hooks/useInvoices";
import { format } from "date-fns";
import Link from "next/link";
import { LogIn } from "@/components/login";
import { useDeleteInvoice } from "@/hooks/useInvoices";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

const Dashboard = () => {
  const router = useRouter();
  const { data: invoices, isLoading } = useInvoices();
  const deleteInvoice = useDeleteInvoice();
  const { resetInvoice } = useInvoiceStore();

  //Handle invoice delete
  const handleDeleteInvoice = async (id: string) => {
    if (!id) return;

    try {
      await deleteInvoice.mutateAsync(id);
      if (deleteInvoice.isSuccess) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error, "Error deleting invoice");
    }
  };

  if (isLoading) {
    <span>Loading</span>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b space-y-2 flex flex-col justify-start w-full">
        <div className="container items-center mx-auto flex h-16 sm:items-end md:items-end lg:items-center md:pb-3 justify-between px-6 md:px-6 gap-6">
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
            sm:text-md 
            text-sm
            font-medium 
            text-gray-900
            hover:text-indigo-950
            transition
           
            "
            >
              My Invoices
            </Link>

            <Button
              variant="link"
              onClick={() => {
                resetInvoice();
                router.push("/invoice/new");
              }}
              className="hidden 
            sm:flex 
            text-sm  
            text-gray-900
            hover:text-indigo-900
            transition 
            font-medium 
            text-primary"
            >
              New Invoice
            </Button>
          </nav>
          <div className="mb-8 sm:mb-0 ml-4">
            <LogIn />
          </div>
        </div>

        <nav className="sm:hidden flex items-center justify-between px-4 pt-4 border-t">
          <Link
            href="/"
            className="
        text-sm 
        font-medium 
        text-primary
         text-gray-900
            hover:text-indigo-900
            transition
            mb-4
        "
          >
            Home
          </Link>
          <Button
            onClick={() => {
              resetInvoice();
              router.push("/invoice/new");
            }}
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
            mb-4
            "
          >
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </nav>
      </header>

      <div className="container mx-auto px-4 sm:px-6">
        <main className="max-w-4xl mx-auto pt-8 sm:pt-12 mb-6 sm:mb-8">
          <div className="flex flex-col items-center mb-4 sm:mb-6 p-4 justify-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-950">
              My invoices
            </h1>
          </div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="overflow-x-auto -mx-6">
              <Table
                className="
              min-w-full 
              divide-y-reverse 
              divide-gray-500"
              >
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="
                    px-4 
                    sm:w-[30%] 
                    py-3 
                    text-left 
                    text-xs 
                    font-medium 
                    text-gray-500 
                    tracking-tight
                    "
                    >
                      CUSTOMER
                    </TableHead>
                    <TableHead
                      className=" 
                      hidden
                      sm:inline-block
                    sm:w-[5%] 
                    px-4 
                    sm:px-6 
                    py-3 
                    text-left 
                    text-xs 
                    font-medium
                    text-gray-500 
                    tracking-tight
                    "
                    >
                      REFERENCE
                    </TableHead>
                    <TableHead className=" sm:[25%] px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-tight">
                      DATE
                    </TableHead>
                    <TableHead className="hidden sm:inline-block px-4 sm:[25%] sm:px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-tight">
                      DUE DATE
                    </TableHead>
                    <TableHead className="px-4 sm:[10%] sm:px-6 py-3 text-right text-xs font-medium text-gray-500 tracking-tight">
                      TOTAL
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-50">
                  {invoices && invoices?.length > 0 ? (
                    invoices.map((invoice) => (
                      <TableRow
                        key={invoice.id}
                        className="divide-y divide-gray-50"
                      >
                        <TableCell className="text-left text-xs">
                          {invoice?.customersName}
                        </TableCell>
                        <TableCell
                          className="text-left text-xs hidden sm:flex sm:flex-col"
                          onClick={() => router.push(`/invoice/preview`)}
                        >
                          #{invoice?.invoiceNumber}
                        </TableCell>

                        <TableCell className="text-left text-xs">
                          {invoice?.date
                            ? format(new Date(invoice.date), "MMM, dd, yyy")
                            : "N/A"}
                        </TableCell>

                        <TableCell className="text-center text-xs hidden sm:flex sm:flex-col">
                          {invoice?.dueDate
                            ? format(new Date(invoice.dueDate), "MMM, dd, yyy")
                            : "N/A"}
                        </TableCell>
                        <TableCell className="text-right text-xs">
                          {invoice.balanceDue || "0.00"}
                        </TableCell>
                        <TableCell className="px-4 sm:px-6 whitespace-nowrap text-right text-sm">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                className="
                          border 
                          border-gray-300 
                          shadow-sm 
                          py-1 
                          font-medium 
                          rounded-md 
                          px-3 
                          h-8 
                          hover:bg-indigo-700
                             bg-indigo-500
                             text-white
                             hover:text-white
                          "
                                size="sm"
                                variant="outline"
                              >
                                View
                                <ChevronDown className="h-2 w-2" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="center"
                              className="
                        bg-white 
                        rounded-lg 
                        border
                        py-1
                        min-w-[80px]
                        text-xs
                        text-left
                        cursor-pointer
                        p-4
                        space-y-2
                        "
                            >
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(`/invoice/preview/${invoice.id}`)
                                }
                              >
                                view
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(`/invoice/edit/${invoice.id}`)
                                }
                                className="text-indigo-950"
                              >
                                Edit
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => handleDeleteInvoice(invoice.id)}
                                className="text-red-500"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="px-4 sm:px-6 py-8 text-center text-gray-500 rounded-lg"
                      >
                        No invoices found. create your first invoice
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

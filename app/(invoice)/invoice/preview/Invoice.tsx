"use client";

import { format, parseISO } from "date-fns";
import { useInvoice } from "@/hooks/useInvoices";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { LogIn } from "@/components/login";

import { InvoiceHeader } from "@/components/invoice-header";
import { InvoiceItem } from "@/components/invoice-item";
import { InvoiceSummary } from "@/components/invoice-summary";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useEffect, useState } from "react";

interface InvoiceProps {
  id: string;
}

export const Invoice = ({ id }: InvoiceProps) => {
  const { data, isLoading } = useInvoice(id);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const { resetInvoice } = useInvoiceStore();
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState("N/A");
  const [formattedDueDate, setFormattedDueDate] = useState("N/A");

  useEffect(() => {
    if (data?.date) setFormattedDate(format(parseISO(data.date), "MM/dd/yy"));
    if (data?.dueDate)
      setFormattedDueDate(format(parseISO(data.dueDate), "MM/dd/yy"));
  }, [data]);

  if (isLoading) {
    <span>Loading</span>;
  }

  if (!data) {
    return;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-4">
      <header className="border-b  mb-4 flex flex-col justify-start w-full">
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
                router.push("/invoice/new");
                resetInvoice();
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
              router.push("/invoice/new");
              resetInvoice();
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
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        <InvoiceHeader id={id} invoiceRef={invoiceRef} />
        <div ref={invoiceRef}>
          <Card className="mt-4 p-4 rounded-md shadow-md max-w-3xl mx-auto sm:space-y-6 md:space-y-8">
            <div className="flex sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
              <div className="flex gap-4 flex-col pt-3 space-y-2">
                {data?.companyLogo && (
                  <div className="relative w-[160px] h-28">
                    <Image
                      src={data.companyLogo}
                      alt="Company Logo"
                      layout="fill"
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                )}
                <h1 className="text-sm">{data.companyName}</h1>
              </div>
              {data?.invoiceNumber && (
                <div className="flex sm:flex-col sm:gap-0 gap-2 items-center sm:items-end self-end sm:self-auto">
                  <h1 className="text-sm md:text-2xl lg:text-4xl font-semibold">
                    INVOICE
                  </h1>
                  <span className="text-right text-muted-foreground text-sm md:text-xl lg:text-2xl">
                    #{data.invoiceNumber}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
              <div className="space-y-1">
                <h3 className="text-xs font-medium text-muted-foreground">
                  Customer&#39;s name
                </h3>
                <p className="font-medium text-xs">{data.customersName}</p>
              </div>
              {data?.customersLocation ? (
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground">
                    Customer&#39;s Location
                  </h3>
                  <p className="font-medium text-xs">
                    {data.customersLocation}
                  </p>
                </div>
              ) : null}

              <div className="flex justify-between sm:items-start mt-2 sm:mt-0">
                {formattedDate ? (
                  <div className="flex flex-col sm:items-center gap-1">
                    <h3 className="text-xs font-medium text-muted-foreground">
                      Date
                    </h3>
                    <p className="text-xs font-medium">{formattedDate}</p>
                  </div>
                ) : (
                  "N/A"
                )}
                {formattedDueDate ? (
                  <div className="flex flex-col sm:items-start gap-1 mt-2 sm:mt-0">
                    <h3 className="text-xs font-medium text-muted-foreground">
                      Due date
                    </h3>
                    <p className="text-xs font-medium">{formattedDueDate}</p>
                  </div>
                ) : (
                  "N/A"
                )}
              </div>
            </div>

            {/* Invoice Items Table */}
            <div className="overflow-x-auto -mx-2 sm:mx-0 mb-4 sm:mb-6 md:mb-8">
              <div className="min-w-full inline-block align-middle sm:px-0">
                <div className="shadow overflow-hidden sm:rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100">
                        <TableHead className="whitespace-nowrap text-xs w-[40%]">
                          ITEM
                        </TableHead>
                        <TableHead className="text-right whitespace-nowrap text-xs w-[20%]">
                          QUANTITY
                        </TableHead>
                        <TableHead className="text-right whitespace-nowrap text-xs w-[20%]">
                          PRICE
                        </TableHead>
                        <TableHead className="text-right whitespace-nowrap text-xs w-[20%]">
                          AMOUNT
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="pb-6">
                      {data?.items?.length > 0 ? (
                        data.items.map((item) => (
                          <InvoiceItem
                            key={item.id}
                            description={item.description}
                            quantity={item.quantity}
                            price={item.price}
                            amount={item.amount}
                            id={item.id}
                          />
                        ))
                      ) : (
                        <TableRow>
                          <TableHead colSpan={4} className="text-center">
                            Loading
                          </TableHead>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            {/* Invoice Summary */}
            <InvoiceSummary
              subtotal={data?.subtotal}
              discount={data?.discount}
              total={data?.total}
              deliveryCost={data?.deliveryCost}
              amountPaid={data?.amountPaid}
              balanceDue={data?.balanceDue}
            />

            {/* Additional Invoice Details */}
            <div className="max-w-4xl mx-auto space-y-4 mt-3">
              <div className="grid grid-cols-1 gap-4 pt-4">
                {data?.notes ? (
                  <div className="relative">
                    <h3 className="text-sm font-medium mb-1 text-muted-foreground">
                      Notes
                    </h3>
                    <p className="text-xs text-muted-foreground w-full sm:w-32">
                      {data.notes}
                    </p>
                  </div>
                ) : (
                  " "
                )}
                {data?.paymentDetails ? (
                  <div className="flex flex-col relative">
                    <h3 className="text-sm font-medium mb-1 text-muted-foreground">
                      Payment Details
                    </h3>
                    <p className="text-xs sm:w-32 text-balance text-muted-foreground w-full">
                      {data.paymentDetails}
                    </p>
                  </div>
                ) : (
                  " "
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

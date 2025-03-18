"use client";

import { format, parseISO } from "date-fns";
import { useGetInvoiceByIdQuery } from "@/hooks/useInvoiceQuery";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

import { InvoiceHeader } from "@/components/invoice-header";
import { InvoiceItem } from "@/components/invoice-item";
import type { InvoiceProps, InvoiceItemProps } from "@/types";
import { InvoiceSummary } from "@/components/invoice-summary";

type InvoiceIdProps = InvoiceItemProps & {
  id: string;
};

export const Invoice = ({ invoiceId }: InvoiceProps) => {
  const { data } = useGetInvoiceByIdQuery(invoiceId);

  const date = data?.date ? format(parseISO(data.date), "MM/dd/yy") : "";
  const dueDate = data?.dueDate
    ? format(parseISO(data.dueDate), "MM/dd/yy")
    : "";

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        <InvoiceHeader />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
          <div className="flex gap-4 flex-col">
            {data?.companyLogo ? (
              <div className="relative w-[200px] h-28">
                {data?.companyLogo && (
                  <Image
                    src={data?.companyLogo || ""}
                    alt="Company Logo"
                    layout="fill"
                    className="rounded-lg w-full h-full object-cover"
                  />
                )}
              </div>
            ) : (
              ""
            )}

            <h1 className="text-sm">{data?.companyName}</h1>
          </div>
          {data?.invoiceNumber ? (
            <div className="flex sm:flex-col sm:gap-0 gap-2 items-center sm:items-end self-end sm:self-auto">
              <h1 className="text-sm md:text-2xl lg:text-4xl font-semibold">
                INVOICE
              </h1>
              <span className="text-right text-muted-foreground text-sm md:text-xl lg:text-2xl">
                #{data?.invoiceNumber}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
          <div className="space-y-1">
            <h3 className="text-xs font-medium text-muted-foreground">
              Customer&#39;s name
            </h3>
            <p className="font-medium text-xs">{data?.customersName}</p>
          </div>

          {data?.customersLocation ? (
            <div className="space-y-1">
              <h3 className="text-xs font-medium text-muted-foreground">
                Customer&#39;s Location
              </h3>
              <p className="font-medium text-xs">{data?.customersLocation}</p>
            </div>
          ) : (
            ""
          )}

          <div className="flex justify-between sm:items-start mt-2 sm:mt-0">
            {date ? (
              <div className="flex flex-col sm:items-center gap-1">
                <h3 className="text-xs font-medium text-muted-foreground">
                  Date
                </h3>
                <p className="font-medium text-muted-foreground text-xs">
                  {date}
                </p>
              </div>
            ) : (
              ""
            )}
            {dueDate ? (
              <div className="flex flex-col sm:items-start gap-1 mt-2 sm:mt-0">
                <h3 className="text-xs font-medium text-muted-foreground">
                  Due date
                </h3>
                <p className="font-medium text-muted-foreground text-xs">
                  {dueDate}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

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
                  {data?.items.map((item: InvoiceIdProps) => (
                    <InvoiceItem
                      key={item.id}
                      description={item.description}
                      quantity={item.quantity}
                      price={item.price}
                      amount={item.amount}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <InvoiceSummary
          subtotal={data?.subtotal}
          discount={data?.discount}
          taxRate={data?.taxRate}
          total={data?.total}
          deliveryCost={data?.deliveryCost}
          amountPaid={data?.amountPaid}
          balanceDue={data?.balanceDue}
        />

        <div className="max-w-4xl mx-auto space-y-4 mt-3">
          <div className="grid grid-cols-1 gap-4 pt-4">
            {data?.notes ? (
              <div>
                <h3 className="text-sm font-medium mb-1 text-muted-foreground">
                  Notes
                </h3>
                <p className="text-sm text-muted-foreground w-full sm:w-32">
                  {data?.notes}
                </p>
              </div>
            ) : (
              ""
            )}

            {data?.paymentDetails ? (
              <div className="flex flex-col">
                <h3 className="text-sm font-medium mb-1 text-muted-foreground">
                  Payment Details
                </h3>
                <p className="text-sm text-balance text-muted-foreground w-full sm:w-32">
                  {data?.paymentDetails}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

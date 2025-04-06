"use client";

import { formatCurrency } from "@/lib/utils";
import { SummaryProps } from "@/types";

export const InvoiceSummary = ({
  subtotal,
  discount,
  total,
  deliveryCost,
  amountPaid,
  balanceDue,
}: SummaryProps) => {
  return (
    <div className="w-full sm:w-72 sm:ml-auto space-y-2">
      <div className="flex justify-between text-muted-foreground">
        <span className=" text-sm">Subtotal</span>
        <span className="text-sm">{formatCurrency(subtotal)}</span>
      </div>

      {discount === " " ? (
        <div className="flex justify-between text-muted-foreground">
          <span className=" text-sm">Discount</span>
          <span className="text-sm">{formatCurrency(discount)}</span>
        </div>
      ) : null}

      {deliveryCost === " " ? (
        <div className="flex justify-between text-muted-foreground pb-2 border-b">
          <span className=" text-sm">Delivery cost</span>
          <span className="font-medium text-sm">
            {formatCurrency(deliveryCost)}
          </span>
        </div>
      ) : null}

      <div className="flex justify-between  pt-4 ">
        <span className="font-bold text-sm">Total</span>
        <span className="text-sm font-bold">{formatCurrency(total)}</span>
      </div>

      {amountPaid === " " ? (
        <div className="flex justify-between text-muted-foreground">
          <span className="text-sm">Amount paid</span>
          <span className="text-muted-foreground text-sm">
            {formatCurrency(amountPaid)}
          </span>
        </div>
      ) : null}

      <div className="flex justify-between">
        <span className="text-sm font-bold">Balance due</span>
        <span className="font-bold text-sm">{formatCurrency(balanceDue)}</span>
      </div>
    </div>
  );
};

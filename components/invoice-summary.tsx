import { formatCurrency } from "@/lib/utils";
import { SummaryProps } from "@/types";

export const InvoiceSummary = ({
  subtotal,
  discount,
  //   taxRate,
  total,
  deliveryCost,
  amountPaid,
  balanceDue,
}: SummaryProps) => {
  return (
    <div className="w-full sm:w-72 sm:ml-auto space-y-2">
      <div className="flex justify-between text-muted-foreground">
        <span className=" text-xs">Subtotal</span>
        <span className="text-xs">{formatCurrency(subtotal)}</span>
      </div>

      {discount ? (
        <div className="flex justify-between text-muted-foreground">
          <span className=" text-xs">Discount</span>
          <span className="text-xs">{formatCurrency(discount)}</span>
        </div>
      ) : (
        ""
      )}

      {deliveryCost ? (
        <div className="flex justify-between text-muted-foreground pb-2 border-b">
          <span className=" text-xs">Delivery cost</span>
          <span className="font-medium text-xs">
            {formatCurrency(deliveryCost)}
          </span>
        </div>
      ) : (
        ""
      )}

      <div className="flex justify-between  pt-4 ">
        <span className="font-bold text-xs">Total</span>
        <span className="text-xs font-bold">{formatCurrency(total)}</span>
      </div>

      {amountPaid ? (
        <div className="flex justify-between text-muted-foreground">
          <span className="text-xs">Amount paid</span>
          <span className="text-muted-foreground text-xs">
            {formatCurrency(amountPaid)}
          </span>
        </div>
      ) : (
        ""
      )}

      <div className="flex justify-between">
        <span className="text-xs font-bold">Balance due</span>
        <span className="font-bold text-xs">{formatCurrency(balanceDue)}</span>
      </div>
    </div>
  );
};

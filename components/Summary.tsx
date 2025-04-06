"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { formatCurrency } from "@/lib/utils";

export const Summary = () => {
  const {
    subtotal,
    discount,
    deliveryCost,
    total,
    amountPaid,
    balanceDue,
    handleChange,
  } = useInvoiceStore();

  return (
    <div className="space-y-4 border rounded-lg p-6">
      <div className="flex justify-between items-center text-muted-foreground">
        <Label className="text-sm">Subtotal:</Label>
        <span className=" text-sm">{formatCurrency(String(subtotal))}</span>
      </div>

      <div className="flex justify-between items-center gap-4 text-muted-foreground">
        <Label className="text-sm">Discount:</Label>
        <div className="flex items-center gap-2">
          <span className="text-sm">GH¢</span>
          <Input
            value={discount}
            onChange={(e) => handleChange("discount", e.target.value)}
            className="w-24 text-sm"
          />
        </div>
      </div>

      <div className="flex justify-between items-center gap-4 text-muted-foreground">
        <Label className="text-sm">Delivery Cost:</Label>
        <div className="flex items-center gap-2">
          <span className="text-sm">GH¢</span>
          <Input
            value={deliveryCost}
            onChange={(e) => handleChange("deliveryCost", e.target.value)}
            className="w-24 text-sm"
          />
        </div>
      </div>

      <div className="flex justify-between items-center border-t pt-2 text-muted-foreground">
        <Label className="text-sm">Total:</Label>
        <span className="text-sm">{formatCurrency(total)}</span>
      </div>

      <div className="flex justify-between items-center gap-4 text-muted-foreground">
        <Label className="text-sm">Amount Paid:</Label>
        <div className="flex items-center gap-2">
          <span className="text-sm">GH¢</span>
          <Input
            value={amountPaid}
            onChange={(e) => handleChange("amountPaid", e.target.value)}
            className="w-24 text-sm"
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 text-muted-foreground">
        <Label className="text-sm">Balance Due:</Label>
        <span className="text-sm">{formatCurrency(balanceDue)}</span>
      </div>
    </div>
  );
};

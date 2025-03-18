"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { formatCurrency } from "@/lib/utils";

export const Summary = () => {
  const { summary, updateSummary } = useInvoiceStore();

  const {
    subtotal,
    discount,
    // taxRate,
    deliveryCost,
    total,
    amountPaid,
    balanceDue,
  } = summary;

  //Handle change function
  const handleChange = (field: string, value: string) => {
    const numericValue = value === "" ? 0 : Number.parseFloat(value);
    updateSummary(field, numericValue);
  };

  return (
    <div className="space-y-4 border rounded-lg p-6">
      <div className="flex justify-between items-center text-muted-foreground">
        <Label className="text-xs">Subtotal:</Label>
        <span className=" text-xs">{formatCurrency(String(subtotal))}</span>
      </div>

      <div className="flex justify-between items-center gap-4 text-muted-foreground">
        <Label className="text-xs">Discount:</Label>
        <div className="flex items-center gap-2">
          <span className="text-xs">GH¢</span>
          <Input
            value={discount}
            onChange={(e) => handleChange("discount", e.target.value)}
            className="w-24 text-xs"
          />
        </div>
      </div>

      <div className="flex justify-between items-center gap-4 text-muted-foreground">
        <Label className="text-xs">Delivery Cost:</Label>
        <div className="flex items-center gap-2">
          <span className="text-xs">GH¢</span>
          <Input
            value={deliveryCost}
            onChange={(e) => handleChange("deliveryCost", e.target.value)}
            className="w-24 text-xs"
          />
        </div>
      </div>

      <div className="flex justify-between items-center border-t pt-2 text-muted-foreground">
        <Label className="text-xs">Total:</Label>
        <span className="text-xs">{formatCurrency(total)}</span>
      </div>

      <div className="flex justify-between items-center gap-4 text-muted-foreground">
        <Label className="text-xs">Amount Paid:</Label>
        <div className="flex items-center gap-2">
          <span className="text-xs">GH¢</span>
          <Input
            value={amountPaid}
            onChange={(e) => handleChange("amountPaid", e.target.value)}
            className="w-24 text-xs"
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 text-muted-foreground">
        <Label className="text-xs">Balance Due:</Label>
        <span className="text-xs">{formatCurrency(balanceDue)}</span>
      </div>
    </div>
  );
};

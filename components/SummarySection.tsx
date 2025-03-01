import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SummarySectionProps {
  subtotal: number;
  discount: number;
  tax: number;
  deliveryCost: number;
  amountPaid: number;
  onUpdate: (field: string, value: number) => void;
}

export const SummarySection = ({
  subtotal,
  discount,
  tax,
  deliveryCost,
  amountPaid,
  onUpdate,
}: SummarySectionProps) => {
  const handleChange = (field: string, value: string) => {
    onUpdate(field, Number.parseFloat(value) || 0);
  };

  const total = subtotal - discount + tax + deliveryCost;
  const amountDue = total - amountPaid;

  return (
    <div className="space-y-4 border rounded-lg p-4">
      <div className="flex justify-between items-center">
        <Label className="font-medium">Subtotal:</Label>
        <span className="text-xs">GHS{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center gap-4">
        <Label className="font-medium">Discount:</Label>
        <div className="flex items-center gap-2">
          <span className="text-xs">GHS</span>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={discount}
            onChange={(e) => handleChange("discount", e.target.value)}
            className="w-24"
          />
        </div>
      </div>
      <div className="flex justify-between items-center gap-4">
        <Label className="font-medium">Tax:</Label>
        <div className="flex items-center gap-2">
          <span className="text-xs">GHS</span>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={tax}
            onChange={(e) => handleChange("tax", e.target.value)}
            className="w-24"
          />
        </div>
      </div>
      <div className="flex justify-between items-center gap-4">
        <Label className="font-medium">Delivery Cost:</Label>
        <div className="flex items-center gap-2">
          <span className="text-xs">GHS</span>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={deliveryCost}
            onChange={(e) => handleChange("deliveryCost", e.target.value)}
            className="w-24"
          />
        </div>
      </div>
      <div className="flex justify-between items-center border-t pt-2">
        <Label className="font-medium">Total:</Label>
        <span className="font-bold text-sm">GHS{total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center gap-4">
        <Label className="font-medium">Amount Paid:</Label>
        <div className="flex items-center gap-2">
          <span className="text-xs">GHS</span>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={amountPaid}
            onChange={(e) => handleChange("amountPaid", e.target.value)}
            className="w-24"
          />
        </div>
      </div>
      <div className="flex justify-between items-center border-t pt-2">
        <Label className="font-medium">Balance Due:</Label>
        <span className="font-bold text-sm">GHS{amountDue.toFixed(2)}</span>
      </div>
    </div>
  );
};

"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo } from "react";

interface LineItemProps {
  index: number;
  item: {
    description: string;
    quantity: number;
    price: number;
    amount: number;
  };
  onUpdate: (index: number, field: string, value: string | number) => void;
}

export const LineItem = ({ index, item, onUpdate }: LineItemProps) => {
  const handleChange = (field: string, value: string) => {
    if (field === "quantity" || field === "price") {
      onUpdate(index, field, Number.parseFloat(value) || 0);
    } else {
      onUpdate(index, field, value);
    }
  };

  const amount = useMemo(
    () => item.quantity * item.price,
    [item.quantity, item.price]
  );

  useEffect(() => {
    if (amount !== item.amount) {
      onUpdate(index, "amount", amount);
    }
  }, [amount, item.amount, index, onUpdate]);

  return (
    <TableRow>
      <TableCell className="align-top">
        <Input
          placeholder="Description"
          value={item.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full"
        />
      </TableCell>
      <TableCell className="align-top">
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
          className="w-full"
        />
      </TableCell>
      <TableCell className="align-top">
        <Input
          type="number"
          min="0"
          step="0.01"
          value={item.price}
          onChange={(e) => handleChange("price", e.target.value)}
          className="w-full"
        />
      </TableCell>
      <TableCell className="text-right align-top">
        {amount.toFixed(2)}
      </TableCell>
    </TableRow>
  );
};

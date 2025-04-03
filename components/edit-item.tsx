"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { formatCurrency } from "@/lib/utils";
import { useInvoiceStore } from "@/store/useInvoiceStore";

import { RemoveItem } from "./remove-item";

export const EditItem = ({ id }: { id: string }) => {
  const { items, updateItem } = useInvoiceStore();

  // Find the current item by ID
  const item = items.find((item) => item.id === id);

  if (!item) return null;

  return (
    <TableRow className="flex flex-col sm:table-row border-b mb-2 sm:mb-0 sm:border-b-0">
      <TableCell className=" align-top px-2 py-2 sm:px-4 sm:py-4 w-full sm:w-auto">
        <div className="flex items-center justify-between sm:hidden">
          <Label className="text-xs block">Description</Label>
          <RemoveItem id={id} />
        </div>
        <Input
          placeholder="Description"
          value={item.description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateItem(id, "description", e.target.value)
          }
          className="w-full placeholder:text-xs text-xs"
          required
        />
      </TableCell>

      <TableCell className="align-top px-2 py-2 sm:px-4 sm:py-4 w-1/2 sm:w-auto">
        <Label className="text-xs block sm:hidden">Quantity</Label>
        <Input
          required
          type="number"
          value={item.quantity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateItem(id, "quantity", e.target.value)
          }
          className={` ${
            !item.quantity ? "border-red-600" : "border-gray-100"
          } w-full mt-1 sm:mt-0 text-xs`}
        />
      </TableCell>

      <TableCell className="align-top px-2 py-2 sm:px-4 sm:py-4 w-1/2 sm:w-auto">
        <Label className="font-medium text-xs block sm:hidden">Price</Label>
        <div className="flex items-center gap-1">
          <span className="text-xs">GH₵</span>
          <Input
            required
            type="number"
            value={item.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateItem(id, "price", e.target.value)
            }
            className={`${
              !String(item.price) ? "border-red-600" : "border-gray-100"
            } w-full mt-1 sm:mt-0 text-xs`}
          />
        </div>
      </TableCell>

      <TableCell className="align-top px-2 py-2 sm:px-4 sm:py-4 w-full sm:w-auto sm:text-right">
        <div className="flex justify-between sm:block">
          <span className="text-xs block sm:hidden">Amount</span>
          <span className="text-xs">{formatCurrency(item.amount)}</span>
        </div>
      </TableCell>

      <TableCell className="align-top group hidden sm:flex">
        <RemoveItem id={id} />
      </TableCell>
    </TableRow>
  );
};

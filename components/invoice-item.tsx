"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { TableRow, TableCell } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import type { InvoiceItemSchema } from "@/types";

export const InvoiceItem = ({
  description,
  quantity,
  price,
  amount,
  id,
}: InvoiceItemSchema) => {
  return (
    <TableRow className="border-0">
      <TableCell className="whitespace-nowrap text-xs">{description}</TableCell>
      <TableCell className="text-right whitespace-nowrap text-xs">
        {quantity}
      </TableCell>
      <TableCell className="text-right whitespace-nowrap text-xs">
        {formatCurrency(price)}
      </TableCell>
      <TableCell className="text-right whitespace-nowrap text-xs">
        {formatCurrency(amount)}
      </TableCell>
    </TableRow>
  );
};

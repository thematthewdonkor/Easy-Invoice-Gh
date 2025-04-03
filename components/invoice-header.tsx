"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDeleteInvoice } from "@/hooks/useInvoices";
import { useDownloadInvoiceStore } from "@/store/useDownloadInvoiceStore";

interface InvoiceHeaderProps {
  id?: string;
  invoiceRef: React.RefObject<HTMLDivElement | null>;
}

export const InvoiceHeader = ({ id, invoiceRef }: InvoiceHeaderProps) => {
  const deleteInvoice = useDeleteInvoice();
  const router = useRouter();
  const { handleDownload } = useDownloadInvoiceStore();

  //Handle invoice download
  const handleInvoiceDownload = async () => {
    if (!invoiceRef) return;
    handleDownload(invoiceRef);
  };

  //Handle invoice update
  const handleInvoiceUpdate = () => {
    if (!id) return;

    try {
      router.push(`/invoice/edit/${id}`);
    } catch (error) {
      console.log(error, "Failed to edit invoice");
    }
  };

  //Handle invoice delete
  const handleDeleteInvoice = async () => {
    if (!id) return;

    try {
      await deleteInvoice.mutateAsync(id);
      router.push("/dashboard");
    } catch (error) {
      console.log(error, "Error deleting invoice");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        size="sm"
        variant="default"
        className="bg-indigo-500 hover:bg-indigo-600"
        onClick={() => router.push("/dashboard")}
      >
        Invoices
      </Button>

      <Button variant="outline" size="sm" onClick={handleInvoiceDownload}>
        <Download className="h-2 w-2" />
        Download
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-2 w-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="text-xs" onClick={handleInvoiceUpdate}>
            <Pencil className="h-2 w-2 mr-1" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs" onClick={handleDeleteInvoice}>
            <Trash2 className="h-2 w-2 mr-1 text-red-500" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

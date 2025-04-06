"use client";

import { useEffect } from "react";
import { useInvoice, useUpdateInvoice } from "@/hooks/useInvoices";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useRouter } from "next/navigation";
import { UploadLogo } from "@/components/Upload";
import { EditItem } from "@/components/edit-item";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EditSummary } from "@/components/edit-summary";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "@/components/login";
import { Invoice } from "@/lib/api/invoices";
import Image from "next/image";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Edit = ({ id }: { id?: string }) => {
  const { data: invoiceData } = useInvoice(id);
  const updateInvoiceMutation = useUpdateInvoice(id);
  const router = useRouter();
  const { resetInvoice } = useInvoiceStore();

  const {
    companyLogo,
    companyName,
    invoiceNumber,
    customersName,
    customersLocation,
    date,
    dueDate,
    notes,
    paymentDetails,
    items,
    subtotal,
    discount,
    deliveryCost,
    total,
    amountPaid,
    balanceDue,
    handleChange,
    addItem,
    setInvoiceData,
  } = useInvoiceStore();

  useEffect(() => {
    if (invoiceData) {
      setInvoiceData(invoiceData);
    }
  }, [invoiceData, setInvoiceData]);

  //Handle invoice update function
  const handleInvoiceUpdate = async () => {
    try {
      const requestData: Partial<Invoice> = {
        companyLogo,
        companyName,
        invoiceNumber,
        customersName,
        customersLocation,
        date,
        dueDate,
        notes,
        paymentDetails,
        subtotal,
        discount,
        deliveryCost,
        total,
        amountPaid,
        balanceDue,
        items,
      };

      updateInvoiceMutation.mutateAsync({ id, data: requestData });
      toast.success("Invoice updated successfully");
      router.push(`/invoice/preview/${id}`);
    } catch (error) {
      console.log("Failed to update invoice", error);
      toast.error("Failed to update invoice, try again");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b  mb-4 flex flex-col justify-start w-full">
        <div className=" items-center mx-auto flex h-16 sm:items-end md:items-end lg:items-center md:pb-3 justify-between px-6 md:px-6 gap-6">
          <Button
            variant="link"
            onClick={() => {
              resetInvoice();
              router.push("/");
            }}
            className="
        w-full 
        lg:w-fit"
          >
            <Image src="/logo.svg" alt="Logo" width={50} height={50} />
          </Button>
          <nav
            className="
        flex 
        items-center 
        gap-6
        "
          >
            <Button
              variant="link"
              onClick={() => router.push("/dashboard")}
              className="
            hidden 
            sm:flex     
            sm:text-lg 
            text-sm
            font-medium 
            text-gray-900
            hover:text-indigo-950
            transition
           
            "
            >
              My Invoices
            </Button>

            <Button
              variant="link"
              onClick={() => {
                resetInvoice();
                router.push("/invoice/new");
              }}
              className="hidden 
            sm:flex 
            sm:text-lg
            text-sm  
            text-gray-900
            hover:text-indigo-900
            transition 
            font-medium 
            text-primary"
            >
              New Invoice
            </Button>
          </nav>
          <div className="mb-8 sm:mb-0 ml-4">
            <LogIn />
          </div>
        </div>

        <nav className="sm:hidden flex items-center justify-between px-4 pt-4 border-t">
          <Button
            variant="link"
            onClick={() => {
              resetInvoice();
              router.push("/");
            }}
            className="
        text-sm 
        font-medium 
        text-primary
         text-gray-900
            hover:text-indigo-900
            transition
            mb-4
        "
          >
            Home
          </Button>
          <Button
            onClick={() => {
              resetInvoice();
              router.push("/invoice/new");
            }}
            className="
          flex
          items-center
            text-sm 
            transition
            font-medium
            bg-indigo-700
            px-3
            py-1.5
            rounded-lg
            text-white
            mb-4
            "
          >
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </nav>
      </header>

      <Card className="max-w-3xl mx-auto bg-white">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-4 sm:pb-7">
          <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
            <UploadLogo />
            <div className="space-y-1 w-full sm:w-auto mt-2">
              <Input
                placeholder="Your Company*"
                className={`${
                  !companyName ? "border-red-600" : "border-gray-100"
                } h-12 text-sm w-full sm:w-[200px] placeholder:text-xs
      `}
                value={companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto">
            <div className="text-left sm:text-right space-y-1 w-full sm:w-auto">
              <Label className="text-sm text-muted-foreground">INVOICE</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">#</span>
                <Input
                  className="
        h-12 
        sm:w-[200px] 
        text-sm w-full
         placeholder:text-xs
          border
       border-gray-300 rounded
      focus:outline-none
      focus:ring-1
      focus:ring-indigo-500
      focus:border-indigo-500
         "
                  value={invoiceNumber || ""}
                  onChange={(e) =>
                    handleChange("invoiceNumber", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label className="text-sm">Customer&apos;s Name*</Label>
              <Input
                required
                className={`${
                  !customersName ? "border-red-500" : "border-gray-100"
                } h-12 text-sm placeholder:text-sm
       border
     
      `}
                placeholder="Who is this to?"
                value={customersName}
                onChange={(e) => handleChange("customersName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Customer&apos;s Location</Label>
              <Input
                placeholder="(optional)"
                value={customersLocation || ""}
                onChange={(e) =>
                  handleChange("customersLocation", e.target.value)
                }
                className="placeholder:text-sm h-12
       border
       border-gray-300 rounded
      focus:outline-none
      focus:ring-1
      focus:ring-indigo-500
      focus:border-indigo-500
      text-sm
      "
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Date</Label>
              <Input
                type="date"
                value={date || ""}
                onChange={(e) => handleChange("date", e.target.value)}
                className="
    text-sm 
    block 
    px-3 
    py-1.5 
    border 
    border-gray-300 
    rounded 
    focus:outline-none 
    focus:ring-1 
    focus:ring-indigo-500 
    focus:border-indigo-500
  "
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Due Date</Label>
              <Input
                type="date"
                value={dueDate || ""}
                onChange={(e) => handleChange("dueDate", e.target.value)}
                className="text-sm block px-3 py-1.5 border-gray-300 
    rounded focus:outline-none focus:ring-1 
    focus:ring-indigo-500 focus:border-indigo-500"
                min={date}
              />
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block align-middle w-full px-4 sm:px-0">
              <Table>
                <TableHeader className="hidden sm:table-header-group w-full bg-indigo-950">
                  <TableRow className="w-full">
                    <TableHead className="w-[45%] text-white text-sm flex-1">
                      Item
                    </TableHead>
                    <TableHead className="w-[15%] text-white text-sm">
                      Quantity
                    </TableHead>
                    <TableHead className="w-[25%] text-white text-sm">
                      Price
                    </TableHead>
                    <TableHead className="text-right w-[15%] text-white text-sm">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <EditItem key={item.id} id={item.id} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="text-indigo-600 text-sm hover:text-indigo-700 w-full sm:w-auto"
            onClick={addItem}
          >
            + Add Item
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Notes</Label>
                <Textarea
                  placeholder="Notes - any relevant information not already covered"
                  className="placeholder:text-xs text-sm sm:h-24"
                  value={notes || ""}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">
                  Payment Details
                </Label>
                <Textarea
                  value={paymentDetails || ""}
                  placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
                  className="placeholder:text-xs text-sm sm:h-24"
                  onChange={(e) =>
                    handleChange("paymentDetails", e.target.value)
                  }
                />
              </div>
            </div>
            <EditSummary />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2 sm:pt-2">
            <Button
              variant="outline"
              className="w-full sm:w-auto text-sm"
              size="lg"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <Button
              className="bg-indigo-500 hover:bg-indigo-600 w-full sm:w-auto"
              onClick={handleInvoiceUpdate}
              size="lg"
              disabled={updateInvoiceMutation.isPending}
            >
              {updateInvoiceMutation.isPending ? (
                <div className="flex items-center gap-2 text-sm">
                  Updating...
                </div>
              ) : (
                <span className="text-sm">Save</span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Edit;

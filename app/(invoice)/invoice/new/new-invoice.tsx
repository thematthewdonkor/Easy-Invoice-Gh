"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Summary } from "@/components/Summary";
import { UploadLogo } from "@/components/Upload";
import { AddItem } from "@/components/add-item";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useRouter } from "next/navigation";
import { useCreateInvoice } from "@/hooks/useInvoices";
import { toast } from "react-hot-toast";

export const NewInvoice = () => {
  const router = useRouter();

  const createMutation = useCreateInvoice();
  const {
    companyName,
    invoiceNumber,
    customersName,
    customersLocation,
    date,
    dueDate,
    items,
    notes,
    paymentDetails,
    saveTemplate,
    resetInvoice,
    handleChange,
    createInvoice,
    addItem,
  } = useInvoiceStore();

  // Handle invoice creation
  const handleSubmitInvoice = async () => {
    const invoiceData = await createInvoice(createMutation.mutateAsync);

    if (invoiceData?.id) {
      resetInvoice();
      router.push(`/invoice/preview/${invoiceData.id}`);
      toast.success("Invoice created successfully");
    }
  };

  const handleTemplate = async () => {
    try {
      const confirmSave = window.confirm(
        "Do you want to override this template?"
      );
      if (confirmSave) {
        saveTemplate();
      }
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto bg-white">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-4 sm:pb-7">
        <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
          <UploadLogo />
          <div className="space-y-1 w-full sm:w-auto mt-2">
            <Input
              placeholder="Your Company*"
              className={`${
                companyName === "" ? "border-red-600" : ""
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
                value={invoiceNumber}
                onChange={(e) =>
                  handleChange("invoiceNumber", String(e.target.value))
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
                customersName === "" ? "border-red-500" : ""
              } h-12 text-sm placeholder:text-xs
          
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
              value={customersLocation}
              onChange={(e) =>
                handleChange("customersLocation", e.target.value)
              }
              className="placeholder:text-xs h-12
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
              value={date}
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
              value={dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className="text-sm block  px-3 py-1.5  border-gray-300 
          rounded 
          focus:outline-none 
          focus:ring-1 
          focus:ring-indigo-500 
          focus:border-indigo-500"
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
                  <AddItem key={item.id} id={item.id} />
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
                className=" placeholder:text-xs text-xs sm:h-24"
                value={notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Payment Details
              </Label>
              <Textarea
                value={paymentDetails}
                placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
                className="placeholder:text-xs text-sm sm:h-24"
                onChange={(e) => handleChange("paymentDetails", e.target.value)}
              />
            </div>
          </div>
          <Summary />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2 sm:pt-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto text-sm"
            size="lg"
            onClick={handleTemplate}
          >
            Save as Template
          </Button>

          <Button
            className="bg-indigo-500 hover:bg-indigo-600 w-full sm:w-auto"
            onClick={handleSubmitInvoice}
            size="lg"
            disabled={createMutation.isPending}
          >
            <span className="text-sm">Create</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

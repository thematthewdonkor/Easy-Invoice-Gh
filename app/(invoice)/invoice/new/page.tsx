"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useCreateInvoiceQuery } from "@/hooks/useInvoiceQuery";
import { useRouter } from "next/navigation";

import { Summary } from "@/components/Summary";
import { Logo } from "@/components/logo";
import { AddItem } from "@/components/add-item";

const NewInvoice = () => {
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
    handleChange,
    createInvoice,
    addItem,
  } = useInvoiceStore();

  const createInvoiceMutation = useCreateInvoiceQuery();
  const router = useRouter();

  //Handle invoice creation
  const handleSubmitInvoice = async () => {
    try {
      const invoiceId = await createInvoice(createInvoiceMutation.mutateAsync);
      router.push(`/invoice/preview/${invoiceId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-4 sm:pb-7">
          <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
            <Logo />
            <div className="space-y-1 w-full sm:w-auto mt-2">
              <Input
                placeholder="Your Company*"
                className={`${
                  companyName === "" ? "border-red-600" : ""
                } h-12 text-xs w-full sm:w-[200px] placeholder:text-xs
                border
                 border-gray-300 rounded
                focus:outline-none
                focus:ring-1
                focus:ring-indigo-500
                focus:border-indigo-500
                `}
                value={companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto">
            <div className="text-left sm:text-right space-y-1 w-full sm:w-auto">
              <Label className="text-xs text-muted-foreground">INVOICE</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">#</span>
                <Input
                  className="
                  h-12 
                  sm:w-[200px] 
                  text-xs w-full
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
                    handleChange("invoiceNumber", Number(e.target.value))
                  }
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label className="text-xs">Customer&apos;s Name*</Label>
              <Input
                required
                className={`${
                  customersName === "" ? "border-red-500" : ""
                } h-12 text-xs placeholder:text-xs
                 border
                 border-gray-300 rounded
                focus:outline-none
                focus:ring-1
                focus:ring-indigo-500
                focus:border-indigo-500
                `}
                placeholder="Who is this to?"
                value={customersName}
                onChange={(e) => handleChange("customersName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Customer&apos;s Location</Label>
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
                "
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Date</Label>
              <Input
                type="date"
                required
                value={date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="
                text-xs 
                block 
                w-64 
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
              <Label className="text-xs">Due Date</Label>
              <Input
                type="date"
                required
                value={dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
                className="text-xs block w-64 px-3 py-1.5  border-gray-300 
                rounded 
                focus:outline-none 
                focus:ring-1 
                focus:ring-indigo-500 
                focus:border-indigo-500"
                min={date}
              />
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block align-middle w-full px-4 sm:px-0">
              <Table>
                <TableHeader className="hidden sm:table-header-group w-full bg-indigo-950">
                  <TableRow className="w-full">
                    <TableHead className="w-[60%] text-white text-xs flex-1">
                      Item
                    </TableHead>
                    <TableHead className="w-[20%] text-white text-xs">
                      Quantity
                    </TableHead>
                    <TableHead className="w-[20%] text-white text-xs">
                      Price
                    </TableHead>
                    <TableHead className="text-right w-[20%] text-white text-xs">
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
            className="text-indigo-600 text-xs hover:text-indigo-700 w-full sm:w-auto"
            onClick={addItem}
          >
            + Add Item
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Notes</Label>
                <Textarea
                  placeholder="Notes - any relevant information not already covered"
                  className="h-12 placeholder:text-xs text-xs"
                  value={notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Payment Details
                </Label>
                <Textarea
                  value={paymentDetails}
                  placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
                  className="h-12 placeholder:text-xs text-xs"
                  onChange={(e) =>
                    handleChange("paymentDetails", e.target.value)
                  }
                />
              </div>
            </div>
            <Summary />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2 sm:pt-2">
            <Button
              variant="outline"
              className="w-full sm:w-auto text-xs"
              size="lg"
            >
              Save as Template
            </Button>

            <Button
              className="bg-indigo-500 hover:bg-indigo-600 w-full sm:w-auto"
              onClick={handleSubmitInvoice}
              size="lg"
              disabled={createInvoiceMutation.isPending}
            >
              {createInvoiceMutation.isPending ? (
                <div className="flex items-center gap-2 text-xs">
                  Creating...
                </div>
              ) : (
                <span className="text-xs">Create</span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewInvoice;

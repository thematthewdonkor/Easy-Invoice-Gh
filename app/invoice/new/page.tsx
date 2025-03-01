"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
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
import { LineItem } from "@/components/LineItem";
import { SummarySection } from "@/components/SummarySection";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NewInvoice = () => {
  const router = useRouter();

  //Initial items
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0, amount: 0 },
  ]);

  const [summary, setSummary] = useState({
    discount: 0,
    tax: 0,
    deliveryCost: 0,
    amountPaid: 0,
  });

  const updateLineItem = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    // If quantity or price changed, recalculate amount directly here
    if (field === "quantity" || field === "price") {
      newItems[index].amount = newItems[index].quantity * newItems[index].price;
    }

    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0, amount: 0 }]);
  };

  const updateSummary = (field: string, value: number) => {
    setSummary({ ...summary, [field]: value });
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-4 sm:pb-7">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
              <Image
                src="/company-logo.jpg"
                alt="Company Logo"
                width={100}
                height={100}
                className="w-full"
              />
            </Avatar>
            <div className="space-y-1 w-full sm:w-auto">
              <Input
                className="text-lg sm:text-xl font-semibold w-full sm:w-[200px]"
                placeholder="Your Company"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto">
            <div className="text-left sm:text-right space-y-1 w-full sm:w-auto">
              <Label className="text-sm text-muted-foreground">INVOICE</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">#</span>
                <Input className="w-full sm:w-20" defaultValue="108" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label>Customer&apos;s Name*</Label>
              <Input placeholder="Who is this to?" />
            </div>
            <div className="space-y-2">
              <Label>Customer&apos;s Location</Label>
              <Input placeholder="(optional)" />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input type="date" />
            </div>
          </div>

          {/* Responsive table with horizontal scroll on small screens */}
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Item</TableHead>
                    <TableHead className="w-[20%]">Quantity</TableHead>
                    <TableHead className="w-[20%]">Price</TableHead>
                    <TableHead className="text-right w-[20%]">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <LineItem
                      key={index}
                      index={index}
                      item={item}
                      onUpdate={updateLineItem}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <Button
            variant="outline"
            className="text-emerald-600 hover:text-emerald-700 w-full sm:w-auto"
            onClick={addItem}
          >
            + Add Item
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="Notes - any relevant information not already covered"
                  className="h-24"
                />
              </div>
              <div className="space-y-2">
                <Label>Payment Details</Label>
                <Textarea
                  placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
                  className="h-24"
                />
              </div>
            </div>

            <SummarySection
              subtotal={subtotal}
              discount={summary.discount}
              tax={summary.tax}
              deliveryCost={summary.deliveryCost}
              amountPaid={summary.amountPaid}
              onUpdate={updateSummary}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 sm:pt-6">
            <Button variant="outline" className="w-full sm:w-auto">
              Save as Template
            </Button>
            <Button
              onClick={() => router.push("/invoice/preview")}
              className="bg-emerald-500 hover:bg-emerald-600 w-full sm:w-auto"
            >
              Create
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewInvoice;

"use client";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  Share2,
  MoreHorizontal,
  User,
  Pencil,
  CircleCheck,
  Trash2,
} from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

// This would typically come from your database or state management
const invoiceData = {
  id: "126",
  date: "Feb 13, 2025",
  name: "Matthew",
  company: {
    name: "Ayodecor",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4FSorzGDojn5G9pUMe3x5lq3McXddO.png",
  },
  billTo: {
    name: "Matthew",
    location: "Tema",
  },
  items: [
    { description: "Panels", quantity: 1, rate: 50.0, amount: 50.0 },
    { description: "Glue", quantity: 10, rate: 100.0, amount: 1000.0 },
    { description: "workmanship", quantity: 89, rate: 300.0, amount: 26700.0 },
  ],
  notes: "Payment on delivery",
  terms: "Payment info\nBank Transfer",
  tax: 0,
  subtotal: 27750.0,
  total: 27750.0,
};

const InvoicePreview = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-8">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-lg sm:text-xl font-semibold flex flex-wrap items-center gap-2">
            {" "}
            Invoice #{invoiceData.id}
            <span className="text-xs sm:text-sm font-normal text-muted-foreground">
              {invoiceData.date}
            </span>
            <span className=" flex items-center text-xs sm:text-sm font-normal text-muted-foreground">
              <User className="h-4 w-4 mr-1" />
              {invoiceData.name}
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            {!isMobile && (
              <Button
                variant="default"
                size={isMobile ? "sm" : "default"}
                className="bg-indigo-500 hover:bg-indigo-600"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            )}
            {!isMobile && (
              <Button variant="outline" size={isMobile ? "sm" : "default"}>
                <Download className="h-4 w-4" />
                Download
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isMobile && (
                  <>
                    <DropdownMenuItem>
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem>
                  <Pencil className="h-2 w-2 mr-1" />
                  Edit{" "}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CircleCheck className="w-2 h-2 mr-1" />
                  Mark as paid{" "}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete{" "}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;

"use client";

import { Button } from "./ui/button";
import { X } from "lucide-react";

import { useInvoiceStore } from "@/store/useInvoiceStore";

export const RemoveItem = ({ id }: { id: string }) => {
  const { removeItem } = useInvoiceStore();
  return (
    <Button
      onClick={() => removeItem(id)}
      className=" 
      sm:opacity-0
       sm:group-hover:opacity-100 
       transition-opacity  
       duration-200
       bg-transparent 
       hover:bg-transparent 
       shadow-none
    "
      size="sm"
    >
      <X className="text-indigo-600 w-1 h-1" />
    </Button>
  );
};

"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Share2, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InvoiceHeader = () => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        size="sm"
        variant="default"
        className="bg-indigo-500 hover:bg-indigo-600"
      >
        <Share2 className="h-2 w-2 mr-2" />
        Share
      </Button>

      <Button variant="outline" size="sm">
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
          <DropdownMenuItem className="text-xs">
            <Pencil className="h-2 w-2 mr-1" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs">
            <Trash2 className="h-2 w-2 mr-1 text-red-500" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

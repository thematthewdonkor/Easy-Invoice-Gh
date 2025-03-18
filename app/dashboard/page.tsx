"use client";
import { Table, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const Dashboardpage = () => {
  const router = useRouter();
  return (
    <div className="w-full p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start mb-6 justify-between sm:items-center">
        <h1 className="text-2xl font-bold">My invoices</h1>

        <Button
          onClick={() => router.push("/invoice/new")}
          className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus />
          New invoice
        </Button>
      </div>

      {/* Table  */}
      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">CUSTOMER</TableHead>
              <TableHead>REFERENCE</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>DUE DATE</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead className="text-right">TOTAL</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </div>
  );
};

export default Dashboardpage;

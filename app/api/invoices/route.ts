import { NextRequest, NextResponse } from "next/server";
import { createInvoice, getUserInvoices } from "@/db/action";
import { InvoiceSchema } from "@/types";
import toast from "react-hot-toast";

//Create new invoice
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ["companyName", "customersName"];

    for (const field of requiredFields) {
      if (!body[field]) toast.error("Enter company and customer name");
    }

    const invoice = await createInvoice(body as InvoiceSchema);
    return NextResponse.json({ success: true, data: invoice }, { status: 201 });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

//Get all invoices of the user
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const invoices = await getUserInvoices();
    return NextResponse.json(
      { success: true, data: invoices },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { createInvoiceAction } from "@/db/actions";

// Handle POST request to create an invoice
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const invoice = await createInvoiceAction(body);

    return NextResponse.json({ data: invoice }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create invoices:from the API" },
      { status: 500 }
    );
  }
}

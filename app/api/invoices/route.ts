import { NextResponse } from "next/server";
import { getInvoice, createInvoice } from "@/db/actions/actions";

// Handle GET request to fetch invoices
export async function GET() {
  try {
    const invoices = await getInvoice();
    return NextResponse.json({ data: invoices });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}

// Handle POST request to create an invoice
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const invoice = await createInvoice(body);
    return NextResponse.json({ data: invoice }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create invoices" },
      { status: 500 }
    );
  }
}

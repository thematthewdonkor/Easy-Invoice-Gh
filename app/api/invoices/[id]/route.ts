import { NextResponse } from "next/server";
import {
  getInvoiceWithItems,
  updateInvoice,
  deleteInvoice,
  markAsPaid,
} from "@/db/actions/actions";

//  Get single invoice with items
export async function GET({ params }: { params: { id: string } }) {
  try {
    const invoice = await getInvoiceWithItems(params.id);
    return NextResponse.json(invoice);
  } catch (error) {
    console.error(error, "Invoice fetching request failed");
    return NextResponse.json(
      { error: "Failed to fetch invoice" },
      { status: 500 }
    );
  }
}

//  Update invoice
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const invoice = await updateInvoice(params.id, body);
    return NextResponse.json(invoice);
  } catch (error) {
    console.error(error, "Invoice update request failed");
    return NextResponse.json(
      { error: "Failed to edit invoice" },
      { status: 500 }
    );
  }
}

// Remove invoice
export async function DELETE({ params }: { params: { id: string } }) {
  try {
    await deleteInvoice(params.id);
    return NextResponse.json({ message: "Invoice deleted" });
  } catch (error) {
    console.error(error, "Invoice deletion request failed");
    return NextResponse.json(
      { error: "Failed to delete invoice" },
      { status: 500 }
    );
  }
}

//  Mark invoice as paid
export async function PATCH({ params }: { params: { id: string } }) {
  try {
    const invoice = await markAsPaid(params.id);
    return NextResponse.json(invoice);
  } catch (error) {
    console.error(error, "Payment status request failed");
    return NextResponse.json(
      { error: "Failed to change payment status" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import {
  getInvoiceByUserIdAction,
  updateInvoiceAction,
  deleteInvoiceAction,
  markAsPaidAction,
} from "@/db/actions";

//Get invoice by id
export async function GET(
  req: Request,
  context: { params: { invoiceId?: string } }
) {
  const { invoiceId } = await context.params;

  console.log("API route hit with params:", invoiceId);

  // ✅ Check if `invoiceId` is valid
  if (!invoiceId) {
    return NextResponse.json(
      { error: "Invoice ID is required" },
      { status: 400 }
    );
  }

  try {
    const invoice = await getInvoiceByUserIdAction(invoiceId);
    console.log("Invoice fetched:", invoice);

    // ✅ Return 404 if invoice not found
    if (!invoice || Object.keys(invoice).length === 0) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ data: invoice }, { status: 200 });
  } catch (error) {
    console.error("Invoice fetching request failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoice" },
      { status: 500 }
    );
  }
}

//Update invoice
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const invoice = await updateInvoiceAction(params.id, body);

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ data: invoice }, { status: 200 });
  } catch (error) {
    console.error(error, "Invoice update request failed");
    return NextResponse.json(
      { error: "Failed to edit invoice" },
      { status: 500 }
    );
  }
}

//Remove invoice
export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const deleteInvoice = await deleteInvoiceAction(params.id);

    if (!deleteInvoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Invoice successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error, "Invoice deletion request failed");
    return NextResponse.json(
      { error: "Failed to delete invoice" },
      { status: 500 }
    );
  }
}

//Mark invoice as paid
export async function PATCH({ params }: { params: { id: string } }) {
  try {
    const invoice = await markAsPaidAction(params.id);

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ data: invoice }, { status: 200 });
  } catch (error) {
    console.error(error, "Payment status request failed");
    return NextResponse.json(
      { error: "Failed to change payment status" },
      { status: 500 }
    );
  }
}

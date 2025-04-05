import { NextRequest, NextResponse } from "next/server";
import { getInvoiceById, updateInvoice, deleteInvoice } from "@/db/action";

//Get invoice by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const invoice = await getInvoiceById(id);
    return NextResponse.json({ success: true, data: invoice }, { status: 200 });
  } catch (error) {
    console.error("Error fetching invoice:", error);

    // Different status code for not found vs unauthorized
    const status = (error as Error).message.includes("not found")
      ? 404
      : (error as Error).message.includes("Unauthorized")
      ? 403
      : 500;

    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const updatedInvoice = await updateInvoice(id, body);
    return NextResponse.json(
      { success: true, data: updatedInvoice },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating invoice:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const result = await deleteInvoice(id);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("Error deleting invoice:", error);

    const status = (error as Error).message.includes("not found")
      ? 404
      : (error as Error).message.includes("Unauthorized")
      ? 403
      : 500;

    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status }
    );
  }
}

/* DYNAMIC ROUTE SEGMENT
Create request handlers from dynamic data
Route => app/api/invoices/[id]/route.ts
*/

import { db } from "./drizzle";
import { eq, desc } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { users, invoices, invoiceItems } from "./schema";
import { InvoiceSchema } from "@/types";

// Create user
export const createUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("No authenticated user found!");
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.userId, userId));

  if (!existingUser.length) {
    await db.insert(users).values({ userId });
  }

  return { userId };
};

// Create invoice with items
export const createInvoice = async (invoice: InvoiceSchema) => {
  const { userId } = await createUser();

  if (!userId) {
    throw new Error("No authenticated user found!");
  }

  return await db.transaction(async (trx) => {
    const newInvoice = await trx
      .insert(invoices)
      .values({
        userId,
        companyLogo: invoice.companyLogo || null,
        companyName: invoice.companyName,
        invoiceNumber: invoice.invoiceNumber || null,
        customersName: invoice.customersName,
        customersLocation: invoice.customersLocation || null,
        date: invoice.date || null,
        dueDate: invoice.dueDate || null,
        notes: invoice.notes || null,
        paymentDetails: invoice.paymentDetails || null,
        subtotal: invoice.subtotal,
        discount: invoice.discount || null,
        deliveryCost: invoice.deliveryCost || null,
        total: invoice.total,
        amountPaid: invoice.amountPaid || null,
        balanceDue: invoice.balanceDue,
      })
      .returning();

    if (!newInvoice.length) {
      throw new Error("Failed to create invoice!");
    }

    const invoiceId = newInvoice[0].id;

    if (invoice.items.length) {
      await trx.insert(invoiceItems).values(
        invoice.items.map((item) => ({
          invoiceId,
          description: item.description,
          quantity: item.quantity,
          price: item.price,
          amount: item.amount,
        }))
      );
    }

    return newInvoice[0];
  });
};

// Get invoice by invoice id
export const getInvoiceById = async (id: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("No authenticated user found!");
  }

  // Fetch the invoice
  const invoice = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, id))
    .then((rows) => rows[0]);

  if (!invoice) {
    throw new Error("Invoice not found!");
  }

  // Verify ownership
  if (invoice.userId !== userId) {
    throw new Error("Unauthorized access to invoice!");
  }

  // Fetch the invoice items
  const items = await db
    .select()
    .from(invoiceItems)
    .where(eq(invoiceItems.invoiceId, id));

  return { ...invoice, items };
};

// Get all invoices by the user
export const getUserInvoices = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("No authenticated user found!");
  }

  const userInvoices = await db
    .select()
    .from(invoices)
    .where(eq(invoices.userId, userId))
    .orderBy(desc(invoices.createdAt));

  return userInvoices;
};

// Update invoice
export const updateInvoice = async (
  invoiceId: string,
  invoice: Partial<InvoiceSchema>
) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("No authenticated user found!");
  }

  // Check if invoice exists
  const existingInvoice = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, invoiceId));

  if (!existingInvoice.length) {
    throw new Error("Invoice not found!");
  }

  if (existingInvoice[0].userId !== userId) {
    throw new Error("Unauthorized access to invoice!");
  }

  // Update Invoice
  await db
    .update(invoices)
    .set({
      ...invoice,
      updatedAt: new Date(),
    })
    .where(eq(invoices.id, invoiceId));

  // Delete old items
  await db.delete(invoiceItems).where(eq(invoiceItems.invoiceId, invoiceId));

  // Insert new items
  if (invoice.items && invoice.items.length) {
    await db.insert(invoiceItems).values(
      invoice.items.map((item) => ({
        invoiceId,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        amount: item.amount,
      }))
    );
  }

  return { message: "Invoice updated successfully" };
};

//Delete invoice
export const deleteInvoice = async (invoiceId: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("No authenticated user found!");
  }

  // Check if invoice exists
  const existingInvoice = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, invoiceId));

  if (!existingInvoice.length) {
    throw new Error("Invoice not found!");
  }

  if (existingInvoice[0].userId !== userId) {
    throw new Error("Unauthorized access to invoice!");
  }

  // Delete invoice (items will be deleted due to ON DELETE CASCADE)
  await db.delete(invoices).where(eq(invoices.id, invoiceId));

  return { success: true, message: "Invoice deleted successfully" };
};

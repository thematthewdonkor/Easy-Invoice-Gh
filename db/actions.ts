import { db } from "./drizzle";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import { invoiceItem, invoices, users } from "@/db/schema";
import { InvoiceSchema } from "@/types";

//Create user function
export const createUserAction = async () => {
  const { userId } = await auth();

  // Check if user is not authenticated
  if (!userId) {
    throw new Error("Unauthorized: No user found");
  }

  try {
    // Check if user already exists in the database
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.clerk_id, userId)) // Use clerk_id instead of id
      .then((res) => res[0]);

    // If user exists, return the user
    if (existingUser) {
      return existingUser;
    }

    // If user doesn't exist, create a new user
    const [newUser] = await db
      .insert(users)
      .values({ clerk_id: userId }) // Insert userId into clerk_id
      .returning();

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

//Create invoice function
export const createInvoiceAction = async (invoiceInputData: InvoiceSchema) => {
  const { clerk_id: userId } = await createUserAction();

  try {
    return await db.transaction(async (tx) => {
      const [newInvoice] = await tx
        .insert(invoices)
        .values({
          clerkId: userId,
          companyLogo: invoiceInputData.companyLogo ?? null,
          companyName: invoiceInputData.companyName,
          customersName: invoiceInputData.customersName,
          invoiceNumber: invoiceInputData.invoiceNumber ?? null,
          customersLocation: invoiceInputData.customersLocation ?? null,
          date: invoiceInputData.date ? new Date(invoiceInputData.date) : null,
          dueDate: invoiceInputData.dueDate
            ? new Date(invoiceInputData.dueDate)
            : null,
          notes: invoiceInputData.notes ?? null,
          paymentDetails: invoiceInputData.paymentDetails ?? null,

          subtotal: invoiceInputData.summary.subtotal,
          discount: invoiceInputData.summary.discount ?? "0",
          taxRate: invoiceInputData.summary.taxRate ?? "0",
          deliveryCost: invoiceInputData.summary.deliveryCost ?? "0",
          total: invoiceInputData.summary.total,
          amountPaid: invoiceInputData.summary.amountPaid ?? "0",
          balanceDue: invoiceInputData.summary.balanceDue,

          status: "unpaid",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (invoiceInputData.items?.length) {
        await tx.insert(invoiceItem).values(
          invoiceInputData.items.map(
            ({ description, quantity, price, amount }) => ({
              invoiceId: newInvoice.id,
              description,
              quantity,
              price,
              amount,
            })
          )
        );
      }

      return newInvoice;
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw new Error("Failed to create invoice");
  }
};

//Get all invoices of the current active user function
export const getInvoiceAction = async () => {
  const user = await createUserAction();
  const userId = user?.clerk_id;
  console.log(userId, "USER OBJECT");

  if (!userId) {
    console.log("Unauthorized:USER NOT FOUND!");
  }

  return await db.select().from(invoices).where(eq(invoices.clerkId, userId));
};

//Get invoice by user id
export const getInvoiceByUserIdAction = async (invoiceId: string) => {
  const user = await createUserAction(); // Ensure this function is necessary
  if (!user || !user.clerk_id) {
    console.log("Unauthorized: User not found!");
    throw new Error("Unauthorized: User not found");
  }

  const userId = user.clerk_id;
  console.log(userId, "USER OBJECT");

  const invoiceResult = await db
    .select()
    .from(invoices)
    .where(and(eq(invoices.id, invoiceId), eq(invoices.clerkId, userId)));

  const invoice = invoiceResult[0];

  if (!invoice) {
    console.log(`No invoice found with ID ${invoiceId} for user ${userId}`);
    return {};
  }

  // Fetch all invoice items
  const items = await db
    .select()
    .from(invoiceItem)
    .where(eq(invoiceItem.invoiceId, invoiceId));

  return { ...invoice, items };
};

//Update invoice function
export const updateInvoiceAction = async (
  invoiceId: string,
  updateData: Partial<Omit<InvoiceSchema, "id" | "userId" | "date" | "dueDate">>
) => {
  const user = await createUserAction();
  const userId = user?.clerk_id;
  // console.log(userId, "USER OBJECT");

  if (!userId) {
    console.log("Unauthorized:USER NOT FOUND!");
  }

  // Main invoice update
  const [updatedInvoice] = await db
    .update(invoices)
    .set(updateData)
    .where(and(eq(invoices.id, invoiceId), eq(invoices.clerkId, userId)))
    .returning();

  // Handle items update if present
  if (updateData.items) {
    await db.delete(invoiceItem).where(eq(invoiceItem.invoiceId, invoiceId));

    //Recalculate the amount after invoice update
    await db.insert(invoiceItem).values(
      updateData.items.map((item) => ({
        ...item,
        invoiceId,
        amount: item.quantity * item.price,
      }))
    );
  }

  return updatedInvoice;
};

//Delete invoice function
export const deleteInvoiceAction = async (invoiceId: string) => {
  const user = await createUserAction();
  const userId = user?.clerk_id;
  // console.log(userId, "USER OBJECT");

  if (!userId) {
    console.log("Unauthorized:USER NOT FOUND!");
  }

  return await db
    .delete(invoices)
    .where(and(eq(invoices.id, invoiceId), eq(invoices.clerkId, userId)));
};

//Mark invoice as paid function
export const markAsPaidAction = async (invoiceId: string) => {
  const user = await createUserAction();
  const userId = user?.clerk_id;
  // console.log(userId, "USER OBJECT");

  if (!userId) {
    console.log("Unauthorized:USER NOT FOUND!");
  }

  const [existingInvoice] = await db
    .select()
    .from(invoices)
    .where(and(eq(invoices.id, invoiceId), eq(invoices.clerkId, userId)));

  if (!existingInvoice) {
    throw new Error("Invoice not found");
  }

  return await db
    .update(invoices)
    .set({ status: "paid" })
    .where(and(eq(invoices.id, invoiceId), eq(invoices.clerkId, userId)));
};

//paginated invoice function
export const getPaginatedInvoicesAction = async (
  limit: number,
  offset: number
) => {
  const user = await createUserAction();
  const userId = user?.clerk_id;
  // console.log(userId, "USER OBJECT");

  if (!userId) {
    console.log("Unauthorized:USER NOT FOUND!");
  }

  return await db
    .select()
    .from(invoices)
    .where(eq(invoices.clerkId, userId))
    .limit(limit)
    .offset(offset);
};

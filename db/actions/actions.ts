import { invoiceItem, invoices, users } from "@/db/schema";
import { db } from "../drizzle";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { CreateInvoiceInput } from "@/types";

//=====================================Add User to the database
export const createUser = async () => {
  const { userId } = await auth();

  //check if user is not authenticated
  if (!userId) {
    throw new Error("Unauthorized:no user found");
  }

  try {
    //check if user already exist in the database
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId));

    //Check if at least there is existing 1 user in the database
    if (existingUser.length > 0) {
      return existingUser[0];
    }

    //If user doesn't exist then create new user
    const newUser = await db
      .insert(users)
      .values({
        clerkId: userId,
      })
      .returning();

    return newUser[0];
  } catch (error) {
    console.error("Error creating user", error);
    throw new Error("Failed to create user");
  }
};

//=====================================Create invoice and the item to the database
export const createInvoice = async (invoiceInputData: CreateInvoiceInput) => {
  //Get authenticated user id
  const { userId } = await auth();
  //check if user is not authenticated
  if (!userId) {
    throw new Error("Unauthorized: no user found");
  }
  try {
    //Create invoice and the items together
    return await db.transaction(async (tx) => {
      //create the invoice
      const [newInvoice] = await tx
        .insert(invoices)
        .values({
          id: invoiceInputData.id,
          userId,
          companyLogo: invoiceInputData.companyLogo,
          companyName: invoiceInputData.companyName,
          customersName: invoiceInputData.customersName,
          invoiceNumber: invoiceInputData.invoiceNumber,
          customersLocation: invoiceInputData.customersLocation || null,
          description: invoiceInputData.description,
          notes: invoiceInputData.notes || null,
          paymentDetails: invoiceInputData.paymentDetails || null,
          discount: invoiceInputData.discount || "0",
          taXRate: invoiceInputData.taxRate || "0",
          subTotal: invoiceInputData.subTotal,
          total: invoiceInputData.total,
          balanceDue: invoiceInputData.balanceDue,
          status: "unpaid",
        })
        .returning();

      //creating the invoice item
      if (invoiceInputData.items && invoiceInputData.items.length > 0) {
        const invoiceItemData = invoiceInputData.items.map((item) => ({
          invoiceId: newInvoice.id,
          description: item.description,
          quantity: item.quantity,
          price: item.price,
          amount: item.amount,
        }));
        await tx.insert(invoiceItem).values(invoiceItemData);
      }
    });
  } catch (error) {
    console.error("Error creating invoice", error);
    throw new Error("Failed to create invoice");
  }
};

//===================================== Get all invoices of the current user
export const getInvoice = async () => {
  //get the user id
  const { userId } = await auth();

  //check if user is not authenticated or login
  if (!userId) {
    throw new Error("Unauthorized: no user found");
  }

  //Get all invoices of the current active user from the database
  const invoiceData = await db
    .select()
    .from(invoices)
    .where(eq(invoices.userId, userId));

  return invoiceData;
};

//=====================================Get single invoice with the invoice item
export const getInvoiceWithItems = async (invoiceId: string) => {
  //Get the user id
  const { userId } = await auth();

  //Check if the user is not authenticated
  if (!userId) {
    throw new Error("Unauthorized: no User found");
  }

  //Get single invoice with the invoice item
  const invoice = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, invoiceId))
    .then((res) => res[0]);

  if (!invoice) {
    throw new Error(`Invoice with ID ${invoiceId} not found`);
  }

  // Get all invoice items
  const items = await db
    .select()
    .from(invoiceItem)
    .where(eq(invoiceItem.invoiceId, invoiceId))
    .then((res) => res[0]);

  return { ...invoice, items };
};

//=====================================Update invoice
export const updateInvoice = async (
  invoiceId: string,
  updateData: Partial<CreateInvoiceInput>
) => {
  //Get the user id
  const { userId } = await auth();

  //Check if the user is authenticated
  if (!userId) {
    throw new Error("Unauthorized: no User found");
  }

  return await db
    .update(invoices)
    .set(updateData)
    .where(eq(invoices.id, invoiceId))
    .returning();
};

//=====================================Delete invoice
export const deleteInvoice = async (invoiceId: string) => {
  //Get the user id
  const { userId } = await auth();

  //Check if the user is not authenticated
  if (!userId) {
    throw new Error("Unauthorized: no User found");
  }

  return await db.delete(invoices).where(eq(invoices.id, invoiceId));
};

//===================================== Payment status management
export const markAsPaid = async (invoiceId: string) => {
  const [existingInvoice] = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, invoiceId));

  if (!existingInvoice) {
    throw new Error("Invoice not found");
  }

  return await db
    .update(invoices)
    .set({ status: "paid" })
    .where(eq(invoices.id, invoiceId));
};

//===================================== Paginated invoices
export const getPaginatedInvoices = async (limit: number, offset: number) => {
  return await db.select().from(invoices).limit(limit).offset(offset);
};

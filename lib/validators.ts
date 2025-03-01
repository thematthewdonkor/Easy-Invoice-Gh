import { z } from "zod";

export const InvoiceItemSchema = z.object({
  description: z.string().min(3, "Description must be at least 3 characters"),
  quantity: z.number().positive(),
  price: z.string(),
});

export const CreateInvoiceSchema = z.object({
  companyLogo: z.string(),
  companyName: z.string().min(1, "Company name must be at least 1 character"),
  customerName: z.string().min(1, "Customer name must be at least 1 character"),
  items: z.array(InvoiceItemSchema).min(1),
  invoiceNumber: z.string(),
});

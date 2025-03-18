// src/services/invoice-service.ts
import { InvoiceSchema, NewInvoiceProps } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const validateAndFormatInvoice = (
  state: NewInvoiceProps
): InvoiceSchema => {
  // Destructure needed properties from state
  const {
    companyLogo,
    companyName,
    invoiceNumber,
    customersName,
    customersLocation,
    date,
    dueDate,
    notes,
    paymentDetails,
    items,
    summary,
  } = state;

  // Validate required fields
  if (!companyName || !customersName || items.length === 0) {
    throw new Error("Missing required invoice details");
  }

  // Format and return invoice data
  return {
    companyLogo,
    companyName,
    invoiceNumber,
    customersName,
    customersLocation,
    date,
    dueDate,
    notes,
    paymentDetails,
    items: items.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      price: item.price,
      amount: item.amount,
    })),
    summary: {
      subtotal: summary.subtotal,
      discount: summary.discount,
      taxRate: summary.taxRate,
      deliveryCost: summary.deliveryCost,
      total: summary.total,
      amountPaid: summary.amountPaid,
      balanceDue: summary.balanceDue,
    },
  };
};

export const createNewInvoiceItem = () => ({
  id: uuidv4(),
  description: "",
  quantity: 1,
  price: 0,
  amount: 0,
});

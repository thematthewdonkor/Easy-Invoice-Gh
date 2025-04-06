import { Invoice } from "@/lib/api/invoices";

//====================INVOICE SCHEMA
export type InvoiceSchema = {
  companyLogo?: string;
  companyName: string;
  invoiceNumber?: string;
  customersName: string;
  customersLocation?: string;
  date?: string; // Can use Date type if needed
  dueDate?: string;
  notes?: string;
  paymentDetails?: string;

  items: InvoiceItemSchema[]; // Array of invoice items

  subtotal: string;
  discount?: string;
  deliveryCost?: string;
  total: string;
  amountPaid?: string;
  balanceDue: string;
};

// New Invoice Item Schema
export type InvoiceItemSchema = {
  id: string;
  description?: string;
  quantity: number;
  price: string;
  amount: string;
};
// New Invoice Item Schema
export type SummaryProps = {
  subtotal: string;
  discount?: string;
  deliveryCost?: string;
  total: string;
  amountPaid?: string;
  balanceDue: string;
};

//====================NEW INVOICE SCHEMA
export type NewInvoiceProps = Omit<
  InvoiceSchema,
  "description" | "quantity" | "price" | "amount"
> & {
  items: {
    id: string;
    description?: string;
    quantity: number;
    price: string;
    amount: string;
  }[];

  //actions
  saveTemplate: () => void;
  resetInvoice: () => void;
  createInvoice: (
    mutateAsyncFn: (data: InvoiceSchema) => Promise<Invoice>
  ) => Promise<Invoice>;
  setInvoiceData: (invoiceData: InvoiceSchema) => void;
  handleChange: (field: string, value: string) => void;
  updateItem: (id: string, field: string, value?: string) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
};

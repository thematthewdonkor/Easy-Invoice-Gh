export type CreateInvoiceInput = {
  id: string;
  companyLogo: string;
  companyName: string;
  invoiceNumber: string;
  customersName: string;
  customersLocation: string;
  date?: string;
  dueDate?: string;
  notes?: string;
  paymentDetails?: string;

  items: [
    {
      description: string;
      quantity: number;
      price: number;
      amount: string;
    }
  ];

  summary: {
    subTotal: string;
    discount?: string;
    taxRate?: string;
    deliveryCost?: string;
    total: string;
    amountPaid: string;
    balanceDue: string;
  };
};

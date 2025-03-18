//Create invoice schema types
export type InvoiceSchema = {
  // Invoice details types
  companyLogo?: string;
  companyName: string;
  invoiceNumber?: number;
  customersName: string;
  customersLocation?: string;
  date?: string;
  dueDate?: string;
  notes?: string;
  paymentDetails?: string;

  //Invoice items types
  items: {
    description: string;
    quantity: number;
    price: number;
    amount: number;
  }[];

  //Summary types
  summary: {
    subtotal: number;
    discount?: number;
    taxRate?: number;
    deliveryCost?: number;
    total: number;
    amountPaid?: number;
    balanceDue: number;
  };
};

//NewInvoice component Props
export type NewInvoiceProps = {
  //Invoice details
  companyLogo: string;
  // logo: boolean;
  companyName: string;
  invoiceNumber: number;
  customersName: string;
  customersLocation: string;
  date?: string;
  dueDate?: string;
  notes?: string;
  paymentDetails?: string;

  items: AddItemProps[];
  summary: SummaryProps;

  //actions
  createInvoice: (
    mutateAsyncFn: (data: InvoiceSchema) => Promise<{ data: { id: string } }>
  ) => Promise<string>;
  handleChange: (field: string, value: string | number) => void;
  updateItem: (id: string, field: string, value: string | number) => void;
  addItem: () => void;
  updateSummary: (field: string, value: number) => void;
  calculateSubtotal: () => number;
  removeItem: (id: string) => void;
};

//AddItem component Props
export type AddItemProps = {
  id: string;
  description: string;
  quantity: number;
  price: number;
  amount: number;
};

//Summary component Props
export type SummaryProps = {
  subtotal: number;
  discount: number;
  taxRate: number;
  total: number;
  deliveryCost: number;
  amountPaid: number;
  balanceDue: number;
};

//ItemItem component Props
export type InvoiceItemProps = {
  key: string;
  description: string;
  quantity: number;
  price: number;
  amount: number;
};

export type InvoiceProps = {
  invoiceId: string;
};

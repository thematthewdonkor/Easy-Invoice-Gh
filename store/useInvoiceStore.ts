import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  amount: number;
}

interface SummaryData {
  discount: number;
  tax: number;
  deliveryCost: number;
  amountPaid: number;
}

interface InvoiceState {
  // Invoice details
  companyName: string;
  companyLogo: string;
  invoiceNumber: string;
  customersName: string;
  customersLocation: string;
  date: string;
  dueDate: string;
  notes: string;
  paymentDetails: string;

  // Line items
  items: InvoiceItem[];

  // Summary data
  summary: SummaryData;

  // Calculated values
  subtotal: number;

  // Actions
  setField: (field: string, value: string | number) => void;
  updateLineItem: (
    index: number,
    field: string,
    value: string | number
  ) => void;
  addItem: () => void;
  updateSummary: (field: string, value: number) => void;
  calculateSubtotal: () => number;
}

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set, get) => ({
      // Invoice details
      companyName: "",
      companyLogo: "/company-logo.jpg",
      invoiceNumber: "108",
      customersName: "",
      customersLocation: "",
      date: "",
      dueDate: "",
      notes: "",
      paymentDetails: "",

      // Line items
      items: [{ description: "", quantity: 1, price: 0, amount: 0 }],

      // Summary data
      summary: {
        discount: 0,
        tax: 0,
        deliveryCost: 0,
        amountPaid: 0,
      },

      // Calculated values
      subtotal: 0,

      // Actions
      setField: (field, value) => {
        set({ [field]: value });
      },

      updateLineItem: (index, field, value) => {
        set((state) => {
          const newItems = [...state.items];
          newItems[index] = { ...newItems[index], [field]: value };

          // If quantity or price changed, recalculate amount
          if (field === "quantity" || field === "price") {
            newItems[index].amount =
              newItems[index].quantity * newItems[index].price;
          }

          // Recalculate subtotal
          const subtotal = newItems.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
          );

          return { items: newItems, subtotal };
        });
      },

      addItem: () => {
        set((state) => ({
          items: [
            ...state.items,
            { description: "", quantity: 1, price: 0, amount: 0 },
          ],
        }));
      },

      updateSummary: (field, value) => {
        set((state) => ({
          summary: { ...state.summary, [field]: value },
        }));
      },

      calculateSubtotal: () => {
        const { items } = get();
        const subtotal = items.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0
        );
        set({ subtotal });
        return subtotal;
      },
    }),
    {
      name: "invoice-store",
      partialize: (state) => ({
        companyName: state.companyName,
        companyLogo: state.companyLogo,
        invoiceNumber: state.invoiceNumber,
        customersName: state.customersName,
        customersLocation: state.customersLocation,
        date: state.date,
        dueDate: state.dueDate,
        notes: state.notes,
        paymentDetails: state.paymentDetails,
        items: state.items,
        summary: state.summary,
      }),
    }
  )
);

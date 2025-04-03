import { Invoice } from "@/lib/api/invoices";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NewInvoiceProps, InvoiceSchema, InvoiceItemSchema } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const useInvoiceStore = create<NewInvoiceProps>()(
  persist(
    (set, get) => ({
      companyLogo: "",
      companyName: "",
      invoiceNumber: "",
      customersName: "",
      customersLocation: "",
      date: "",
      dueDate: "",
      notes: "",
      paymentDetails: "",
      items: [],
      subtotal: "0.00",
      discount: "",
      deliveryCost: "0",
      total: "0.00",
      amountPaid: "0",
      balanceDue: "0.00",

      createInvoice: async (
        mutateAsyncFn: (data: InvoiceSchema) => Promise<Invoice>
      ) => {
        const state = get();

        if (state.items.length === 0) {
          throw new Error(
            "At least one item is required to create an invoice."
          );
        }

        const invoiceData: InvoiceSchema = {
          companyLogo: state.companyLogo || "",
          companyName: state.companyName || "",
          invoiceNumber: state.invoiceNumber || "",
          customersName: state.customersName || "",
          customersLocation: state.customersLocation || "",
          date: state.date || "",
          dueDate: state.dueDate || "",
          notes: state.notes || "",
          paymentDetails: state.paymentDetails || "",
          items: state.items.map((item) => ({
            id: item.id,
            description: item.description || "",
            quantity: item.quantity || 0,
            price: item.price || "0",
            amount: item.amount || "0.00",
          })),
          subtotal: state.subtotal || "0.00",
          discount: state.discount || "0.00",
          deliveryCost: state.deliveryCost || "0.00",
          total: state.total || "0.00",
          amountPaid: state.amountPaid || "0.00",
          balanceDue: state.balanceDue || "0.00",
        };

        return await mutateAsyncFn(invoiceData);
      },

      //Actions
      resetInvoice: () =>
        set({
          // companyLogo: "",
          // companyName: "",
          // notes: "",
          // paymentDetails: "",
          invoiceNumber: "",
          customersName: "",
          customersLocation: "",
          date: "",
          dueDate: "",

          items: [],
          subtotal: "0.00",
          discount: "0",
          deliveryCost: "0",
          total: "0.00",
          amountPaid: "0",
          balanceDue: "0.00",
        }),

      setInvoiceData: (invoiceData) => set(invoiceData),

      handleChange: (field: string, value: string) =>
        set((state) => {
          const updatedState = { ...state, [field]: value };
          const subtotal = parseFloat(updatedState.subtotal || "0") || 0;
          const discount = parseFloat(updatedState.discount || "0") || 0;
          const deliveryCost =
            parseFloat(updatedState.deliveryCost || "0") || 0;
          const amountPaid = parseFloat(updatedState.amountPaid || "0") || 0;
          if (["discount", "deliveryCost", "amountPaid"].includes(field)) {
            const total = subtotal - discount + deliveryCost;
            return {
              ...updatedState,
              total: total.toFixed(2),
              balanceDue: (total - amountPaid).toFixed(2),
            };
          }
          return updatedState;
        }),

      updateItem: (id: string, field: string, value?: string) => {
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id === id) {
              const updatedItem = { ...item, [field]: value ?? "" };

              if (field === "quantity" || field === "price") {
                const qty = updatedItem.quantity || 0;
                const price = parseFloat(updatedItem.price || "0") || 0;
                updatedItem.amount = (qty * price).toFixed(2);
              }
              return updatedItem;
            }
            return item;
          });

          const subtotal = newItems.reduce(
            (acc, item) => acc + (parseFloat(item.amount || "0") || 0),
            0
          );
          const total =
            subtotal -
            (parseFloat(state.discount || "0") || 0) +
            (parseFloat(state.deliveryCost || "0") || 0);
          const balanceDue = total - (parseFloat(state.amountPaid || "0") || 0);

          return {
            items: newItems,
            subtotal: subtotal.toFixed(2),
            total: total.toFixed(2),
            balanceDue: balanceDue.toFixed(2),
          };
        });
      },

      addItem: () =>
        set((state) => {
          const newItem: InvoiceItemSchema = {
            id: uuidv4(),
            description: "",
            quantity: 1, // Default to 1
            price: "0.00",
            amount: "0.00",
          };
          return { items: [...state.items, newItem] };
        }),

      removeItem: (id: string) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);

          const subtotal = newItems.reduce(
            (acc, item) => acc + parseFloat(item.amount || "0"),
            0
          );

          const discount = parseFloat(state.discount || "0") || 0;
          const deliveryCost = parseFloat(state.deliveryCost || "0") || 0;
          const amountPaid = parseFloat(state.amountPaid || "0") || 0;

          const total = subtotal - discount + deliveryCost;
          const balanceDue = total - amountPaid;

          return {
            items: newItems,
            subtotal: subtotal.toFixed(2),
            total: total.toFixed(2),
            balanceDue: balanceDue.toFixed(2),
          };
        }),

      saveTemplate: () => {
        const state = get();
        set({
          companyLogo: state.companyLogo,
          notes: state.notes,
          paymentDetails: state.paymentDetails,
        });
      },
    }),
    {
      name: "invoice-persistence",
      partialize: (state) => ({
        ...state,
        items: state.items.filter(
          (item) =>
            item.description.trim() !== "" ||
            parseFloat(item.quantity.toString() || "0") > 0 ||
            parseFloat(item.price || "0") > 0
        ),
      }),
    }
  )
);

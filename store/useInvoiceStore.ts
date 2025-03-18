import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NewInvoiceProps, InvoiceSchema } from "@/types";
import {
  validateAndFormatInvoice,
  createNewInvoiceItem,
} from "@/hooks/useCreateInvoiceDb";
import { v4 as uuidv4 } from "uuid";

export const useInvoiceStore = create<NewInvoiceProps>()(
  persist(
    (set, get) => ({
      // Invoice details client part
      companyLogo: "",
      logo: false,
      companyName: "",
      invoiceNumber: 0,
      customersName: "",
      customersLocation: "",
      date: "",
      dueDate: "",
      notes: "",
      paymentDetails: "",

      // Line items  client part
      items: [
        {
          id: uuidv4(),
          description: "",
          quantity: 1,
          price: 0,
          amount: 0,
        },
      ],

      // Summary data  client part
      summary: {
        subtotal: 0,
        discount: 0,
        taxRate: 0,
        deliveryCost: 0,
        total: 0,
        balanceDue: 0,
        amountPaid: 0,
      },

      createInvoice: async (
        mutateAsyncFn: (
          data: InvoiceSchema
        ) => Promise<{ data: { id: string } }>
      ) => {
        try {
          const invoiceData = validateAndFormatInvoice(get());
          const response = await mutateAsyncFn(invoiceData);
          if (!response?.data.id) {
            throw new Error("Server failed to return invoice ID");
          }

          const newItem = createNewInvoiceItem();

          // Reset the form after successful creation
          set({
            // companyLogo: "",
            // companyName: "",
            invoiceNumber: 0,
            customersName: "",
            customersLocation: "",
            date: "",
            dueDate: "",
            // notes: "",
            // paymentDetails: "",

            // Line items  client part
            items: [newItem],

            // Summary data  client part
            summary: {
              subtotal: 0,
              discount: 0,
              taxRate: 0,
              deliveryCost: 0,
              total: 0,
              balanceDue: 0,
              amountPaid: 0,
            },
          });
          console.log("Form reset complete. Items:", get().items);
          return response.data.id;
        } catch (error) {
          console.error("Failed to create invoice:", error);
          throw error; // Re-throw to allow error handling in components
        }
      },

      //Actions
      handleChange: (field, value) => {
        set({ [field]: value });
      },

      //Format currency

      // Update line item
      updateItem: (id, field, value) => {
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id === id) {
              const updatedItem = { ...item, [field]: value };

              // Recalculate amount if quantity or price changes
              if (field === "quantity" || field === "price") {
                updatedItem.amount = updatedItem.quantity * updatedItem.price;
              }
              return updatedItem;
            }
            return item;
          });

          // Recalculate summary values
          const subtotal = newItems.reduce((sum, item) => sum + item.amount, 0);
          const { discount, taxRate, deliveryCost, amountPaid } = state.summary;
          const total = subtotal - discount + taxRate + deliveryCost;
          const balanceDue = total - amountPaid;

          return {
            items: newItems,
            summary: {
              ...state.summary,
              subtotal,
              total,
              balanceDue,
            },
          };
        });
      },

      // Add new line item

      addItem: () => {
        set((state) => ({
          items: [...state.items, createNewInvoiceItem()],
        }));
      },

      // Update summary fields
      updateSummary: (field, value) => {
        set((state) => {
          const newSummary = { ...state.summary, [field]: value };

          // Recalculate total and balance due
          const { subtotal, discount, taxRate, deliveryCost, amountPaid } =
            newSummary;
          const total = subtotal - discount + taxRate + deliveryCost;
          const balanceDue = total - amountPaid;

          return {
            summary: {
              ...newSummary,
              total,
              balanceDue,
            },
          };
        });
      },

      // Calculate subtotal
      calculateSubtotal: () => {
        const { items } = get();
        const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

        set((state) => {
          const { discount, taxRate, deliveryCost, amountPaid } = state.summary;
          const total = subtotal - discount + taxRate + deliveryCost;
          const balanceDue = total - amountPaid;

          return {
            summary: {
              ...state.summary,
              subtotal,
              total,
              balanceDue,
            },
          };
        });

        return subtotal;
      },

      // Remove line item
      removeItem: (id) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);

          // Prevent removing all items
          if (newItems.length === 0) {
            newItems.push({
              id: uuidv4(),
              description: "",
              quantity: 1,
              price: 0,
              amount: 0,
            });
          }

          // Recalculate summary values
          const subtotal = newItems.reduce((sum, item) => sum + item.amount, 0);
          const { discount, taxRate, deliveryCost, amountPaid } = state.summary;
          const total = subtotal - discount + taxRate + deliveryCost;
          const balanceDue = total - amountPaid;

          return {
            items: newItems,
            summary: {
              ...state.summary,
              subtotal,
              total,
              balanceDue,
            },
          };
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
            item.quantity > 0 ||
            item.price > 0
        ),
      }),
    }
  )
);

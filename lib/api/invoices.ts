import axios from "axios";
import { InvoiceSchema } from "@/types";

//Base axios instance
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//Type for api responses
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error: string;
};

export type Invoice = InvoiceSchema & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
};

//InvoiceApi functions
export const invoiceApi = {
  //Get all invoices by the user
  getAll: async (): Promise<Invoice[]> => {
    const response = await api.get<ApiResponse<Invoice[]>>(`/invoices`);

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to fetch invoice");
    }

    return response.data.data || [];
  },

  //Get invoice by id
  getById: async (id: string): Promise<InvoiceSchema> => {
    const response = await api.get<ApiResponse<Invoice>>(`/invoices/${id}`);

    if (!response.data.success || response.data.error) {
      throw new Error(response.data.error || "Failed to fetch invoice by id");
    }
    return response.data.data as Invoice;
  },

  // Create new invoice
  create: async (data: InvoiceSchema): Promise<Invoice> => {
    const response = await api.post<ApiResponse<Invoice>>("/invoices", data);
    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to create invoice");
    }
    return response.data.data as Invoice;
  },

  //Update invoice
  update: async (
    id: string,
    data: Partial<InvoiceSchema>
  ): Promise<Invoice> => {
    const response = await api.put<ApiResponse<Invoice>>(
      `/invoices/${id}`,
      data
    );

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to fetch invoice by id");
    }

    return response.data.data as Invoice;
  },

  //Delete invoice
  delete: async (id: string): Promise<void> => {
    try {
      const response = await api.delete<
        ApiResponse<{ success: boolean; error?: string }>
      >(`/invoices/${id}`);

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to delete invoice");
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
};

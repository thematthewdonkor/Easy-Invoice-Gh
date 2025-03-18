import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { InvoiceSchema } from "@/types";
import axios from "axios";

//=======================================================Get invoice by id
export const useGetInvoiceByIdQuery = (invoiceId: string) => {
  return useQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: async () => {
      if (!invoiceId) throw new Error("Invoice ID is required");

      const response = await axios.get(`/api/invoice/preview/${invoiceId}`);

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data.data;
    },
    enabled: Boolean(invoiceId), // ✅ Prevents query if invoiceId is missing
    staleTime: 1000 * 60 * 5, // ✅ Data stays fresh for 5 minutes
    retry: false, // ✅ Prevents unnecessary retries on 404 errors
  });
};

//=======================================================Create new invoice via API
export const useCreateInvoiceQuery = () => {
  return useMutation({
    mutationFn: async (invoiceData: InvoiceSchema) => {
      const response = await axios.post("/api/invoice", invoiceData);
      const result = response.data;
      console.log(result);
      return result;
    },
  });
};

// //=======================================================Update an invoice via api TODO
export const useUpdateInvoiceQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: string }) => {
      const res = await fetch(`/api/invoices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update invoice");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["invoices"] }),
  });
};

// //=======================================================Delete an invoice via api TODO
export const useDeleteInvoiceQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/invoices/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete invoice");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["invoices"] }),
  });
};

// //=======================================================Mark invoice as Paid via api TODO
export const useMarkAsPaidQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/invoices/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to mark invoice as paid");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["invoices"] }),
  });
};

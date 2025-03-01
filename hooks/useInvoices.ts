import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

//Fetch all invoices
export const useInvoices = () => {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const res = await fetch("/api/invoices");
      if (!res.ok) throw new Error("Failed to fetch invoices");

      return res.json();
    },
  });
};

//Create invoices
export const useCreateInvoices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoice) => {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice),
      });

      if (!res.ok) throw new Error("Failed to create invoice");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["invoices"] }),
  });
};

// Update an invoice
export const useUpdateInvoice = () => {
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

// Delete an invoice
export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/invoices/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete invoice");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["invoices"] }),
  });
};

// Mark as Paid
export const useMarkAsPaid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/invoices/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to mark invoice as paid");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["invoices"] }),
  });
};

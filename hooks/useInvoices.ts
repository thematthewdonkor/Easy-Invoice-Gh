// hooks/useInvoices.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Invoice, invoiceApi } from "@/lib/api/invoices";
import { InvoiceSchema } from "@/types";

// Query keys for caching
export const invoiceKeys = {
  all: ["invoices"] as const,
  details: (id: string) => [...invoiceKeys.all, id] as const,
};

// Hook to fetch all invoices
export const useInvoices = () => {
  return useQuery({
    queryKey: invoiceKeys.all,
    queryFn: invoiceApi.getAll,
  });
};

// Hook to fetch a single invoice by ID
export const useInvoice = (id?: string) => {
  return useQuery({
    queryKey: invoiceKeys.details(id!),
    queryFn: () => invoiceApi.getById(id!),
    enabled: !!id,
    retry: false, //Stop retries to avoid unnecessary 404 responses
  });
};

// Hook to create a new invoice
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InvoiceSchema) => invoiceApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch the invoices list
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
    },
  });
};

// Hook to update an invoice
export const useUpdateInvoice = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id?: string; data: Partial<Invoice> }) =>
      invoiceApi.update(id!, data),
    onSuccess: (updatedInvoice) => {
      // Update the cache for both the list and the individual item
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
      queryClient.setQueryData(invoiceKeys.details(id!), updatedInvoice);
    },
  });
};

// Hook to delete an invoice
export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => invoiceApi.delete(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache and update list
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
      queryClient.removeQueries({ queryKey: invoiceKeys.details(deletedId) });
    },
  });
};

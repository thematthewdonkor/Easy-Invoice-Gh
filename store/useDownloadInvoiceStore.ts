import { create } from "zustand";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface InvoiceStore {
  invoiceRef: React.RefObject<HTMLDivElement> | null;
  setInvoiceRef: (ref: React.RefObject<HTMLDivElement>) => void;
  handleDownload: (
    invoiceRef: React.RefObject<HTMLDivElement | null> | null
  ) => Promise<void>;
}

export const useDownloadInvoiceStore = create<InvoiceStore>((set) => ({
  invoiceRef: null,
  setInvoiceRef: (ref) => set({ invoiceRef: ref }),
  handleDownload: async (invoiceRef) => {
    if (!invoiceRef?.current) return;

    try {
      const container = invoiceRef.current;
      const images = container.querySelectorAll("img");
      const originalStyles: { element: HTMLElement; style: string }[] = [];

      // Store original styles for both container and images
      originalStyles.push({
        element: container,
        style: container.style.cssText,
      });
      images.forEach((img) => {
        originalStyles.push({ element: img, style: img.style.cssText });
      });

      // Set temporary styles for PDF rendering
      container.style.width = "210mm"; // A4 width
      container.style.maxWidth = "100%";
      container.style.margin = "0 auto";

      images.forEach((img) => {
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.maxWidth = "100%";
        img.style.objectFit = "contain";
        img.style.display = "block";
      });

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#f9fafb",
        onclone: (clonedDoc, element) => {
          // Clone styling for accurate rendering
          const clonedContainer = element as HTMLElement;
          clonedContainer.style.width = "210mm";
          clonedContainer.style.maxWidth = "100%";
          clonedContainer.style.margin = "0 auto";

          clonedDoc.body.style.backgroundColor = "#f9fafb";
          clonedDoc.body.style.width = "210mm";
          clonedDoc.body.style.margin = "0 auto";

          clonedDoc.querySelectorAll("img").forEach((img) => {
            img.style.width = "100%";
            img.style.height = "auto";
            img.style.objectFit = "contain";
            img.style.display = "block";
          });
        },
      });

      // Restore original styles
      originalStyles.forEach(({ element, style }) => {
        element.style.cssText = style;
      });

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const imgRatio = canvas.width / canvas.height;

      let imgWidth = pageWidth;
      let imgHeight = imgWidth / imgRatio;

      // Add primary page
      doc.addImage(canvas, "PNG", 0, 0, imgWidth, imgHeight);

      // Handle multi-page documents
      let heightRemaining = imgHeight;
      let position = 0;

      while (heightRemaining > pageHeight) {
        position -= pageHeight;
        doc.addPage();
        doc.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight);
        heightRemaining -= pageHeight;
      }

      doc.save("Invoice.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  },
}));

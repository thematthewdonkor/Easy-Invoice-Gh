"use client";

import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export const UploadLogo = () => {
  const { handleChange, companyLogo } = useInvoiceStore();

  const handleLogoUpload = (url: string) => {
    handleChange("companyLogo", url);
  };

  const handleLogoRemove = () => {
    handleChange("companyLogo", "");
  };

  return (
    <div className="space-y-1">
      {companyLogo ? (
        <div className="relative w-[200px] h-28">
          <Image
            src={companyLogo || ""}
            alt="Company logo"
            layout="fill"
            className="rounded-md w-full h-full object-cover"
          />
          <Button
            onClick={handleLogoRemove}
            className={`
          absolute 
          top-0.5 
          left-0.5 
          w-4 
          h-4
          p-0
          min-w-0
          min-h-0
          rounded-sm
          shadow-none
              ${companyLogo ? "bg-transparent" : "hidden"}`}
          >
            <X className="text-white text-center w-2 h-2" />
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-xs mx-auto">
          <div
            className="hover:border-gray-400 
          focus-within:border-primary rounded-lg p-1 duration-300 ease-in-out max-w-[200px] mx-auto"
          >
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res?.[0]) {
                  console.log("Upload response:", res[0]);
                  handleLogoUpload(res[0].ufsUrl);
                }
              }}
              onUploadError={(error: Error) =>
                console.error("Upload error:", error)
              }
              config={{
                mode: "auto",
              }}
              className="
          ut-label:text-[10px]
          ut-label:leading-tight
          border
          border-gray-300 
          ut-allowed-content::hidden 
          ut-upload-icon:text-indigo-600 
          ut-upload-icon:h-5
          ut-upload-icon:w-5
          hover:border-indigo-300
          ut-button:bg-indigo-400
          ut-button:text-[10px]
          ut-button:w-16
          ut-button:py-0.5
          ut-button:h-6
          ut-button:hidden
          ut-button:ut-readying:bg-indigo-400
          max-h-28
          p-1
          text-xs
              "
            />
          </div>
        </div>
      )}
    </div>
  );
};

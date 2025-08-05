import React, { useState } from "react";
import { Button } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRMutationHook } from "@/hooks/page";
import { useDropzone } from "react-dropzone";
import { CloudIcon } from "@/lib/@heroicons/page";
import { toast } from "sonner";
import Image from 'next/image'

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const BankTransferForm = ({ id }: { id: string }) => {
  const { customTrigger, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_PAYMENT(id),
    "PUT"
  );

  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<{ name: string, preview: string | null }[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    maxFiles: 2,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        toast.error("Some files were rejected. Please ensure they meet the size and type requirements.");
        return;
      }

      const validFiles = acceptedFiles.filter(file => file.size <= MAX_FILE_SIZE);

      if (validFiles.length < acceptedFiles.length) {
        toast.error("Some files exceeded the maximum file size of 5MB.");
      }

      setFiles(validFiles);
      previewFiles(validFiles);
    },
  });

  const previewFiles = (files: File[]) => {
    const previews: { name: string; preview: string | null }[] = [];
  
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          previews.push({ name: file.name, preview: e.target?.result as string });
          if (previews.length === files.length) {
            setFilePreviews(previews);
          }
        };
  
        reader.onerror = () => {
          toast.error("Error reading file. Please try again.");
        };
  
        reader.readAsDataURL(file);
      } else {
        previews.push({ name: file.name, preview: null });
        if (previews.length === files.length) {
          setFilePreviews(previews);
        }
      }
    });
  };
  
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      if (files.length === 0) {
        toast.warning("Please select a file to upload.");
        return;
      }
  
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("paymentImage", file);
      });
  
      try {
        const res = await customTrigger(formData);
        if (res.isSuccessed) {
          toast.success("Payment updated successfully!");
        } else {
          toast.error("Failed to update payment.");
        }
      } catch (error) {
        console.error("Failed to upload file:", error);
        toast.error("An error occurred while uploading the file.");
      }
    };
  
    return (
      <div className="">
        <h2>
          <span className="text-xl font-[600]">PAY BY BANK TRANSFER NOW</span>
          <span className="text-fontColor2 text-sm"> Invoice No. #6582284</span>
        </h2>
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-primary my-3">Transfer data</h3>
          <div className="flex">
            <p className="w-[200px] font-normal">Bank Beneficiary Name: </p>
            <span className="font-semibold">Aqarat Hub</span>
          </div>
          <div className="flex py-2">
            <p className="w-[200px]">Bank Name:</p>{" "}
            <span className="font-semibold">Emirates NBD Bank PJSC</span>{" "}
          </div>
          <div className="flex">
            <p className="w-[200px]">Account Number:</p>
            <span className="font-semibold">0215465955101</span>
          </div>
          <div className="flex py-2">
            <p className="w-[200px]">IBAN: </p>
            <span className="font-semibold">AE640260000215465955101</span>
          </div>
          <div className="flex">
            <p className="w-[200px]">BIC:</p>
            <span className="font-semibold">EBILAEADXXX</span>
          </div>
          <div className="flex py-2">
            <p className="w-[200px]">Country:</p>
            <span className="font-semibold">United Arab Emirates</span>{" "}
          </div>
          <div className="flex">
            <p className="w-[200px]">Address:</p>
            <span className="font-semibold">BENIYAS STREET, DEIRA</span>
          </div>
          <div className="flex py-2">
            <p className="w-[200px]">City:</p>
            <span className="font-semibold">DUBAI</span>{" "}
          </div>
        </div>
  
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-primary py-3">Send Receipt</h3>
          <p className="text-sm mb-2">
            Once you have made the transfer, please attach a copy of the bank transfer slip.
          </p>
          <div className="flex gap-4">
            <div
              {...getRootProps({
                className:
                  "border-2 border-dashed border-gray-300 p-2 rounded-lg flex justify-center items-center",
                role: "button",
                "aria-label": "Upload bank transfer slip",
              })}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col justify-center items-center">
                <div className="text-gray-500 mb-2">
                  <CloudIcon className="w-8 h-8" />
                </div>
                <div className="text-fontColor2 text-xs">Select File OR Drag Here</div>
              </div>
            </div>
            <div className="text-[13px] text-fontColor2 pt-4">
              <p>Supported file type: PNG, JPG, JPEG, BMP, PDF, DOC, DOCX</p>
              <p>Maximum upload file size: 5MB</p>
              <p>Maximum file numbers: 2 Files</p>
            </div>
          </div>
          {/* File Previews */}
          <div className="mt-4">
            {filePreviews.map((file, index) => (
              <div key={index} className="mb-2">
                {file.preview ? (
                  <Image
                    src={file.preview}
                    alt={`Preview ${file.name}`}
                    className="h-[200px] object-contain"
                    width={200}
                    height={200}
                  />
                ) : (
                  <div>
                    <p>{file.name}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
  
        <Button
          onClick={handleSubmit}
          className="bg-primary text-white rounded-full w-full"
          buttonLoadingProps={{ loadingText: "Submitting..." }}
          loading={isMutating}
        >
          SUBMIT
        </Button>
      </div>
    );
  };
  
  export default BankTransferForm;
  

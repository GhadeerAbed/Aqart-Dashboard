"use client"
import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import { upload } from "../../../public/assests/page";

interface FileInputProps {
  FileClassName?: string;
  onChange: (file: File) => void;
  profileImage?: string | null;
}

export const FileInput: React.FC<FileInputProps> = ({
  FileClassName,
  onChange,
  profileImage
}) => {
  const [logoUrl, setLogoUrl] = useState<any>(profileImage);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(""); 
    const file = event.target.files?.[0];
    if (file) {
      const supportedTypes = ["image/jpeg", "image/png"];
      if (!supportedTypes.includes(file.type)) {
        setErrorMessage("Unsupported file type. Please upload a JPEG, PNG.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  const imageUrl = uploadedImage ? uploadedImage : (logoUrl ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${logoUrl}` : upload);


  return (
    <div className="flex flex-col">
      <div className={`flex items-center ${FileClassName}`}>
        {imageUrl && (
          <div className="border border-darkSecondary">
            <Image
              src={imageUrl}
              alt="Uploaded Logo"
              className="object-fill w-[80px] h-[80px]"
              width={80}
              height={80}
         
            />
          </div>
        )}
        <label className="px-4 py-3 cursor-pointer">
          <p className="underline text-base font-semibold text-fontColor1">
            Upload Logo
          </p>
          <p className="text-darkSecondary text-sm pt-1">
            Minimum Dimension 800px X 600 px (PNG - JPG)
          </p>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {errorMessage && <p className="text-red-500 text-sm font-nunito pb-2 -mt-1">{errorMessage}</p>}
    </div>
  );
};
FileInput.displayName = "FileInput";

export default FileInput;

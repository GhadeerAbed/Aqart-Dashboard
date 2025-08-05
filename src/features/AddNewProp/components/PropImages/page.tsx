// import React, { useEffect, useState } from "react";
// import {
//   Disclosure,
//   DisclosurePanel,
//   DisclosureButton,
// } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import ImageUpload from "@/components/ImageUpload/page";

// export const PropImages = ({
//   title,
//   type,
//   defaultOpen = false, // Add a defaultOpen prop with a default value of false
//   isOpen,
//   onToggle,
// }: {
//   title: string;
//   type: string;
//   defaultOpen?: boolean; // Make the prop optional
//   isOpen: boolean;
//   onToggle: () => void;
// }) => {
//   const [open, setOpen] = useState(isOpen);

//   useEffect(() => {
//     setOpen(isOpen);
//   }, [isOpen]);

//   return (
//     <div className="max-w-[648px] space-y-2">
//       <Disclosure>
//         {({ open }) => (
//           <div className="bg-lightSecondary w-full rounded-2xl px-3 py-3 mb-2 font-nunito">
//             <DisclosureButton className="w-full flex justify-between py-2 px-2" onClick={onToggle}
//             >
//               <div>
//                 <h1 className="font-[500] ">
//                   {title}
//                   <span className="text-[12px] text-darkSecondary">
//                     {" "}
//                     ({type})
//                   </span>
//                 </h1>
//               </div>
//               <ChevronDownIcon
//                 className={`w-5 h-5 ${open ? "rotate-180 transform" : ""}`}
//               />
//             </DisclosureButton>
//             <DisclosurePanel>
//               <ul className="list-disc list-inside text-sm text-fontColor1 mb-6 px-2">
//                 <li>Minimum 3 images are required.</li>
//                 <li>Maximum 15 Images.</li>
//                 <li>Minimum Size 500x500 Pixels.</li>
//                 <li>Only PNG and JPG Graphic Formats are supported.</li>
//               </ul>
//               <ImageUpload />
//             </DisclosurePanel>
//           </div>
//         )}
//       </Disclosure>
//     </div>
//   );
// };

// export default PropImages;

import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ImageUpload from "@/components/ImageUpload/page";
import { Input } from "@/components/page";

export const PropImages = ({
  title,
  type,
  isOpen,
  onToggle,
  onImagesChange,
  register,
  images = [],
}: {
  title: string;
  type: string;
  isOpen: boolean;
  onToggle: () => void;
  onImagesChange?: any;
  register?: any;
  images?: any[];
}) => {
  // const handleImagesChange = (images: any) => {
  //   onImagesChange(images);
  // };
  const [localImages, setLocalImages] = useState(images);

  useEffect(() => {
    if (JSON.stringify(localImages) !== JSON.stringify(images)) {
      setLocalImages(images);
    }
  }, [images]);

  const handleImagesChange = (newImages:any) => {
    setLocalImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div className="max-w-[648px] space-y-2">
      <div className="bg-lightSecondary w-full rounded-2xl px-3 py-3 mb-2 font-nunito">
        <button
          className="w-full flex justify-between py-2 px-2"
          onClick={onToggle}
        >
          <div>
            <h1 className="font-[500] ">
              {title}
              <span className="text-[12px] text-darkSecondary"> ({type})</span>
            </h1>
          </div>
          <div className="flex justify-center items-center">
          {localImages.length > 0 && (
              <span className="text-[12px] text-primary ml-5 font-[550]">
                {localImages?.length} uploaded
              </span>
            )}
          <ChevronDownIcon
            className={`w-5 h-5 ${isOpen ? "rotate-180 transform" : ""}`}
          />
          </div>
        </button>
        {isOpen && (
          <div>
            {title.includes("Video Links") ? (
              <>
                <Input
                  type="text"
                  id="video"
                  className="my-5 bg-backgroundColor"
                  {...register("video")}
                />
              </>
            ) : (
              <>
                <ul className="list-disc list-inside text-sm text-fontColor1 mb-6 px-2">
                  <li>Minimum 3 images are required.</li>
                  <li>Maximum 15 Images.</li>
                  <li>Minimum Size 500x500 Pixels.</li>
                  <li>Only PNG and JPG Graphic Formats are supported.</li>
                </ul>
                <ImageUpload
                  onImagesChange={handleImagesChange}
                  existingImages={localImages}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropImages;

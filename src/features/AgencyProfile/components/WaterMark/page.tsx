"use client";

import { RangeSlider, ImageChecks } from "../page";
import { Button, useAuth } from "../../../../components/page";
import { Blocking, ImageIcon } from "../../../../lib/@heroicons/page";
import { TextSvg } from "../../../../components/Svg/page";
import Image from "next/image";
import { defaultImage, toronto } from "../../../../../public/assests/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRMutationHook } from "@/hooks/page";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useSingleChecked } from "../../../../hooks/page";

export const WaterMark = () => {
  const { userData } = useAuth();
  const id = userData._id;
  const [profileImageUrl, setProfileImageUrl] = useState(defaultImage);
  const [opacity, setOpacity] = useState(40); // Initial opacity value
  const [proportional, setProportional] = useState(72); // Initial proportional value
  const images = [
    { image: Blocking, name: "None" },
    { image: ImageIcon, name: "Image" },
    { image: TextSvg, name: "Text" },
  ];
  const { checkedIndex, handleCheck } = useSingleChecked(0);

  useEffect(() => {
    if (userData?.profileImage) {
      const profileImage = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${userData.profileImage}`;
      setProfileImageUrl(profileImage);
    }
  }, [userData]);

  const { customTrigger } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_WATERMARK(id),
    "PUT"
  );

  const handleMark = async () => {
    const formData = new FormData();
  
    // Set watermarkType based on checkedIndex
    let watermarkType = "";
    let profileText = "";
    let imageToUpload = "";
  
    if (checkedIndex === 0) {
      watermarkType = "None";
    } else if (checkedIndex === 1) {
      watermarkType = "Image"; 
      imageToUpload = toronto.src;
    } else if (checkedIndex === 2) {
      watermarkType = "Text"; // If it's text, use the user's name as watermark
      profileText = userData?.fullName ; // Set the profile text as the full name
    }
  
    // Append necessary fields to form data
    formData.append("watermarkType", watermarkType); // The watermark type (Image, Text, or None)
    formData.append("profileImage", imageToUpload); // Profile image URL
    formData.append("profileText", profileText); // Text if selected, empty if not
    formData.append("watermarkStyle", JSON.stringify({ opacity, proportional }));
  
    try {
      const response = await customTrigger(formData);
      console.log("Watermark update successful:", response);
      if (response.isSuccessed) {
        toast.success("Watermark updated successfully!");
      } else {
        toast.error("Failed to update watermark.");
      }
    } catch (error) {
      console.error("Watermark update failed:", error);
    }
  };
  

  return (
    <div>
      <h1 className="uppercase font-semibold pb-3">Water Mark</h1>
      <div className="flex flex-row justify-between items-center max-lg:flex-col">
        <ImageChecks images={images} checkedIndex={checkedIndex} handleCheck = {handleCheck}/>
        <div className="flex w-full flex-col space-y-6">
          <RangeSlider
            initialValue={opacity}
            rangeName="Opacity"
            onRangeChange={setOpacity}
          />

          <RangeSlider
            initialValue={proportional}
            rangeName="Proportional"
            onRangeChange={setProportional}
          />
        </div>
      </div>
      <div className="bg-transparent w-full h-[430px] rounded-md relative mt-4">
        <Image
          src={profileImageUrl}
          alt="default Image"
          className="w-full h-full"
          width={100}
          height={100}
        />
        {checkedIndex === 1 && (<Image
          src={toronto}
          alt="toronto"
          style={{
            opacity: opacity / 100,
            width: `${proportional}%`,
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        )}
       {checkedIndex === 2 && (<div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#6d8298] text-6xl capitalize"
          style={{
            opacity: opacity / 100,
            width: `${proportional}%`,
          }}
        >
          {userData?.fullName}
        </div>
       )}
      </div>
      <div className="flex items-center ">
        <input
          id="checked-checkbox"
          type="checkbox"
          className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="checked-checkbox"
          className="ms-2 text-sm font-medium text-darkSecondary dark:text-gray-300"
        >
          Apply watermark to existing photos
        </label>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-10 mt-7 whitespace-nowrap font-semibold">
        <Button
          className="bg-primary text-white uppercase px-10"
          onClick={handleMark}
        >
          Update
        </Button>
        <Button className="!bg-transparent border border-primary text-primary uppercase px-10">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default WaterMark;

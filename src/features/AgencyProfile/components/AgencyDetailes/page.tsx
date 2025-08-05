"use client"

import { Input, FileInput, Button, useAuth } from "../../../../components/page";
import React, { useState ,useEffect } from "react";
import { LanguageSwitcher } from "../page";
import { useForm, Controller } from "react-hook-form";
import { API_SERVICES_URLS } from "../../../../data/page";
import { useSWRMutationHook } from "../../../../hooks/page";
import { toast } from "sonner";



export const AgencyDetails = () => {
  const { userData, updateUserData } = useAuth();
  const name = userData?.fullName || "";
  const email = userData?.email || "";
  const address = userData?.adress || "";
  const city = userData?.city?.name || "";
  const area = userData?.area || "";
  const id = userData?._id || "";
  const mobile = userData?.mobile || "";
  const whatsApp = userData?.whatsApp || "";
  const ar_Notes = userData?.arNotes || "";
  const en_Notes = userData?.enNotes || "";
  const initialProfileImage = userData?.profileImage || "";

  const { register, handleSubmit, formState: { isSubmitting }, control, watch } = useForm();

  const [language, setLanguage] = useState<"enNotes" | "arNotes">("enNotes");
  const [notes, setNotes] = useState<{ enNotes: string; arNotes: string }>({
    enNotes: en_Notes,
    arNotes: ar_Notes,
  });
  const [profileImage, setProfileImage] = useState<string | null>(initialProfileImage);

  const { customTrigger } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_AGENCY(id),
    "PUT"
  );

  const formatPhoneNumber = (number: string) => {
    const countryCode = "+971";
    if (!number.startsWith(countryCode)) {
      return countryCode + number;
    }
    return number;
  };

  const handleProfileImageChange = async (file: File) => {
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await customTrigger(formData);
      console.log("Profile image updated successfully", response);

      const updatedProfileImage = response?.data?.profileImage
        ? `${response.data.profileImage}`
        : profileImage;
      setProfileImage(updatedProfileImage);

      const updatedUserData = {
        ...userData,
        profileImage: updatedProfileImage,
      };
      updateUserData(updatedUserData); // Update context data
    } catch (error) {
      console.error("Error updating profile image:", error);
      console.log("Failed to update profile image");
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    if (data.profileImage && data.profileImage[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }
    formData.append("whatsApp", formatPhoneNumber(data.whatsApp));
    formData.append("mobile", formatPhoneNumber(data.mobile));
    formData.append("enNotes", notes.enNotes);
    formData.append("arNotes", notes.arNotes);

    try {
      const response = await customTrigger(formData);
      console.log("Profile updated successfully", response);

      const updatedProfileImage = response?.data?.profileImage
        ? `${response.data.profileImage}`
        : profileImage;
      setProfileImage(updatedProfileImage);

      const updatedUserData = {
        ...userData,
        whatsApp: formatPhoneNumber(data.whatsApp),
        mobile: formatPhoneNumber(data.mobile),
        enNotes: notes.enNotes,
        arNotes: notes.arNotes,
        profileImage: updatedProfileImage,
      };
      updateUserData(updatedUserData);
      if (response.isSuccessed) {
        toast.success("User Profile Updated Successfully");
      } else {
        toast.error("Failed to Update User Profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  });

  const watchedProfileImage = watch("profileImage");

  useEffect(() => {
    if (watchedProfileImage && watchedProfileImage[0]) {
      handleProfileImageChange(watchedProfileImage[0]);
    }
  }, [watchedProfileImage]);

  return (
    <form className="py-3 font-nunito" onSubmit={onSubmit}>
      <Controller
        control={control}
        name="profileImage"
        render={({ field }) => (
          <FileInput
            profileImage={profileImage}
            FileClassName="mb-3"
            onChange={(file: File) => field.onChange([file])}
          />
        )}
      />
      <div className="grid gap-x-6 gap-y-2 mb-4 sm:grid-cols-2">
        <Input
          type="text"
          label="Agency Name"
          id="fullName-input"
          disabled
          placeholder={name}
        />
        <Input
          type="email"
          label="Email Address"
          id="email-input"
          disabled
          placeholder={email}
        />
        <Input
          type="text"
          label="Head Office Address"
          id="headOffice-input"
          disabled
          placeholder={address}
        />
        <Input
          type="text"
          label="City"
          id="city-input"
          disabled
          placeholder={city}
        />
        <Input
          type="text"
          label="Area"
          id="area-input"
          disabled
          placeholder={area}
        />
        <Input
          type="text"
          label="ORN"
          id="orn-input"
          disabled
          placeholder="954-D-554"
        />
      </div>
      <hr className="border border-secondary" />
      <div className="grid gap-x-6 gap-y-2 mt-4 mb-4 md:grid-cols-2">
        <Input
          type="text"
          label="Landline / Mobile Number"
          id="mobile"
          startIcon="+971"
          inputClassName="!px-16 !bg-backgroundColor"
          startIconClassName="border-e-2 pe-1"
          placeholder="000000000"
          defaultValue={mobile.slice(4)}
          {...register("mobile")}
        />
        <Input
          type="text"
          label="whatsApp Number"
          id="whatsApp"
          startIcon="+971"
          inputClassName="!px-16 !bg-backgroundColor"
          startIconClassName="border-e-2 pe-1"
          placeholder="000000000"
          defaultValue={whatsApp.slice(4)}
          {...register("whatsApp")}
        />
      </div>
      <LanguageSwitcher
        setLanguage={setLanguage}
        setNotes={setNotes}
        language={language}
        notes={notes}
        en_Notes={en_Notes}
        ar_Notes={ar_Notes}
        desc="About Agency"
      />
      <div className="flex flex-wrap justify-center items-center gap-10 mt-7 whitespace-nowrap">
        <Button
          className="bg-primary text-white uppercase px-8"
          type="submit"
          buttonLoadingProps={{ loadingText: "Updating..." }}
          loading={isSubmitting}
        >
          Update profile
        </Button>
        <Button className="!bg-transparent border border-primary text-primary uppercase px-9">
          View profile
        </Button>
      </div>
    </form>
  );
};

export default AgencyDetails;

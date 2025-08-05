"use client"

import {
  Input,
  FileInput,
  Button,
  Select,
  CityInput,
  NationalityInput,
  AgentInput,
  MultiLanguageInput,
  useAuth,

} from "../../components/page";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { API_SERVICES_URLS } from "../../data/page";
import { useSWRHook, useSWRMutationHook } from "../../hooks/page";
import { toast } from "sonner";
import SelectBox from "@/components/SelectBox/page";

export const UpdateAgent = ({ rowId }: { rowId: string }) => {
  const roles = [
    { name: "Agent", value: "Agent" },
    { name: "AgencyManger", value: "AgencyManger" },
  ];

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    watch,
    setValue,
  } = useForm({ criteriaMode: "all" });

  const { userData } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const watchedProfileImage = watch("profileImage");
  const mangerId = watch("role");


  const { customTrigger: EditAgent } = useSWRMutationHook(
    API_SERVICES_URLS.EDIT_USER(rowId),
    "PUT"
  );

  const { data: agentData, isLoading } = useSWRHook(
    API_SERVICES_URLS.GET_USER_DATA(rowId)
  );



  const generateYearOptions = (startYear: number): Options[] => {
    const currentYear = new Date().getFullYear();
    const years: Options[] = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push({ value: year.toString(), label: year.toString() });
    }
    return years;
  };
  const yearOptions = generateYearOptions(1900);

  useEffect(() => {
    if (agentData) {
      setValue("fullName", agentData.data.fullName);
      setValue("userName", agentData.data.userName);
      setValue("email", agentData.data.email);
      setValue("mobile", agentData.data.mobile?.replace("+971", ""));
      setValue("whatsApp", agentData.data.whatsApp?.replace("+971", ""));
      setValue("role", agentData.data.role);
      setValue("BRN", agentData.data.BRN);
      setValue("specialization", agentData.data.specialization);
      setValue("notes", agentData.data.notes);
      setValue("year", agentData.data.year);
      setProfileImage(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${agentData.data.profileImage}` || null);
      setSelectedYear(agentData.data.year);
    }
  }, [agentData, setValue]);

  const handleChange = (value: any) => {
    setSelectedYear(value?.value ?? null);
    setValue("year", value?.value ?? null);
  };
  console.log(profileImage)
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    if (data.profileImage && data.profileImage[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }
    formData.append("fullName", data.fullName);
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("BRN", data.BRN);
    formData.append("country", "66107d86bb7961c5a8528bff"); // Example country ID
    formData.append("city", data.city);
    if (Array.isArray(data.spokenLanguage)) {
      data.spokenLanguage.forEach((id: string) => {
        formData.append("spokenLanguage", id);
      });
    }
    formData.append("nationality", data.nationality);
    formData.append("role", data.role);
    if (data.Manger) {
      formData.append("Manger", data.Manger);
    }
    formData.append("whatsApp", `+971${data.whatsApp}`);
    formData.append("mobile", `+971${data.mobile}`);
    formData.append("agency", userData._id);
    formData.append("notes", data.notes);
    formData.append("specialization", data.specialization);

    try {
      const res = await EditAgent(formData);
      if (res.isSubmitting) {
        toast.success("Agent Updated Successfully");
      } else {
        toast.error("Failed To Update Agent");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed To Update Agent");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Optional: add a loading spinner
  }

  return (

    <div className={"bg-lightSecondary rounded-[15px] max-w-[648px] px-5 mt-5"}>
      <form className="py-3 font-nunito" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="profileImage"
          rules={{
            required: {
              value: true,
              message: "Profile Image is Required",
            },
          }}
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
            label="FullName"
            id="FullName"
            placeholder="FullName"
            {...register("fullName", { required: true })}
            inputClassName="!pl-4 !bg-backgroundColor"
          />

          <Input
            type="text"
            label="UserName"
            id="UserName"
            placeholder="UserName"
            {...register("userName", { required: true })}
            inputClassName="!pl-4 !bg-backgroundColor"
          />

          <Input
            type="text"
            label="Email"
            id="Email"
            placeholder="Email"
            {...register("email", { required: true })}
            inputClassName="!pl-4 !bg-backgroundColor"
          />

          <Input
            type="text"
            label="Landline / Mobile Number"
            id="mobile"
            startIcon="+971"
            inputClassName="!px-16 !bg-backgroundColor"
            startIconClassName="border-e-2 pe-1"
            placeholder="000000000"
            {...register("mobile", { required: true })}
          />

          <Input
            type="text"
            label="whatsApp Number"
            id="whatsApp"
            startIcon="+971"
            inputClassName="!px-16 !bg-backgroundColor"
            startIconClassName="border-e-2 pe-1"
            placeholder="000000000"
            {...register("whatsApp", { required: true })}
          />

          <div>
            <Input
              label="Country Of Residence"
              id="country"
              type="text"
              placeholder="United Arab Emirates"
              inputClassName="pl-4 !bg-backgroundColor"
              disabled
            />
          </div>

          <CityInput register={register} setValue={setValue} initialValue={agentData?.data.city}/>

          <MultiLanguageInput register={register} setValue={setValue}  initialValue={agentData?.data.spokenLanguage}/>

          <NationalityInput register={register} setValue={setValue}  initialValue={agentData?.data.nationality}/>

          <Select
            options={roles}
            id="role"
            label="Role"
            placeholder="Select Role"
            selectSize="small"
            selectClassName="!w-100 !bg-backgroundColor"
            {...register("role", { required: true })}
          />

          {mangerId == "Agent" && (
      
            <AgentInput
              register={register}
              setValue={setValue}
              type="manager"
            />
  
          )}

          <Input
            type="text"
            label="BRN"
            id="BRN"
            placeholder="BRN"
            inputClassName="!pl-4 !bg-backgroundColor"
            {...register("BRN", { required: true })}
          />

          <Input
            type="text"
            label="Specialization"
            id="specialization"
            placeholder="Enter specialization"
            inputClassName="!pl-4 !bg-backgroundColor"
            {...register("specialization", { required: true })}
          />

          <Input
            type="text"
            label="Linked-in URL"
            id="linkedIn"
            placeholder="LinkedIn URL"
            inputClassName="!pl-4 !bg-backgroundColor"
            {...register("linkedIn", { required: true })}
          />

          <SelectBox
            value={selectedYear}
            onChange={handleChange}
            name="year"
            options={yearOptions}
            defaultValue="select year"
            label="Year"
            selectClassName="!pl-3 !bg-backgroundColor"
          />
        </div>
        <p className="text-sm font-[500] text-darkSecondary py-3">About Agent</p>
        <textarea
          id="notes"
          rows={5}
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-borderColor focus:ring-black focus:border-black bg-backgroundColor"
          placeholder="Write your thoughts here..."
          {...register("notes", { required: true })}
        />
        <div className="flex flex-wrap justify-center items-center gap-10 mt-7 whitespace-nowrap">
          <Button
            className="bg-primary text-white uppercase px-8"
            type="submit"
            buttonLoadingProps={{ loadingText: "Updating..." }}
            loading={isSubmitting}
          >
            Update Agent
          </Button>
        </div>
      </form>
    </div>
    
  );
};

export default UpdateAgent;

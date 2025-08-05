"use client"

import {
  Input,
  Button,
  NationalityInput,
  CityInput,
  AgentInput,
  useAuth,
} from "../../../../components/page";
import React from "react";
import { useForm } from "react-hook-form";
import { API_SERVICES_URLS } from "../../../../data/page";
import { useSWRMutationHook } from "../../../../hooks/page";
import { toast } from "sonner";

export const UpsertLead = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm({ criteriaMode: "all" });

  const { userData } = useAuth();

  const { customTrigger: AddLead } = useSWRMutationHook(
    API_SERVICES_URLS.CREATE_LEAD,
    "POST"
  );

  const onSubmit = async (data: any) => {
    try {
      const modifiedData = {
        ...data,
        country: "66107d86bb7961c5a8528bff",
      };
      const res = await AddLead(modifiedData);

      if (res.isSuccessed) {
        toast.success("Lead Added Successfully");
      } else {
        toast.error("Failed to Add Lead");
      }
    } catch (err) {
      toast.error("Failed to Add Lead");
    }
  };
  

  return (
    
    <form className="py-3 font-nunito" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-x-6 gap-y-2 mb-4 sm:grid-cols-2">
        <Input
          type="text"
          label="FullName"
          id="FullName"
          placeholder="FullName"
          {...register("fullName" , { required: true })}
          inputClassName="!pl-4 !bg-backgroundColor"
        />

        <Input
          type="text"
          label="Email"
          id="Email"
          placeholder="Email"
          {...register("email",{ required: true })}
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
          {...register("whatsApp")}
        />

        <Input
          label="Country Of Residence"
          id="country"
          type="text"
          placeholder="United Arab Emirates"
          inputClassName="pl-4 !bg-backgroundColor"
          disabled
        />

        <CityInput register={register} setValue={setValue} />

        <Input
          type="text"
          label="Address"
          id="Address"
          placeholder="Address"
          inputClassName="!pl-4 !bg-backgroundColor"
          {...register("adress")}
        />

        <Input
          type="text"
          label="Source"
          id="Source"
          placeholder="Source"
          {...register("source")}
          inputClassName="!pl-4 !bg-backgroundColor"
        />

        <NationalityInput register={register} setValue={setValue} />

        {userData.role === "Agency" && (
          <AgentInput register={register} setValue={setValue} type="all" />
        )}
        {userData.role === "AgencyManger" && (
          <AgentInput register={register} setValue={setValue} />
        )}
      </div>
      <div className="flex flex-wrap justify-center items-center gap-10 mt-7 whitespace-nowrap">
        <Button
          className="bg-primary text-white uppercase px-8"
          type="submit"
          buttonLoadingProps={{ loadingText: "Updating..." }}
          loading={isSubmitting}
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default UpsertLead;

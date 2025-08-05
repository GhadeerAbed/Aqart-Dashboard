
import { Select, Input, Button } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import React, { useEffect, useState } from "react";
import {
  callStatus,
  states,
  communicationMethod,
  enquiryType,
} from "../../data/page";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const LeadUpdates = ({ rowId }: { rowId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting},
    setValue
  } = useForm();

  const { customTrigger } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_LEAD_TABLE(rowId),
    "PUT"
  );

  const { data:getLeadData } = useSWRHook(
    API_SERVICES_URLS.UPDATE_LEAD_TABLE(rowId),
  );

  useEffect(() => {
    if (getLeadData) {
      console.log(getLeadData)
      setValue("callStatus", getLeadData.data.callStatus || "");
      setValue("status", getLeadData.data.status || "");
      setValue("communicationMethod", getLeadData.data.communicationMethod || "");
      setValue("price", formatPrice(getLeadData.data.price) || "");
      setValue("enquiryType", getLeadData.data.enquiryType || "");
      setPrice(formatPrice(getLeadData.data.price) || "");
    }
  }, [getLeadData, setValue]);

  const [price, setPrice] = useState("");

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/,/g, "");
    setPrice(formatPrice(inputValue));
  };

  const formatPrice = (price: string) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = {
        ...data,
        price: price.replace(/,/g, ""), // Include price in the formData
      };
      const response = await customTrigger(formData);
      console.log("Response:", response);
      if (response.isSuccessed) {
        toast.success("Lead Updated Successfully");
      } else {
        toast.error("Failed to Update Lead");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full py-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          <Select
            label="Call Status"
            id="call_status"
            options={callStatus}
            placeholder="Select Call Status"
            selectClassName="pl-4 !bg-backgroundColor !py-2"
            {...register("callStatus", { required: true })}
          />
          <Select
            label="Lead Status"
            id="lead_status"
            options={states}
            placeholder="Select Status"
            selectClassName="pl-4 !bg-backgroundColor !py-2"
            {...register("status", { required: true })}
          />

          <Select
            label="Preferred Communication Method"
            id="communication_method"
            options={communicationMethod}
            placeholder="Select communication method"
            selectClassName="pl-4 !bg-backgroundColor !py-2"
            {...register("communicationMethod", { required: true })}
          />

          <Input
            type="text"
            label="Budget"
            id="price"
            inputClassName="!pl-4 !bg-backgroundColor"
            placeholder=""
            value={price}
            onChange={handlePriceChange}
          />

          <Select
            label="Enquiry Type"
            id="enquiry_type"
            options={enquiryType}
            placeholder="Select Enquiry Type"
            selectClassName="pl-4 !bg-backgroundColor !py-2"
            {...register("enquiryType", { required: true })}
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-5 mt-5">
          <Button
            className="bg-primary text-white uppercase px-8"
            type="submit"
            buttonSize="small"
            buttonLoadingProps={{ loadingText: "Updating..." }}
            loading={isSubmitting}
          >
            Update Lead
          </Button>
          <Button
            className="bg-white text-primary border-primary uppercase px-8 hover:bg-primary hover:text-white"
            type="button"
            buttonSize="small"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LeadUpdates;

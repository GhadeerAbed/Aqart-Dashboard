import {
  CityInput,
  Input,
  NationalityInput,
  LanguageInput,
  Button,
  AgentInput,

} from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const PersonalDetails = ({ rowId }: { rowId: string }) => {
  const {
    register,
    handleSubmit,
    formState: {  isSubmitting },
    setValue,
  } = useForm();

  const { customTrigger } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_LEAD_TABLE(rowId),
    "PUT"
  );

  const onSubmit = async (data: any) => {
    try {
      const formattedData = {
        ...data,
        mobile: `+971${data.mobile.replace(/^\+971/, "")}`,
        whatsApp: `+971${data.whatsApp.replace(/^\+971/, "")}`,
      };
      const response = await customTrigger(formattedData);
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
  
  const { data: getLeadData } = useSWRHook(
    API_SERVICES_URLS.UPDATE_LEAD_TABLE(rowId)
  );

  useEffect(() => {
    if (getLeadData) {
      // Set default values for the form fields when data is fetched
      setValue("fullName", getLeadData.data.fullName || "");
      setValue("email", getLeadData.data.email || "");
      setValue(
        "mobile",
        getLeadData.data.mobile
          ? getLeadData.data.mobile.replace(/^\+971/, "")
          : ""
      );
      setValue(
        "whatsApp",
        getLeadData.data.whatsApp
          ? getLeadData.data.whatsApp.replace(/^\+971/, "")
          : ""
      );
      setValue("address", getLeadData.data.adress || "");
      setValue("source", getLeadData.data.source || "");
      setValue("enquiryMessage", getLeadData.data.enquiryMessage || "");
    }
  }, [getLeadData, setValue]);
  return (
    <div className="w-full py-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          <Input
            label="Full Name"
            id="full_name"
            type="text"
            inputClassName="pl-4 !bg-backgroundColor"
            {...register("fullName", { required: true })}
          />

          <Input
            type="email"
            label="Email Address"
            id="email-input"
            placeholder="email"
            inputClassName="pl-4 !bg-backgroundColor"
            {...register("email", { required: true })}
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

          <Input
            label="Country Of Residence"
            id="country"
            type="text"
            placeholder="United Arab Emirates"
            inputClassName="pl-4 !bg-backgroundColor"
            disabled
          />

          <CityInput
            register={register}
            setValue={setValue}
            initialValue={getLeadData?.data.city}
          />

          <Input
            label="Address"
            id="address"
            type="text"
            inputClassName="pl-4 !bg-backgroundColor"
            {...register("address", { required: true })}
          />

          <NationalityInput
            register={register}
            setValue={setValue}
            initialValue={getLeadData?.data.nationality}
          />

          <LanguageInput register={register} setValue={setValue} />

          <Input
            label="Source"
            id="source"
            type="text"
            inputClassName="pl-4 !bg-backgroundColor"
            {...register("source")}
          />

          <AgentInput
            register={register}
            setValue={setValue}
            initialValue={{
              _id: getLeadData?.data?.agent?._id,
              fullName: getLeadData?.data?.agent.fullName,
            }}
          />
        </div>

        <p className="text-sm font-[500] text-darkSecondary py-3">
          Enquiry Message
        </p>
        <textarea
          id="notes"
          rows={5}
          className="block p-2.5 w-[65%] text-sm text-gray-900 rounded-lg border border-borderColor focus:ring-black focus:border-black bg-backgroundColor"
          placeholder="Write your thoughts here..."
          {...register("enquiryMessage")}
        />

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

export default PersonalDetails;

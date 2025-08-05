"use client"
import PropertyType from "./components/PropretyType/page";
import { Rent, Sale, Commercial, Residential } from "../../components/Svg/page";
import HorizontalNonLinearStepper from "@/components/Stepper/page";
import { FirstStep, FourStep, SecondStep, ThirdStep } from "./components/page";
import { useEffect, useState } from "react";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const AddNewProp = ({ rowId }: { rowId?: any }) => {
  const images1 = [
    { image: Residential, name: "Residential" },
    { image: Commercial, name: "Commercial" },
  ];
  const images2 = [
    { image: Rent, name: "Rent" },
    { image: Sale, name: "Sale" },
  ];
  const { register, handleSubmit, setValue, watch } = useForm();

  const [selectedType, setSelectedType] = useState("Residential");
  const [selectedTransaction, setSelectedTransaction] = useState("Rent");

  const { customTrigger } = useSWRMutationHook(
    rowId
      ? API_SERVICES_URLS.EDIT_NEW_PROPERTY(rowId)
      : API_SERVICES_URLS.Add_NEW_PROPERTY,
    rowId ? "PUT" : "POST"
  );

  const { data: propertyData, isLoading: isLoadingProperty } = useSWRHook(
    API_SERVICES_URLS.GET_PROPERTY(rowId)
  );

  const onSubmit = async (data: any) => {
    try {
      const response = await customTrigger(data);
      if (response.isSuccessed) {
        toast.success("Property Added Successfully");
      } else {
        toast.error("Failed to Add Property");
      }

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (propertyData && !isLoadingProperty) {
      console.log(propertyData.data.titleAr);
      setValue("titleAr", propertyData.data.titleAr);
      setValue("propertyName", propertyData.data.propertyName);
      setValue("price", propertyData.data.price);
      setValue("description", propertyData.data.description);
      setValue("location", propertyData.data.location);
      setValue("type", propertyData.data.type);
      setValue("transaction", propertyData.data.transaction);
      // Set selected type and transaction for the property
      setSelectedType(propertyData.data.type || "Residential");
      setSelectedTransaction(propertyData.data.transaction || "Rent");
    }
  }, [propertyData, isLoadingProperty, setValue]);

  return (
    <div className="max-w-[648px] mt-5  ">
      <div className="bg-lightSecondary  px-3 py-2 rounded-2xl">
        <h1 className="uppercase font-semibold">Property Type</h1>
        <div className="flex flex-row max-ss:flex-col py-3 ">
          <PropertyType
            images={images1}
            className="ss:border-e-2 ss:pe-3  max-ss:border-b-2 pb-3"
            onChange={setSelectedType}
          />
          <PropertyType images={images2} onChange={setSelectedTransaction} />
        </div>
      </div>
      <div>
        <HorizontalNonLinearStepper
          onSubmit={onSubmit}
          selectedType={selectedType}
          selectedTransaction={selectedTransaction}
          register={register}
          handleSubmit={handleSubmit}
          setValue={setValue}
          watch={watch}
          propertyData={propertyData}
          isLoadingProperty={isLoadingProperty}
        >
          <FirstStep
            selectedTransaction={selectedTransaction}
            register={register}
            setValue={setValue}
            propertyData={propertyData}
            watch={watch}
          />
          <SecondStep register={register} setValue={setValue} propertyData={propertyData}/>
          <ThirdStep
            selectedType={selectedType}
            register={register}
            setValue={setValue}
            propertyData={propertyData}
          />
          <FourStep register={register} setValue={setValue}  />
        </HorizontalNonLinearStepper>
      </div>
    </div>
  );
};

export default AddNewProp;

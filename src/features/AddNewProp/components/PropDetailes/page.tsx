import { Input, Select } from "../../../../components/page";
import React, { useEffect, useState } from "react";

export const PropDetails = ({
  selectedTransaction,
  register,
  setValue,
  propertyData,
  watch
}: {
  selectedTransaction: string;
  register: any;
  setValue: any;
  propertyData:any;
  watch:any
}) => {
  const options = [
    { value: "Year", name: "Yearly" },
    { value: "Month", name: "Monthly" },
    { value: "Week", name: "Weekly" },
    { value: "Day", name: "Daily" },
  ];
  const options1 = [
    { value: "Freehold", name: "Freehold" },
    { value: "Leasehold", name: "Leasehold" },
  ];
  const options2 = [
    { value: "Ready", name: "Ready" },
    { value: "Off-Plan", name: "Off-Plan" },
  ];

  const [price, setPrice] = useState("");
  const [serviceCharge, setServiceCharge] = useState("");



  const formatPrice = (price: string) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
  };


  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputId: string
  ) => {
    const inputValue = e.target.value.replace(/,/g, "");
    const formattedPrice = formatPrice(inputValue);
 

    if (inputId === "price") {
      setPrice(formattedPrice);
      setValue("price", inputValue); 
    } else if (inputId === "serviceCharge") {
      setServiceCharge(formattedPrice);
      setValue("serviceCharge", inputValue); 
    }
  };

  useEffect(() => {
    register("price");
    register("serviceCharge");
  }, [register]);


  useEffect(() => {
    if (propertyData) {
      const formattedDate = propertyData.availabilityFrom
      ? new Date(propertyData.availabilityFrom).toISOString().split('T')[0]
      : "";
      setValue("price", propertyData.data.price || "");
      setPrice(formatPrice(propertyData.data.price || ""));
      setValue("serviceCharge", propertyData.data.serviceCharge || "");
      setServiceCharge(formatPrice(propertyData.data.serviceCharge || ""));
      setValue("reference", propertyData.data.reference || "");
      setValue("rentalPeriod", propertyData.data.rentalPeriod || "");
      setValue("cheques", propertyData.data.cheques || "");
      setValue("completionStatus", propertyData.data.completionStatus || "");
      setValue("Ownership", propertyData.data.Ownership || "");;
      setValue("availabilityFrom", propertyData.data.availabilityFrom || "");
      setValue("dLDPermitNumber", propertyData.data.dLDPermitNumber || "");
      setValue("tarkheesiPermit", propertyData.data.tarkheesiPermit || "");

    }
  }, [propertyData, setValue]);

  return (
    <div className="bg-lightSecondary w-full rounded-2xl px-3 py-2 mt-5">
      <h1 className=" font-semibold mb-4">PROPERTY DETAILS</h1>
      <form>
        <div className="grid custom:grid-cols-2 gap-4">
          <Input
            label="Price*"
            id="price"
            type="text"
            inputClassName="pl-4 !bg-backgroundColor"
            endIcon="AED"
            endIconClassName="text-sm  !font-semibold"
            value={price}
            onChange={(e) => handlePriceChange(e, "price")}
          />

          {selectedTransaction === "Rent" && (
            <>
              <Select
                label="Rental Period*"
                id="rentalPeriod"
                options={options}
                placeholder="Select period"
                selectClassName="pl-4 !bg-backgroundColor !py-2"
                onChange={(e) => setValue("Selected value:", e.target.value)}
                {...register("rentalPeriod")}
              />

              <Input
                label="Cheques*"
                id="cheques"
                type="text"
                placeholder="Enter the cheques numbers "
                inputClassName="pl-4 !bg-backgroundColor"
                {...register("cheques")}
              />
            </>
          )}
          {selectedTransaction === "Sale" && (
            <>
              <Select
                label="Completion Status "
                id="completionStatus"
                options={options2}
                placeholder="Select period"
                selectClassName="pl-4 !bg-backgroundColor !py-2"
                onChange={(e) => setValue("Selected value:", e.target.value)}
                {...register("completionStatus")}
              />
              <Select
                label="Ownership"
                id="Ownership"
                options={options1}
                placeholder="Select period"
                selectClassName="pl-4 !bg-backgroundColor !py-2"
                onChange={(e) => setValue("Selected value:", e.target.value)}
                {...register("Ownership")}
              />
              <Input
                label="Service Charge(AED Per SQFT)"
                id="serviceCharge"
                type="text"
                inputClassName="pl-4 !bg-backgroundColor"
                endIcon="AED"
                endIconClassName="text-sm  !font-semibold"
                value={serviceCharge}
                onChange={(e) => handlePriceChange(e, "serviceCharge")}
              />
            </>
          )}
          <Input
            label="Reference*"
            id="reference"
            type="text"
            inputClassName="pl-4 !bg-backgroundColor"
            placeholder="954-D-554"
            {...register("reference")}
          />

          {selectedTransaction === "Rent" ? (
            <>
              <Input
                label="Availability From"
                id="availabilityFrom"
                type="date"
                inputClassName="pl-4 !bg-backgroundColor"
                {...register("availabilityFrom")}
              />
              <Input
                label="DLD Permit Number"
                id="dLDPermitNumber"
                type="text"
                inputClassName="pl-4 !bg-backgroundColor"
                {...register("dLDPermitNumber")}
              />
            </>
          ) : (
            <Input
              label="Tarkheesi Permit*"
              id="tarkheesiPermit"
              type="text"
              inputClassName="pl-4 !bg-backgroundColor"
              placeholder="D-24-6566"
              {...register("tarkheesiPermit")}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default PropDetails;

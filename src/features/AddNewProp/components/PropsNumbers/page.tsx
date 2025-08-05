import { Input, Select } from "../../../../components/page";
import React from "react";

export const PropsNumbers = ({
  selectedType,
  register,
  setValue,
  propertyData
}: {
  selectedType: string;
  register: any;
  setValue: any;
  propertyData:any
}) => {
  const residentialOptions = [
    { value: "furnished", name: "Apartment" },
    { value: "unfurnished", name: "Villa" },
    { value: "SemiFurnished", name: "Townhouse" },
    { value: "Penthouse", name: "Penthouse" },
    { value: "VillaCompound", name: "Villa Compound" },
    { value: "HotelApartment", name: "Hotel Apartment" },
    { value: "ResidentialPlot", name: "Residential Plot" },
    { value: "ResidentialFloor", name: "Residential Floor" },
    { value: "ResidentialBuilding", name: "Residential Building" },
  ];
  const commercialOptions = [
    { value: "Office", name: "Office" },
    { value: "Shop", name: "Shop" },
    { value: "Warehouse", name: "Warehouse" },
    { value: "LaborCamp", name: "Labor Camp" },
    { value: "CommercialVilla", name: "Commercial Villa" },
    { value: "BulkUnit", name: "Bulk Unit" },
    { value: "CommercialPlot", name: "Commercial Plot" },
    { value: "CommercialFloor", name: "CommercialFloor" },
    { value: "CommercialBuilding", name: "Commercial Building" },
    { value: "Factory", name: "Factory" },
    { value: "IndustrialLand", name: "Industrial Land" },
    { value: "MixedUseLand", name: "Mixed use land" },
    { value: "Showroom", name: "Showroom" },
  ];
  const freshOptions = [
    { value: "furnished", name: "Furnished" },
    { value: "unfurnished", name: "Unfurnished" },
    { value: "SemiFurnished", name: "Semi Furnished" },
  ];

  return (
    <div className="bg-lightSecondary w-full rounded-2xl px-3 py-3 mb-2 ">
      <h1 className=" font-semibold mb-4 uppercase">PROPERTY DETAILS</h1>
      <form>
        <div className="grid custom:grid-cols-2 gap-4 ">
          {selectedType === "Residential" ? (
            <Select
              label="Property Type*"
              id="propertyType"
              options={residentialOptions}
              placeholder="Select property Type"
              selectClassName="pl-4 !bg-backgroundColor !py-2"
              onChange={(e) => setValue("Selected value:", e.target.value)}
              {...register("propertyType")}
            />
          ) : (
            <Select
              label="Property Type*"
              id="propertyType"
              options={commercialOptions}
              placeholder="Select property Type"
              selectClassName="pl-4 !bg-backgroundColor !py-2"
              onChange={(e) => setValue("Selected value:", e.target.value)}
              {...register("propertyType")}
            />
          )}

          <Select
            label="Furnishing Type*"
            id="furnishingType"
            options={freshOptions}
            placeholder="select furnishing type"
            selectClassName="pl-4 !bg-backgroundColor !py-2"

            onChange={(e) => setValue("Selected value:", e.target.value)}
              {...register("furnishingType")}
          />
          <Input
            label="Size*"
            id="size"
            type="text"
            inputClassName="pl-4 !bg-backgroundColor"
            endIcon="SQFT"
            endIconClassName="text-sm  !font-semibold"
            {...register("size")}
          />
          {selectedType === "Residential" ? (
            <>
              <Input
                label="No. Of Bedrooms*"
                id="numberOfBedrooms"
                placeholder="Enter the Bedrooms number"
                type="text"
                inputClassName="pl-4 !bg-backgroundColor"
                {...register("numberOfBedrooms")}
              />
              <Input
                label="No. Of Bathrooms*"
                id="numberOfBathrooms"
                placeholder="Enter the Bathrooms number"
                type="text"
                inputClassName="pl-4 !bg-backgroundColor"
                {...register("numberOfBathrooms")}
              />
            </>
          ) : (
            <Input
              label="Nbr. Of Office Partitions "
              id="numberOfOfficePartitions"
              placeholder="Enter the Office number"
              type="text"
              inputClassName="pl-4 !bg-backgroundColor"
              {...register("numberOfOfficePartitions")}
            />
          )}

          <Input
            label="No. Of Parking Spaces*"
            id="numberOfParkingSpaces"
            placeholder="Enter the Parking Spaces number"
            type="text"
            inputClassName="pl-4 !bg-backgroundColor"
            {...register("numberOfParkingSpaces")}
          />
          <Input
            label="Year Built"
            id="yearBuilt"
            type="date"
            inputClassName="pl-4 !bg-backgroundColor"
            {...register("yearBuilt")}
          />
          <Input
            label="Floor Number*"
            id="floorNumber"
            placeholder="Enter the Floor number"
            type="text"
            inputClassName="pl-4 !bg-backgroundColor"
            {...register("floorNumber")}
          />
        </div>
        <p className="text-sm font-[500] text-darkSecondary py-3">
          Owner/ Agent Notes (Agent only can see)
        </p>
        <textarea
          id="agentNotes"
          rows={5}
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-borderColor focus:ring-black focus:border-black bg-backgroundColor"
          placeholder={"Write your thoughts here..."}
          {...register("agentNotes")}
        />
      </form>
    </div>
  );
};

export default PropsNumbers;

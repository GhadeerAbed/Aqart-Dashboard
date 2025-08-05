import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/page";
import { CircleCheck } from "@/lib/@heroicons/page";
import Image from "next/image";
import {
  Amenities,
  bathroom,
  bedroom,
  charge,
  Cheques,
  date,
  ownershipImg,
  size,
} from "../../../../../public/assests/page";
import { Amenities1 } from "../../data/page";

const AdvancedFilter = ({
  onClose,
  filterType,
  onSubmit,
}: {
  onClose: () => void;
  filterType: string;
  onSubmit: (filters: any) => void;
}) => {
  const [featured, setFeatured] = useState(null);
  const [serviceChargeMin, setServiceChargeMin] = useState("");
  const [serviceChargeMax, setServiceChargeMax] = useState("");
  const [ownership, setOwnership] = useState("");
  const [sizeMin, setSizeMin] = useState("");
  const [sizeMax, setSizeMax] = useState("");
  const [bedrooms, setBedrooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [buildingName, setBuildingName] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleFilterChange = (filterName: string, value: any) => {
    switch (filterName) {
      case "featured":
        setFeatured(value);
        break;
      case "serviceChargeMin":
        setServiceChargeMin(value);
        break;
      case "serviceChargeMax":
        setServiceChargeMax(value);
        break;
      case "ownership":
        setOwnership(value);
        break;
      case "sizeMin":
        setSizeMin(value);
        break;
      case "sizeMax":
        setSizeMax(value);
        break;
      case "bedrooms":
        setBedrooms(value);
        break;
      case "bathrooms":
        setBathrooms(value);
        break;
      case "buildingName":
        setBuildingName(value);
        break;
      case "amenities":
        setAmenities((prev: any) => {
          if (prev.includes(value)) {
            return prev.filter((amenity: any) => amenity !== value);
          } else {
            return [...prev, value];
          }
        });
        break;
      default:
        break;
    }
  };
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const amenitiesToShow = showAll ? Amenities1 : Amenities1.slice(0, 5);

  const handleSubmit = () => {
    const filterData = {
      featured,
      'serviceCharge[gte]': serviceChargeMin,
      'serviceCharge[lte]': serviceChargeMax,
      ownership,
      'size[gte]':sizeMin,
      'size[lte]':sizeMax,
      bedrooms,
      bathrooms,
      buildingName,
      amenities,
    };

    onSubmit(filterData);
  };

  return (
    <div>
      <div className="mb-5">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 bg-white shadow rounded-full px-4 py-2"
        >
          &times;
        </button>
        <h3 className="font-semibold text-primary">ADVANCED FILTER</h3>
      </div>

      <div className="flex gap-x-16 pr-10">
        <div>
          <p className="text-sm font-[540]">
            <CircleCheck className="w-5 h-5 inline-block mr-[5px] -mt-[5px] " />
            Featured:
          </p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => handleFilterChange("featured", true)}
              className={`px-3 py-[6px] rounded-md text-sm bg-tabColor border border-borderColor text-fontColor1 ${
                featured === true ? " border-primary border-2 " : ""
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleFilterChange("featured", false)}
              className={`px-3 py-[6px] rounded-md text-sm bg-tabColor border border-borderColor text-fontColor1 ${
                featured === false ? "border-primary border-2" : ""
              }`}
            >
              No
            </button>
          </div>
        </div>
        {filterType === "Rent" && (
          <div>
            <p className="text-sm font-medium">
              <Image
                src={date}
                alt="date"
                className="inline-block mr-[5px] -mt-1"
              />
              Availability From:
            </p>
            <Input
              id="availability-from"
              type="date"
              inputClassName="pl-4 !rounded-md bg-tabColor !h-[34px] mt-2"
              labelClassName="text-fontColor1"
            />
          </div>
        )}
      </div>

      <hr className="my-2" />

      <div className="mb-2">
        <p className="font-medium text-sm">
          <Image
            src={size}
            alt="size"
            className="inline-block mr-[6px] -mt-1"
          />
          Size In SQFT:
        </p>
        <div className="flex mt-1">
          <Input
            type="number"
            placeholder="Min. Area"
            value={sizeMin}
            onChange={(e) => handleFilterChange("sizeMin", e.target.value)}
            inputClassName="pl-4 !rounded-md bg-tabColor !h-[34px] mt-2 !w-[120px]"
          />
          <Input
            type="number"
            placeholder="Max. Area"
            value={sizeMax}
            onChange={(e) => handleFilterChange("sizeMax", e.target.value)}
            inputClassName="pl-4 !rounded-md bg-tabColor !h-[34px] mt-2 !w-[120px] !mr-[120px] "
          />
        </div>
      </div>

      <hr className="my-2" />
      {filterType === "Sale" && (
        <>
          <div>
            <p className="text-sm font-medium">
              <Image
                src={charge}
                alt="size"
                className="inline-block mr-[6px] -mt-1"
              />
              Service Charge:
            </p>
            <div className="flex  mt-2">
              <Input
                type="number"
                placeholder="Min.Charge"
                value={serviceChargeMin}
                onChange={(e) =>
                  handleFilterChange("serviceChargeMin", e.target.value)
                }
                inputClassName="pl-4 !rounded-md bg-tabColor !h-[34px] mt-2  !w-[120px] "
              />
              <Input
                type="number"
                placeholder="Max.Charge"
                value={serviceChargeMax}
                onChange={(e) =>
                  handleFilterChange("serviceChargeMax", e.target.value)
                }
                inputClassName="pl-4 !rounded-md bg-tabColor !h-[34px] mt-2 !w-[120px] !mr-[120px] "
              />
            </div>
          </div>
          <hr className="my-2" />
          <div className="mb-4">
            <p className="text-sm font-medium">
              <Image
                src={ownershipImg}
                alt="size"
                className="inline-block mr-[6px] -mt-1"
              />
              Ownership:
            </p>
            <div className="flex space-x-2 mt-2">
              {["Leasehold", "Freehold"].map((type) => (
                <button
                  key={type}
                  onClick={() => handleFilterChange("ownership", type)}
                  className={`px-3 py-[6px] rounded-md text-sm bg-tabColor border border-borderColor text-fontColor1  ${
                    ownership === type ? "border-primary border-2" : ""
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <hr className="my-2" />
        </>
      )}
      {filterType === "Rent" && (
        <>
          <div className="mb-4">
            <p className="font-medium text-sm">
              <Image
                src={Cheques}
                alt="size"
                className="inline-block mr-[6px] -mt-1"
              />
              Cheques:
            </p>
            <div className="flex space-x-2 mt-2">
              {[1, 2, 3, 4, 5, 6, 7].map((number) => (
                <button
                  key={number}
                  onClick={() => handleFilterChange("bathrooms", number)}
                  className={`px-3 py-[6px] rounded-md text-sm bg-tabColor border border-borderColor text-fontColor1 ${
                    bathrooms === number ? "border-primary border-2" : ""
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
          <hr className="my-2" />
        </>
      )}

      <div className="mb-4">
        <p className="font-medium text-sm">
          <Image
            src={bedroom}
            alt="size"
            className="inline-block mr-[6px] -mt-1"
          />
          Bedrooms:
        </p>
        <div className="flex space-x-2 mt-2">
          {[1, 2, 3, 4, 5, 6, 7].map((number) => (
            <button
              key={number}
              onClick={() => handleFilterChange("bedrooms", number)}
              className={`px-3 py-[6px] rounded-md text-sm bg-tabColor border border-borderColor text-fontColor1  ${
                bedrooms === number ? "border-primary border-2" : ""
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
      <hr className="my-2" />
      <div className="mb-4">
        <p className="font-medium text-sm">
          <Image
            src={bathroom}
            alt="size"
            className="inline-block mr-[6px] -mt-1"
          />
          Bathrooms:
        </p>
        <div className="flex space-x-2 mt-2">
          {[1, 2, 3, 4, 5].map((number) => (
            <button
              key={number}
              onClick={() => handleFilterChange("bathrooms", number)}
              className={`px-3 py-[6px] rounded-md text-sm bg-tabColor border border-borderColor text-fontColor1 ${
                bathrooms === number ? "border-primary border-2" : ""
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      {/* <div className="mb-4">
        <p className="font-medium text-sm">Building Name:</p>
        <input
          type="text"
          placeholder="Enter Building Name"
          value={buildingName}
          onChange={(e) => handleFilterChange("buildingName", e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div> */}
      <hr className="my-2" />
      <div className="mb-4 ">
        <p className="font-medium text-sm">
          <Image
            src={Amenities}
            alt="size"
            className="inline-block mr-[6px] -mt-1"
          />
          Amenities:
        </p>
        <div className="flex space-x-2 flex-wrap">
          {amenitiesToShow.map((amenity) => (
            <div key={amenity.value} className=" mt-2">
              <button
                //   checked={amenities.includes(amenity)}
                onClick={() => handleFilterChange("amenities", amenity.value)}
                className={`px-3 py-[6px] rounded-md text-sm bg-tabColor border whitespace-nowrap border-borderColor text-fontColor1 ${
                  amenities.includes(amenity.value)
                    ? "border-primary border-2"
                    : ""
                }`}
              >
                {amenity.label}
              </button>
            </div>
          ))}
        </div>
        {!showAll && Amenities1.length > 5 && (
          <div className="mt-2">
            <span
              onClick={handleShowMore}
              className="cursor-pointer text-fontColor1 underline text-sm"
            >
              See More
            </span>
          </div>
        )}
      </div>

      <div className=" flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 rounded-full bg-primary text-white hover:bg-darkPrimary"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default AdvancedFilter;

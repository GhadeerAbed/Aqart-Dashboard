import React, { useEffect, useState } from "react";
import { Amenities } from "../page";
import {
  firstMenu,
  firstMenu1,
  firstMenu2,
  firstMenu3,
  firstMenu4,
  firstMenu5,
  secondMenu,
  secondMenu1,
  secondMenu2,
  secondMenu3,
  secondMenu4,
  ThirdMenu,
  ThirdMenu1,
  ThirdMenu2,
  ThirdMenu3,
  ThirdMenu4,
  ThirdMenu5,
} from "../../data/page";

// export const AmenitiesGroup = ({
//   selectedType,
//   register,
//   setValue,

// }: {
//   selectedType: string;
//   register:any;
//   setValue: any;
// }) => {

//   return (
//     <div className="bg-lightSecondary w-full rounded-2xl px-3 py-2 pb-4 mt-8">
//       <h1 className=" font-semibold mb-4 uppercase">Amenities And Features</h1>
//       <p className="text-darkSecondary font-[500] text-sm mb-2">
//         Interior Details
//       </p>
//       <div className="flex justify-between">
//         {selectedType === "Residential" ? (
//           <>
//             <Amenities options={firstMenu} />
//             <Amenities options={firstMenu1} />
//             <Amenities options={firstMenu2} />
//           </>
//         ) : (
//           <>
//             <Amenities options={firstMenu3} />
//             <Amenities options={firstMenu4} />
//             <Amenities options={firstMenu5} />
//           </>
//         )}
//       </div>
//       <p className="text-darkSecondary font-[500] text-sm mb-2 mt-7">
//         Outdoor Details
//       </p>
//       <div className="flex justify-between">
//         {selectedType === "Residential" ? (
//           <>
//             <Amenities options={secondMenu} />
//             <Amenities options={secondMenu1} />
//             <Amenities options={secondMenu2} />
//           </>
//         ) : (
//           <>
//             <Amenities options={secondMenu3} />
//             <Amenities options={secondMenu4} />
//             <div></div>
//           </>
//         )}
//       </div>
//       <p className="text-darkSecondary font-[500] text-sm mb-2 mt-7">
//         Other Amenities
//       </p>
//       <div className="flex justify-between">
//         {selectedType === "Residential" ? (
//           <>
//             <Amenities options={ThirdMenu} />
//             <Amenities options={ThirdMenu1} />
//             <Amenities options={ThirdMenu2} />
//           </>
//         ) : (
//           <>
//             <Amenities options={ThirdMenu3} />
//             <Amenities options={ThirdMenu4} />
//             <Amenities options={ThirdMenu5} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AmenitiesGroup;

export const AmenitiesGroup = ({
  selectedType,
  register,
  setValue,
}: {
  selectedType: string;
  register: any;
  setValue: any;
}) => {
  // State to manage selected options for each category
  const [interiorDetails, setInteriorDetails] = useState<string[]>([]);
  const [outdoorDetails, setOutdoorDetails] = useState<string[]>([]);
  const [otherAmenities, setOtherAmenities] = useState<string[]>([]);

  const handleCheckboxChange = (category: string, value: string) => {
    const setStateFn = {
      interiorDetails: setInteriorDetails,
      outdoorDetails: setOutdoorDetails,
      otherAmenities: setOtherAmenities,
    }[category];

    const currentState = {
      interiorDetails,
      outdoorDetails,
      otherAmenities,
    }[category];

    const newState = currentState.includes(value)
      ? currentState.filter((item) => item !== value)
      : [...currentState, value];

    setStateFn(newState);
    setValue(category, newState); // Update react-hook-form state
  };

  useEffect(() => {
    register("interiorDetails");
    register("outdoorDetails");
    register("otherAmenities");
  }, [register]);

  // Example menu items

  return (
    <div className="bg-lightSecondary w-full rounded-2xl px-3 py-2 pb-4 mt-8">
      <h1 className="font-semibold mb-4 uppercase">Amenities And Features</h1>
      <p className="text-darkSecondary font-[500]  mb-2"> Interior Details </p>

      <div className="flex justify-between flex-wrap">
        {selectedType === "Residential" ? (
          <>
            <Amenities
              options={firstMenu}
              selectedOptions={interiorDetails}
              onCheckboxChange={(value) =>
                handleCheckboxChange("interiorDetails", value)
              }
            />
            <Amenities
              options={firstMenu1}
              selectedOptions={interiorDetails}
              onCheckboxChange={(value) =>
                handleCheckboxChange("interiorDetails", value)
              }
            />
            <Amenities
              options={firstMenu2}
              selectedOptions={interiorDetails}
              onCheckboxChange={(value) =>
                handleCheckboxChange("interiorDetails", value)
              }
            />
          </>
        ) : (
          <>
            <Amenities
              options={firstMenu3}
              selectedOptions={interiorDetails}
              onCheckboxChange={(value) =>
                handleCheckboxChange("interiorDetails", value)
              }
            />
            <Amenities
              options={firstMenu4}
              selectedOptions={interiorDetails}
              onCheckboxChange={(value) =>
                handleCheckboxChange("interiorDetails", value)
              }
            />
            <Amenities
              options={firstMenu5}
              selectedOptions={interiorDetails}
              onCheckboxChange={(value) =>
                handleCheckboxChange("interiorDetails", value)
              }
            />
          </>
        )}
      </div>

      <p className="text-darkSecondary font-[500]  mb-2 mt-7">
        Outdoor Details{" "}
      </p>
      <div className="flex justify-between flex-wrap">
        {selectedType === "Residential" ? (
          <>
            <Amenities
              options={secondMenu}
              selectedOptions={outdoorDetails}
              onCheckboxChange={(value) =>
                handleCheckboxChange("outdoorDetails", value)
              }
            />
            <Amenities
              options={secondMenu1}
              selectedOptions={outdoorDetails}
              onCheckboxChange={(value) =>
                handleCheckboxChange("outdoorDetails", value)
              }
            />
            <Amenities
              options={secondMenu2}
              selectedOptions={outdoorDetails}
              onCheckboxChange={(value) =>
                handleCheckboxChange("outdoorDetails", value)
              }
            />
          </>
        ) : (
          <>
            <Amenities
              options={secondMenu3}
              selectedOptions={outdoorDetails}
              onCheckboxChange={(value) =>
                handleCheckboxChange("outdoorDetails", value)
              }
            />
            <Amenities
              options={secondMenu4}
              selectedOptions={outdoorDetails}
              onCheckboxChange={(value) =>
                handleCheckboxChange("outdoorDetails", value)
              }
            />
            <div></div>
          </>
        )}
      </div>

      <p className="text-darkSecondary font-[500]  mb-2 mt-7">
        Other Amenities
      </p>
      <div className="flex justify-between flex-wrap">
        {selectedType === "Residential" ? (
          <>
            <Amenities
              options={ThirdMenu}
              selectedOptions={otherAmenities}
              onCheckboxChange={(value) =>
                handleCheckboxChange("otherAmenities", value)
              }
            />
            <Amenities
              options={ThirdMenu1}
              selectedOptions={otherAmenities}
              onCheckboxChange={(value) =>
                handleCheckboxChange("otherAmenities", value)
              }
            />
            <Amenities
              options={ThirdMenu2}
              selectedOptions={otherAmenities}
              onCheckboxChange={(value) =>
                handleCheckboxChange("otherAmenities", value)
              }
            />
          </>
        ) : (
          <>
            <Amenities
              options={ThirdMenu3}
              selectedOptions={otherAmenities}
              onCheckboxChange={(value) =>
                handleCheckboxChange("otherAmenities", value)
              }
            />
            <Amenities
              options={ThirdMenu4}
              selectedOptions={otherAmenities}
              onCheckboxChange={(value) =>
                handleCheckboxChange("otherAmenities", value)
              }
            />
            <Amenities
              options={ThirdMenu5}
              selectedOptions={otherAmenities}
              onCheckboxChange={(value) =>
                handleCheckboxChange("otherAmenities", value)
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AmenitiesGroup;

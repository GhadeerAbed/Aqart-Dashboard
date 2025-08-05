import React, { useEffect, useState } from "react";
import { PropImages } from "../page";

export const FourStep = ({
  register,
  setValue,
}: {
  register: any;
  setValue: any;
  
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [propertyImages, setPropertyImages] = useState([]);
  const [buildingImages, setBuildingImages] = useState([]);
  const [communityImages, setCommunityImages] = useState([]);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  useEffect(() => {
    const allImages = [
      ...propertyImages,
      ...buildingImages,
      ...communityImages,
    ];
    setValue("images", allImages);
  }, [propertyImages, buildingImages, communityImages, setValue]);
  
  return (
    <div className=" max-w-[648px] space-y-2">
      <div className="max-w-[648px] space-y-2">
        <PropImages
          title="1- Upload Property Images"
          type="Required"
          isOpen={openIndex === 0}
          onToggle={() => handleToggle(0)}
          onImagesChange={setPropertyImages}
          images={propertyImages}
        />
        <PropImages
          title="2- Upload Building Images"
          type="Optional"
          isOpen={openIndex === 1}
          onToggle={() => handleToggle(1)}
          onImagesChange={setBuildingImages}
          images={buildingImages}
          
        />
        <PropImages
          title="3- Upload Community Images"
          type="Optional"
          isOpen={openIndex === 2}
          onToggle={() => handleToggle(2)}
          onImagesChange={setCommunityImages}
          images={communityImages}
        />
          <PropImages
          title="4- Upload Video Links"
          type="Optional"
          isOpen={openIndex === 3}
          onToggle={() => handleToggle(3)}
          register={register}
          // onImagesChange={setCommunityImages}
        />
      </div>
    </div>
  );
};

export default FourStep;

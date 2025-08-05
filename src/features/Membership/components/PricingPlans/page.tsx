// src/components/PricingPlans.js
import { Button, PricingCard } from "@/components/page";
import React, { useState } from "react";

export const PricingPlans = () => {
  const packagesType = {
    Free: "Free",
    Premium: "Premium",
    Elite: "Elite",
  };
  const packagesPeriod = {
    Monthly: "Monthly",
    Quarterly: "Quarterly",
    Business: "Business",
  };

  const [selectedPeriod, setSelectedPeriod] = useState(packagesPeriod.Monthly);

  const plans = [
    {
      price: 0,
      title:packagesType.Free,
      list: 5,
      f_list: 5,
      admin: 7,
      manger: 8,
      agent: 5,
      isActive: true,
    },
    {
      price: 20,
      title: packagesType.Premium,
      list: 500,
      f_list: 200,
      admin: 20,
      manger: 40,
      agent: 50,
      isPopular: true,
    },
    {
      price: 15,
      title:packagesType.Elite,
      list: 20,
      f_list: 30,
      admin: 40,
      manger: 20,
      agent: 30,
    },
  ];

  return (
    <div className=" w-full ">
      <div className=" flex flex-col justify-center items-center">
      <div className="flex sm:gap-8  gap-4 mt-20 flex-wrap">
        {Object.values(packagesPeriod).map((period) => (
          <Button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-full ${
              selectedPeriod === period
                ? "bg-primary text-white"
                : "bg-white text-black"
            }`}
          >
            {period}
          </Button>
        ))}
      </div>
      <div className="my-6 text-center  ">
        <h1>Get the best plan for your business.</h1>
        <h2> Plans can be upgraded in the future.</h2>
      </div>
      <div className="flex gap-6 mt-5 flex-wrap ">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} period={selectedPeriod} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default PricingPlans;

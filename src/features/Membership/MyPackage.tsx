"use client"
import React from "react";
import PackageChart from "./components/PackageChart/page";
import PricingPlans from "./components/PricingPlans/page";


const MyPackage = () => {
  return (
    <div className="w-full">
      <div className="">
        <PackageChart />
      </div>
      <div>
        <PricingPlans />
      </div>
    </div>
  );
};

export default MyPackage;

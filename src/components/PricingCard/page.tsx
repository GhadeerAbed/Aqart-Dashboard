"use client"
import React, { useState } from "react";
import {
  BigModal,
  Button,
  User1Icon,
  User2Icon,
  User3Icon,
  User4Icon,
  UserIcon,
} from "../page";
import { useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import { toast } from "sonner";

interface cardProp {
  price?: number;
  title?: string;
  list: number;
  f_list: number;
  admin: number;
  manger: number;
  agent: number;
  isActive?: boolean;
  isPopular?: boolean;
  period?: string;
  showButton?: boolean;
}

export const PricingCard: React.FC<cardProp> = ({
  price,
  title,
  list,
  f_list,
  admin,
  manger,
  agent,
  isActive,
  isPopular,
  period,
  showButton = true,
}) => {
 

  const { customTrigger } = useSWRMutationHook(
    API_SERVICES_URLS.GET_ALL_PAYMENT,
    "POST"
  );

  const handleSubscribe = async () => {
    const requestBody = {
      packagesPeriod: period,
      packagesType: title,
      price: price,
    };

    try {
      const response = await customTrigger(requestBody);
      console.log("Subscription successful:", response);
      if (response.isSuccessed) {
        toast.success("Package requested successfully!");
      } else {
        toast.error("Failed to request package.");
      }
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        {isActive || isPopular ? (
          <span
            className={`block text-fontColor1 px-5 py-1 rounded-t-lg ${
              isActive ? "bg-[#CEFAF5]" : "bg-[#F9F3D3] px-6"
            }`}
          >
            {isActive ? "ACTIVE PLAN" : "MOST POPULAR"}
          </span>
        ) : (
          <span className="px-5 py-[15px]"></span>
        )}

        <div
          className={`p-5 rounded-lg shadow-md  w-[260px] ${
            isActive ? "" : "border-2 border-primary"
          }`}
        >
          <div>
            <span className="text-4xl font-bold">${price}</span>
            <span className="text-fontColor2 text-sm">/ {period}</span>
          </div>
          <div className="text-lg font-semibold my-2 uppercase">
            {title} PACKAGE
          </div>
          {showButton ? (
             <Button
             className={`w-full py-2 !my-4 text-white  rounded-full bg-[#17AA9D]`}
             onClick={handleSubscribe}
           >
            SUBSCRIBE NOW
           </Button>
          ):(<div className="py-3"> </div>)}
         
          <ul className="my-2">
            <li className="flex items-center gap-x-2">
              <User3Icon className="text-primary" />
              <p>
                Total Listings <span className="text-primary">{list}</span>
              </p>
            </li>
            <li className="flex items-center gap-x-2 pt-2">
              <User4Icon className="text-primary" />
              <p>
                Total Featured Listings{" "}
                <span className="text-primary">{f_list}</span>
              </p>
            </li>
            <li className="flex items-center gap-x-2 pt-2">
              <UserIcon className="text-primary" />
              <p>
                Total Admins <span className="text-primary">{admin}</span>
              </p>
            </li>
            <li className="flex items-center gap-x-2 pt-2">
              <User1Icon className="text-primary" />
              <p>
                Total Managers <span className="text-primary">{manger}</span>
              </p>
            </li>
            <li className="flex items-center gap-x-2 pt-2">
              <User2Icon className="text-primary" />
              <p>
                Total Agents <span className="text-primary">{agent}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      {/* <BigModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        ModalclassName="!w-[500px]"
      >
        <div>
          <h1 className="text-primary font-bold text-center  uppercase text-xl">
            Upgrade to
          </h1>
          <PricingCard
            list={20}
            f_list={30}
            admin={40}
            manger={20}
            agent={30}
            price={15}
            title="Elite"
            period={period}
            showButton={false}
          />
          <p className="text-center text-sm text-fontColor2 pt-3">
            You will receive a call or email to confirm upgrading your plan
          </p>
          <div className=" flex justify-center items-center  gap-5 mt-5">
            <Button
              className="bg-primary text-white px-10 uppercase"
              buttonSize="small"
              onClick={handleSubscribe}
            >
              Request Now
            </Button>
            <Button
              className="bg-primary text-white px-10 uppercase"
              buttonSize="small"
            >
              cancel
            </Button>
          </div>
        </div>
      </BigModal> */}
    </>
  );
};

export default PricingCard;


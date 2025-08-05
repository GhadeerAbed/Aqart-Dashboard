"use client"

import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AgentInput, BigModal, Button, useAuth } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const PropActionDropdown = ({
  id,
  onEdit,
  mutate
}: {
  id: any;
  onEdit: () => void;
  mutate: any;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();
  const { customTrigger: updatePropState } = useSWRMutationHook(
    API_SERVICES_URLS.GET_PROPERTY(id),
    "PUT"
  );

  const { data: getPropData } = useSWRHook(API_SERVICES_URLS.GET_PROPERTY(id));

  useEffect(() => {
    if (getPropData) {
      console.log("getPropData");
    }
  }, [getPropData]);

  const handleDisable = async () => {
    try {
      const res = await updatePropState({ status: "Disabled" });
      mutate()
      if (res.isSuccessed) {
        toast.success("Property disabled successfully!");
      } else {
        toast.error("failed updated to Disabled.");
      }
      console.log("failed updated to Disabled.");
    } catch (error) {
      console.error("Failed to update property status", error);
    }
  };

  const handleFeatured = async () => {
    try {
      if (getPropData?.data?.feature === false) {
        const res = await updatePropState({ feature: true });
        mutate()
        if (res.isSuccessed) {
          toast.success("Featured updated successfully!");
        } else {
          toast.error("Failed to update feature.");
        }
      } else {
        const response = await updatePropState({ feature: false });
        mutate()
        if (response.isSuccessed) {
          toast.success("Featured updated successfully!");
        } else {
          toast.error("Failed to update feature.");
        }
      }

      console.log("Property status updated to Disabled.");
    } catch (error) {
      console.error("Failed to update property status", error);
    }
  };

  const { userData } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmit = async (data: any) => {
    try {
      const res = await updatePropState({
        agent: data.agent,
      });
      mutate()
      closeModal();

      if (res.isSuccessed) {
        toast.success("Agent assigned successfully!");
      } else {
        toast.error("Failed to assign agent.");
      }
    } catch (error) {
      console.error("Failed to assign property to agent", error);
      toast.error("An error occurred while assigning the agent.");
    }
  };

  return (
   
    <div className="relative inline-block font-nunito ">
      <Menu>
        <MenuButton className={"relative"}>...</MenuButton>

        <MenuItems className="absolute z-50 right-0 w-[150px] origin-top-right rounded-md  bg-white    text-fontColor1 shadow-lg  py-1">
          <MenuItem as="div">
            {({ active }) => (
              <button
                className={` flex w-full items-center pl-4 py-1.5  ${
                  active ? "bg-gray-100" : ""
                }`}
                onClick={onEdit}
              >
                Edit Property
              </button>
            )}
          </MenuItem>
          <MenuItem as="div">
            {({ active }) => (
              <button
                className={` flex w-full items-center gap-2  py-1.5 pl-4 ${
                  active ? "bg-gray-100" : ""
                }`}
                onClick={handleDisable}
              >
                Disable Property
              </button>
            )}
          </MenuItem>
          <MenuItem as="div">
            {({ active }) => (
              <button
                className={` flex w-full items-center gap-2  py-1.5 pl-4 ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                Analytics
              </button>
            )}
          </MenuItem>
          {getPropData?.data?.feature === false ? (
            <MenuItem as="div">
              {({ active }) => (
                <button
                  className={` flex w-full items-center gap-2  py-1.5 pl-4 ${
                    active ? "bg-gray-100" : ""
                  }`}
                  onClick={handleFeatured}
                >
                  Set As Featured
                </button>
              )}
            </MenuItem>
          ) : (
            <MenuItem as="div">
              {({ active }) => (
                <button
                  className={` flex w-full items-center gap-2  py-1.5 pl-4 ${
                    active ? "bg-gray-100" : ""
                  }`}
                  onClick={handleFeatured}
                >
                  remove Featured
                </button>
              )}
            </MenuItem>
          )}
          <MenuItem as="div">
            {({ active }) => (
              <button
                className={` flex w-full items-center gap-2  py-1.5 pl-4 ${
                  active ? "bg-gray-100" : ""
                }`}
                onClick={openModal}
              >
                Assign to Agent
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
      <BigModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        ModalclassName="!w-[500px]"
      >
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="mb-3">Select Your Agent</h1>
            {userData.role === "Agency" && (
  
              <AgentInput
                register={register}
                setValue={setValue}
                type="all"
                initialValue={{
                  _id: getPropData?.data?.agent?._id,
                  fullName: getPropData?.data?.agent?.fullName,
                }}
              />
      
            )}
            {userData.role === "AgencyManger" && (
  
              <AgentInput
                register={register}
                setValue={setValue}
                initialValue={{
                  _id: getPropData?.data?.agent?._id,
                  fullName: getPropData?.data?.agent?.fullName,
                }}
              />
            )}
            <Button
              className="bg-primary text-white uppercase px-8 hover:bg-darkPrimary flex mx-auto mt-20"
              type="submit"
              buttonLoadingProps={{ loadingText: "assign..." }}
              loading={isSubmitting}
            >
              Assign Now
            </Button>
          </form>
        </>
      </BigModal>
    </div>
  
  );
};

export default PropActionDropdown;

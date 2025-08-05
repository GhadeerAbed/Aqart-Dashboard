import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BigModal, Button } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import { toast } from "sonner";

export const StatusDropdown = ({ id, onEdit , mutate}: { id: any; onEdit?:()=>void ; mutate?:any}) => {
  const { customTrigger: updatePropState } = useSWRMutationHook(
    API_SERVICES_URLS.GET_PROPERTY(id),
    "PUT"
  );

  const { data: getPropData } = useSWRHook(API_SERVICES_URLS.GET_PROPERTY(id));

  const handleDrafted = async () => {
    try {
     const res =  await updatePropState({ status: "Drafted" });
     mutate();
      if(res.isSuccessed){
        toast.success("Property status updated to Disabled.")
      }else{
        toast.error("Property status failed to update")
      }
      console.log("Property status updated to Disabled.");
    } catch (error) {
      console.error("Failed to update property status", error);
    }
  };
  const handlePublished = async () => {
    try {
     const res = await updatePropState({ status: "Published" });
     mutate();
      console.log("Property status updated to Disabled.");
      if(res.isSuccessed){
        toast.success("Property status updated to Published.")
      }else{
        toast.error("Property status failed to update")
      }
    } catch (error) {
      console.error("Failed to update property status", error);
    }
  };

  const { customTrigger: deleteUser } = useSWRMutationHook(
    API_SERVICES_URLS.DELATE_USER(id),
    "DELETE"
  );

  const handleUserDelete = async () => {
   const res = await deleteUser({ isDeleted: true });
   mutate();
   if(res.isSuccessed){
    toast.success("Property deleted successfully.")
  }else{
    toast.error("Property failed to deleted")
  }
    console.log("delete done");
  };

  useEffect(() => {
    if (getPropData) {
      console.log("getPropData");
    }
  }, [getPropData]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative inline-block font-nunito ">
      <Menu>
        <MenuButton className={"relative"}>...</MenuButton>

        <MenuItems className="absolute z-50 right-0 w-[150px] origin-top-right rounded-md  bg-white    text-fontColor1 shadow-lg  py-1">
          {getPropData?.data?.status === "Disabled" && (
            <MenuItem as="div">
              {({ active }) => (
                <button
                  className={` flex w-full items-center pl-4 py-1.5  ${
                    active ? "bg-gray-100" : ""
                  }`}
                  onClick={handlePublished}
                >
                  Publish
                </button>
              )}
            </MenuItem>
          )}
           {getPropData?.data?.status === "Pending" && (
          <MenuItem as="div">
            {({ active }) => (
              <button
                className={` flex w-full items-center pl-4 py-1.5  ${
                  active ? "bg-gray-100" : ""
                }`}
                onClick={openModal}
              >
                Cancel
              </button>
            )}
          </MenuItem>
           )}
           {getPropData?.data?.status === "Drafted" && (
          <MenuItem as="div">
            {({ active }) => (
              <button
                className={` flex w-full items-center pl-4 py-1.5  ${
                  active ? "bg-gray-100" : ""
                }`}
                onClick={onEdit}
              >
                Continue
              </button>
            )}
          </MenuItem>
           )}
        </MenuItems>
      </Menu>
      <BigModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        ModalclassName="!w-[500px]"
      >
        <>
          <div>
            <h1 className="text-center mt-2 font-nunito font-semibold">
              Do you want to cancel this property?{" "}
            </h1>
            <div className="flex justify-center items-center mt-8 gap-x-2">
              <Button
                className="bg-primary text-white uppercase px-5 hover:bg-darkPrimary "
                type="button"
                // buttonLoadingProps={{ loadingText: "canceling..." }}
                // loading={isSubmitting}
                onClick={handleUserDelete}
              >
                cancel
              </Button>
              <Button
                className="bg-primary text-white uppercase px-4 hover:bg-darkPrimary "
                type="button"
                // buttonLoadingProps={{ loadingText: "saving..." }}
                // loading={isSubmitting}
                onClick={handleDrafted}
              >
                save as draft
              </Button>
            </div>
          </div>
        </>
      </BigModal>
    </div>
  );
};

export default StatusDropdown;

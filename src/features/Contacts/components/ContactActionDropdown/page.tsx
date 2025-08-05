import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import { toast } from "sonner";
import { BigModal } from "@/components/page";

export const ContactActionDropdown = ({ id }: { id: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { customTrigger: updateContactState } = useSWRMutationHook(
    API_SERVICES_URLS.CONVERT_CONTACT_TO_LEAD(id),
    "PUT"
  );

  const { data: getEnquiryMessage } = useSWRHook(
    API_SERVICES_URLS.UPDATE_LEAD_TABLE(id)
  );

  const handleConvertToLead = async () => {
    try {
      const res = await updateContactState();
      if (res.isSuccessed) {
        toast.success("Successfully converted to lead!");
      } else {
        toast.error("Failed to convert to lead. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to convert to lead. Please try again.");
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
                className={` flex w-full items-center gap-2  py-1.5 pl-4 ${
                  active ? "bg-gray-100" : ""
                }`}
                onClick={handleConvertToLead}
              >
                Convert To Lead
              </button>
            )}
          </MenuItem>

          <MenuItem as="div">
            {({ active }) => (
              <button
                className={` flex w-full items-center gap-2  py-1.5 pl-4 ${
                  active ? "bg-gray-100" : ""
                }`}
                onClick={openModal}
              >
                View Enquiry
              </button>
            )}
          </MenuItem>
        </MenuItems>
        <BigModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          ModalclassName="!w-[500px]"
        >
          <>
            <div>
              <h1 className="text-center mt-2 font-nunito font-semibold text-primary text-xl">
                Enquiry Message
              </h1>
              <p className="p-3 mt-2 font-nunito font-[500]">
                {getEnquiryMessage?.data?.enquiryMessage}
              </p>
            </div>
          </>
        </BigModal>
      </Menu>
    </div>
  );
};

export default ContactActionDropdown;

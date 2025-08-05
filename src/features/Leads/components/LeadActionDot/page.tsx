import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BigModal } from "@/components/page";
import { Notes } from "../page";

export const LeadActionDot = ({
  id,
  onEdit,
}: {
  id: any;
  onEdit: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModal1 = () => setIsModalOpen1(true);
  const closeModal1 = () => setIsModalOpen1(false);

  return (
    <div className="relative inline-block">
      <Menu>
        <MenuButton className={"relative"}>...</MenuButton>
        <MenuItems
          className="absolute right-0 z-50 mt-2 w-[150px] origin-top-right rounded-md  bg-white    text-fontColor1 shadow-lg  py-1"
        >
          <MenuItem as="div">
            {({ active }) => (
              <button
                className={` flex w-full items-center pl-4 py-1.5  ${
                  active ? "bg-gray-100" : ""
                }`}
                onClick={onEdit}
              >
                Edit
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
                Add Note
              </button>
            )}
          </MenuItem>
          <MenuItem as="div">
            {({ active }) => (
              <button
                className={` flex w-full items-center gap-2  py-1.5 pl-4 ${
                  active ? "bg-gray-100" : ""
                }`}
                onClick={openModal1}
              >
                Add Reminder
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
      <BigModal isOpen={isModalOpen} closeModal={closeModal}>
        <div>
          <Notes
            pageTitle="Add A Note"
            Reminder={false}
            buttonName="Note"
            rowId={id}
          />
        </div>
      </BigModal>
      <BigModal isOpen={isModalOpen1} closeModal={closeModal1}>
        <div>
          <Notes
            pageTitle="Add A Reminder"
            Reminder={true}
            buttonName="Reminder"
            rowId={id}
          />
        </div>
      </BigModal>
    </div>
  );
};

export default LeadActionDot;

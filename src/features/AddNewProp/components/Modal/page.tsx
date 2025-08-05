"use client"
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { Fragment, useState } from "react";

import { Button } from "@/components/page";
import AgentForm from "../AgentForm/page";


interface modalProp {
    register:any ;
    setValue:any ;
}

const Modal: React.FC<modalProp> = ({register ,setValue}) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div>
        <Button
          className="bg-white text-primary border-primary uppercase px-8 hover:bg-primary hover:text-white"
          type="button"
          // buttonLoadingProps={{ loadingText: "Updating..." }}
          buttonSize="small"
          onClick={openModal}
        >
          Publish Property
        </Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#0C4540]/50" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform h-[300px] overflow-hidden  rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all">
                 <AgentForm onClose={closeModal} register ={register} setValue={setValue} />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;

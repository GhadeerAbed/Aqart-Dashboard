"use client"
import React from 'react';
import { Dialog, Transition ,TransitionChild ,DialogPanel } from '@headlessui/react';

export const BigModal = ({ isOpen, closeModal, children ,ModalclassName , isSidebar = false}:{ isOpen :boolean, closeModal:any, children:React.ReactNode , ModalclassName?:string ,isSidebar?:boolean }) => {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={closeModal}>
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`fixed inset-0 bg-[#0C4540]/50 bg-opacity-25 ${isSidebar? "mt-[77px]" : ""} `} />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className={`flex  min-h-full ${isSidebar?"justify-start -ml-4 fixed top-14 ":"justify-center items-center "} p-4 text-center`}>
            <TransitionChild
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className={`${ModalclassName} w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

"use client"
import { AgentInput, Button, useAuth } from "@/components/page";
import React from "react";

const AgentForm = ({
  onClose,
  register,
  setValue,
}: {
  onClose: () => void;
  register: any;
  setValue: any;
}) => {
  const { userData } = useAuth();

  return (
    <div>
      <div className="mb-5 ">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 bg-white shadow rounded-full px-2 py-1"
        >
          &times;
        </button>
      </div>
      <h3 className="font-semibold pb-5">Please Select Your Agents</h3>
      <form>
        {userData.role === "Agency" && (
          <AgentInput register={register} setValue={setValue} type="all" />
        )}
        {userData.role === "AgencyManger" && (
          <AgentInput register={register} setValue={setValue} />
        )}
        <Button
          className="bg-primary text-white uppercase px-8 hover:bg-darkPrimary flex mx-auto mt-20"
          type="submit"
        >
          Publish Now
        </Button>
      </form>
    </div>
  );
};

export default AgentForm;

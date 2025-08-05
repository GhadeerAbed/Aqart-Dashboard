import React, { useState, useEffect } from "react";
import { Button, useAuth } from "../page";
import Modal from "@/features/AddNewProp/components/Modal/page";

const steps = ["Description", "Description", "Details", "Media"];

export const HorizontalNonLinearStepper = ({
  children,
  onSubmit,
  selectedType,
  selectedTransaction,
  register,
  handleSubmit,
  setValue,
  watch,
  propertyData,
  isLoadingProperty,
}: {
  children: React.ReactNode;
  onSubmit: any;
  selectedType: string;
  selectedTransaction: string;
  register: any;
  handleSubmit: any;
  setValue: any;
  watch: any;
  propertyData?: any;
  isLoadingProperty?: any;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const { userData } = useAuth();

  const totalSteps = () => React.Children.count(children);
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newCompleted = { ...completed, [activeStep]: true };
    setCompleted(newCompleted);

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    const newCompleted = { ...completed };
    setCompleted(newCompleted);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: any) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  useEffect(() => {
    if (propertyData && !isLoadingProperty) {
      setValue("propertyName", propertyData.data.propertyName);
      setValue("price", propertyData.data.price);
      setValue("description", propertyData.data.description);
      setValue("location", propertyData.data.location);
      setValue("type", propertyData.data.type);
      setValue("transaction", propertyData.data.transaction);
    }
  }, [propertyData, isLoadingProperty, setValue]);

  const handleFormSubmit = (data: any) => {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    formData.append("category", selectedType);
    formData.append("type", selectedTransaction);
    formData.append("agency", userData._id);

    onSubmit(formData);
  };

  return (
    <div className="w-full lg:w-[815px] mt-6">
      <div className="flex justify-between mb-6 relative max-custom:ml-5">
        {steps.map((label, index) => (
          <div
            key={label}
            className="flex flex-col  cursor-pointer relative flex-1"
            onClick={handleStep(index)}
          >
            <div
              className={`w-8 h-8 rounded-full ${
                completed[index]
                  ? "bg-teal-600"
                  : index === activeStep
                  ? "bg-teal-400"
                  : "bg-gray-300"
              } text-white flex justify-center items-center mb-2 z-10`}
            >
              {index + 1}
            </div>
            <div className=" text-sm">{label}</div>
            {index < steps.length - 1 && (
              <div
                className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-full lg:w-[calc(100% - 10px)] h-0.5 ${
                  completed[index] ? "bg-teal-600" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          {allStepsCompleted() ? (
            <div>
              <div>All steps completed</div>
              <div className="flex justify-end">
                <Button onClick={handleReset}>Reset</Button>
              </div>
            </div>
          ) : (
            <div className="w-full lg:w-[700px]">
              <div>
                {React.Children.map(children, (child, index) => {
                  if (index === activeStep) {
                    return React.cloneElement(child as React.ReactElement, {
                      register,
                      setValue,
                      watch,
                    });
                  }
                  return null;
                })}
              </div>
              <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                  className="bg-primary text-white uppercase px-4 lg:px-8"
                  type="button"
                  onClick={handleBack}
                  buttonSize="small"
                  disabled={activeStep === 0}
                >
                  Back
                </Button>
                <Button
                  className="bg-darkPrimary text-white uppercase px-4 lg:px-8 whitespace-nowrap"
                  type="submit"
                  buttonSize="small"
                >
                  Save as a Draft
                </Button>
                {!isLastStep() && (
                  <Button
                    className="bg-white text-primary border-primary uppercase px-4 lg:px-8 hover:bg-primary hover:text-white"
                    type="button"
                    onClick={handleNext}
                    buttonSize="small"
                  >
                    Next
                  </Button>
                )}
                {isLastStep() && <Modal register={register} setValue={setValue} />}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default HorizontalNonLinearStepper;


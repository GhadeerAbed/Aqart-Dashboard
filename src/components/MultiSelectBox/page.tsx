"use client"
import { Fragment, useEffect, useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
  Transition,
  ComboboxInput,
} from "@headlessui/react";

import { ChevronDownIconMini } from "@/lib/@heroicons/page";

interface Options {
  label: string;
  value: string;
  id?: string;
  name?: string;
}

interface Props {
  className?: string;
  value: Options[];
  onChange: (value: Options[]) => void;
  name: string;
  options: Options[];
  errors?: boolean;
  labelPayment?: string;
  defaultValue: string;
  setValue?: any;
  id?: string;
  label?: string;
  selectHeight?: string;
  withoutHelperText?: boolean;
  helperText?: any;
  optionItemClass?: string;
  labelClassName?: string;
  selectClassName?: string;
}

export default function MultiSelectBox(props: Props){
  const {
    options,
    selectHeight = "h-[39px]",
    value,
    onChange,
    className,
    errors,
    name,
    defaultValue,
    id,
    label,
    withoutHelperText,
    helperText,
    optionItemClass = "",
    labelClassName,
    selectClassName
  } = props;

  const [selected, setSelected] = useState<Options[]>(value);
  const [query, setQuery] = useState("");

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  const filteredOptions =
    query === ""
      ? options
      : options?.filter((option) => {
          return option.label?.toLowerCase().includes(query.toLowerCase());
        });

  const classes = {
    label: `block -mb-[6px] text-darkSecondary text-sm font-[500] ${labelClassName ?? ""} `,
    select: `border border-gray !cursor-pointer ${
      errors
        ? `border-red`
        : `border border-gray focus:border-blue focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`
    } focus-visible:ring-offset-2 focus-visible:ring-offset-grey-300 cursor-default  rounded-full  py-2 ps-2 pre-5 text-start bg-white focus:outline-none focus-visible:ring-offset-grey-300 sm:text-sm ${selectClassName}`,
    options:
      "absolute z-40 w-full capitalize !cursor-pointer py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 scrollbar-track-gray-200 scrollbar-thumb-gray-300 scrollbar-thin scrollbar-thumb-rounded-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
    helperText: "inline-flex min-h-[20px] text-xs mt-1",
  };

  return (
    <div className={`w-full relative flex flex-col gap-3 mb-3 ${className} `}>
      {label && <label htmlFor={id} className={classes.label}>{label}</label>}
      <Combobox value={selected} onChange={setSelected} multiple>
        <div className={`w-full ${optionItemClass}`}>
          <div className={`relative flex rounded-full ${selectHeight}`}>
            <ComboboxButton
              id={id}
              className={`relative w-full  ${
                errors
                  ? "border-red-500"
                  : "border-borderColor focus:ring-black focus:border-black  "
              } ${classes.select}`}
            >
              <ComboboxInput
                className="w-[90%] -mx-[8px] -my-[7px] rounded-full border-none text-sm  text-gray-900 focus:ring-0  !bg-backgroundColor !py-0"
                displayValue={(options: Options[]) => options?.map((option) => option.label).join(', ')}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={defaultValue}
              />
              <p className="text-end mr-10 -mt-5"><span className="bg-[#D9D9D9] p-2 rounded-full">+ Add</span></p>
              <span className="absolute inset-y-0 end-0 flex items-center pe-2 pointer-events-none !bg-backgroundColor rounded-r-3xl">
                <ChevronDownIconMini
                  className="h-6 w-6 text-[#6b7280] "
                  aria-hidden="true"
                />
              </span>
            </ComboboxButton>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ComboboxOptions static className={classes.options}>
              {filteredOptions?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOptions?.map((option) => (
                  <ComboboxOption
                    key={option.value}
                    className={
                      `relative cursor-pointer select-none py-2 pl-5 pr-4 hover:bg-gray-100`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.label}
                        </span>
                   
                      </>
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
          {!withoutHelperText && errors && (
            <p className={classes.helperText}>{helperText}</p>
          )}
        </div>
      </Combobox>
    </div>
  );
}

"use client"
import { useState, useEffect } from "react";
import Input from "../Input/page";
import { MagnifyingGlassIconOutline } from "@/lib/@heroicons/page";

export const Search = ({
  setSearch: onSearchSubmit,
  inputClass = "",

  withRequest = true,
}: {
  setSearch: Function;
  inputClass?: string;

  withRequest?: boolean;
}) => {
  const [term, setTerm] = useState("");

  useEffect(() => {
    if (withRequest) {
      const timer = setTimeout(() => onSearchSubmit(term), 700);
      return () => clearTimeout(timer);
    } else {
      onSearchSubmit(term);
    }
  }, [term]);

  return (
    <Input
      id="search"
      data-testid="search"
      type="search"
      inputClassName={` pl-10 placeholder:text-gray-400 shadow-sm h-full border-none rounded-none ${inputClass}`}
      inputSize="small"
      placeholder="Name, Phone or Email address"
      value={term}
      onChange={(e) => setTerm(e.target.value)}
      startIcon={<MagnifyingGlassIconOutline className="w-5 h-5" />}
      withoutHelperText
      className="!mb-0 flex  border-darkSecondary"
    />

  );
};

export default Search;
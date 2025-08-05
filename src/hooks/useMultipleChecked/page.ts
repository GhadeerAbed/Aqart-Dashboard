
import { useState } from "react";

export const useMultipleChecked = (initialIndexes: number[] = []) => {
  const [checkedIndexes, setCheckedIndexes] =
    useState<number[]>(initialIndexes);

  const handleCheck = (index: number) => {
    setCheckedIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  return {
    checkedIndexes,
    handleCheck,
  };
};

export default useMultipleChecked;

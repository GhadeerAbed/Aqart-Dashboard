
import {useState} from 'react'

export const useSingleChecked  = (initialIndex:number|null = null) => {
    const [checkedIndex, setCheckedIndex] = useState<number | null>(initialIndex);
    const handleCheck = (index: number) => {
        setCheckedIndex(index);
      };
  return {checkedIndex,handleCheck}
}

export default useSingleChecked 
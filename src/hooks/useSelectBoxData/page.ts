
import { useState, useEffect } from "react";
import { useSWRHook } from "@/hooks/page"; // Assuming you have a custom hook for SWR

export const useSelectBoxData = (apiUrl: string | null) => {
  const [options, setOptions] = useState([]);
  const { data, error } = useSWRHook(apiUrl);

  useEffect(() => {
    if (data) {
      // Assuming your API returns an array of options with 'label' and 'value' fields
      const fetchedOptions = data.map((item:any) => ({
        label: item.name,
        value: item.id,
      }));
      setOptions(fetchedOptions);
    }
  }, [data]);

  return { options, error };
};

export default useSelectBoxData;

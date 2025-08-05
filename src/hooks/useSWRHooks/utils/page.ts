import axios from "../../../lib/axios/page";
import { fetcherParametersType, fetcherType } from "../types/page";
import { getAuthData } from "../../../utils/page";

export const fetcher: fetcherType = async ([
  url,
  method,
  options,
]: fetcherParametersType) => {
  const authData = getAuthData(); 
  const accessToken = authData?.token || "";

  try {
    const response = await axios({
      url,
      method,
      ...options,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
/**
 *
 * @param Array [url:string, method:string,options:object]
 * @param Object {body:body}
 * @returns
 */
export const useCustomFetcher = () => {
  const authData = getAuthData(); 
  const accessToken = authData?.token || "";
  const fetcher: fetcherType = async (
    [url, method, options]: fetcherParametersType,
    { arg }: any | undefined
  ) => {
    try {
      const response = await axios({
        url,
        method,
        ...(arg ? arg : options),
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return response.data;
    } catch (error) {
      return error;
    }
  };
  return fetcher;
};

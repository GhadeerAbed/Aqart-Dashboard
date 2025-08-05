import { AxiosRequestConfig, AxiosResponse } from "../../../lib/axios/page";
export type fetcherParametersType = [
  url: string,
  method: AxiosRequestConfig["method"],
  options?: AxiosRequestConfig,
];
export type fetcherType = (
  input: fetcherParametersType,
  arg?: any,
) => Promise<AxiosResponse["data"]>;

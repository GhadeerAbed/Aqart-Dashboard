import { useSWRMutation } from "../../../lib/swr/page";
import { useCustomFetcher } from "../utils/page";

export const useSWRMutationHook = (
  url: string,
  method = "get",
  options = {},
  config = {}
) => {
  const fetcher = useCustomFetcher();
  const { trigger, data, error, isMutating } = useSWRMutation(
    [url, method, options],
    fetcher,
    config
  );
  /**
   *  pass the data  (body) to trigger function
   * @param body
   * @returns
   */
  function customTrigger(body: any) {
    const data: null | undefined | any = { data: body };
    return trigger(data);
  }

  return {
    trigger,
    customTrigger,
    data,
    error,
    isMutating,
  };
};

export default useSWRMutationHook;

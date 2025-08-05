import dynamic from "next/dynamic";
import { NoSsrType } from "../types/page";


const NoSsr: NoSsrType = ({ children }) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});

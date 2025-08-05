"use client"
import { LeftLogin, RightLogin } from "./components/page";

export const Login = () => {
  return (
    <div className="w-full flex flex-row max-h-screen bg-white">
      <div className=" w-[50%] py-6 md:px-10 pl-5 max-custom:w-full max-custom:px-20 max-xs:px-0 ">
        <LeftLogin />
      </div>
      <div className={` w-[50%]  py-6 md:px-12 pl-5 max-custom:hidden`}>
        <RightLogin />
      </div>
    </div>
  );
};
export default Login;

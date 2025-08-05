

import { GlobalIcon } from "../../../../lib/@heroicons/page";
import {  login } from "../../../../../public/assests/page";
import Image from 'next/image';

export const RightLogin = () => {
  return (
    <>
      <div className="flex justify-end md:pr-10 pr-5">
        <div className="opacity-[18%] bg-[#1D6A63] w-28 rounded-full py-5 -mr-[100px]"></div>
        <div className="flex items-center space-x-2 text-[#1D6A63] ">
          <GlobalIcon width={25} height={25} />
          <span>English</span>
        </div>
      </div>
      <div className="flex mt-[145px] justify-start md:pl-10">
        <Image src={login} alt="login" />
      </div>
    </>
  );
};

export default RightLogin;

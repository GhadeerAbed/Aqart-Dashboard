import React from "react";

export const LeadSvg = (props:any) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_1873_655"
       mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="currentColor" />
      </mask>
      <g mask="url(#mask0_1873_655)">
        <path
          d="M1.66669 17.5V15.8333H18.3334V17.5H1.66669ZM2.50002 15V9.16667H5.00002V15H2.50002ZM6.66669 15V5H9.16669V15H6.66669ZM10.8334 15V7.5H13.3334V15H10.8334ZM15 15V2.5H17.5V15H15Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default LeadSvg;

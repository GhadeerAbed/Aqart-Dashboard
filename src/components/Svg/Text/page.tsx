import React from "react";

export const TextSvg = (props:any) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_174_5118"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="30"
        height="30"
      >
        <rect width="30" height="30" fill="currentColor" />
      </mask>
      <g mask="url(#mask0_174_5118)">
        <path
          opacity="0.78"
          d="M8.75 25V8.75H2.5V5H18.75V8.75H12.5V25H8.75ZM20 25V15H16.25V11.25H27.5V15H23.75V25H20Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default TextSvg;

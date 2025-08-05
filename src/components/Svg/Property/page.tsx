import React from "react";

export const PropertySvg = (props:any) => {
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
        id="mask0_1873_670"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="currentColor" />
      </mask>
      <g mask="url(#mask0_1873_670)">
        <path
          d="M14.1666 7.5H15.8333V5.83333H14.1666V7.5ZM14.1666 10.8333H15.8333V9.16667H14.1666V10.8333ZM14.1666 14.1667H15.8333V12.5H14.1666V14.1667ZM14.1666 17.5V15.8333H17.5V4.16667H9.99998V5.33333L8.33331 4.125V2.5H19.1666V17.5H14.1666ZM0.833313 17.5V9.16667L6.66665 5L12.5 9.16667V17.5H7.49998V13.3333H5.83331V17.5H0.833313ZM2.49998 15.8333H4.16665V11.6667H9.16665V15.8333H10.8333V10L6.66665 7.04167L2.49998 10V15.8333Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default PropertySvg;

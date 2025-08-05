import React from "react";

export const Checkbox = (props:any) => {
  return (
    <div>
      <label className="checkbox">
        <span className="checkbox__input">
          <input
            type="checkbox"
            name="checked"
            {...props}
          />
          <span className="checkbox__control">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 22"
              aria-hidden="true"
              focusable="false"
              width={13}
              height={13}
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                d="M1.73 12.91l6.37 6.37L22.79 4.59"
              />
            </svg>
          </span>
        </span>
      </label>
    </div>
  );
};

export default Checkbox;

import { forwardRef, useMemo } from "react";
import type { ButtonProps } from "../types/page";
import ButtonLoading from "./ButtonLoading/page";
import { twMerge } from "tailwind-merge";
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      type = "button",
      buttonSize = "medium",
      fullWidth = false,
      loading = false,
      buttonLoadingProps,
      ...rest
    },
    ref
  ) => {
    const classNames = useMemo(() => {
      let buttonClassName = `block bg-backgroundColor hover:bg-opacity-95 transition-colors text-darkSecondary border rounded-full disabled:opacity-50
      
       ${className ?? ""}`;
      // disabled:hover:bg-blue-light
      if (fullWidth) {
        buttonClassName += " w-full";
      }

      if (buttonSize === "large") {
        buttonClassName += " py-4 px-5 text-lg";
      } else if (buttonSize === "small") {
        buttonClassName += " py-2 px-3 text-sm";
      } else {
        buttonClassName += " py-3 px-4 text-sm";
      }

      return { buttonClassName };
    }, [buttonSize, className, fullWidth]);

    return (
      <button
        className={twMerge(
          `${classNames.buttonClassName} ${loading ? " opacity-50" : " "}`,
          className
        )}
        type={type}
        ref={ref}
        {...rest}
      >
        {loading ? <ButtonLoading {...buttonLoadingProps} /> : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

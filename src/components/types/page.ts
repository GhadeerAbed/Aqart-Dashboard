import { ReactNode, HTMLProps, FC } from "react";

export type SizeVariantsType = "small" | "medium" | "large";

type CommonFormElementsType = {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  withoutHelperText?: boolean;
};

type IconsVariantsType = {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export type ButtonLoadingPropsType = {
  loader?: ReactNode;
  loadingText?: string;
  containerClasses?: string;
  loadingTextClasses?: string;
};
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    CommonFormElementsType,
    IconsVariantsType {
  inputClassName?: string;
  inputSize?: SizeVariantsType;
  labelClassName?: string;
  focusableLabel?: boolean;
  handleEndIcon?: Function;
  endIconClassName?: string;
  startIconClassName?: string;
  mask?:any
  
}

export interface SelectWithFeaturesProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    CommonFormElementsType,
    IconsVariantsType {
  options: Array<any>;
}

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  buttonSize?: SizeVariantsType;
  fullWidth?: boolean;
  loading?: boolean | any;
  ref?: React.Ref<HTMLButtonElement>;
  buttonLoadingProps?: ButtonLoadingPropsType;
}

export interface SelectProps
  extends Omit<HTMLProps<HTMLSelectElement>, "label">,
    CommonFormElementsType {
  selectClassName?: string;
  labelClassName?: string;
  selectSize?: SizeVariantsType;
  optionClassName?: string;
  options: any[]; //{ value: string; label: string }
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface HelperTextProps
  extends HTMLProps<HTMLParagraphElement>,
    IconsVariantsType {
  text?: string;
  showContent?: boolean;
}

export type HelperTextType = FC<HelperTextProps>;

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void ;
  totalEntries : number;
  itemsPerPage?:number
};
export type ChildrenProp = {
  children: ReactNode;
};
export interface NoSsrProps extends ChildrenProp {}
export type NoSsrType = FC<NoSsrProps>
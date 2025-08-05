import Link from "next/link";
import { cn } from "../../../utils/page";
import { FC } from "react";

interface NavItemProps {
    href: string;
    icon: JSX.Element;
    title: string;
    isActive: boolean;
  }

export const ExpendedSideList:FC<NavItemProps>= ({title ,href ,isActive ,icon}) => {
  return <li
        className={cn(
            isActive
                ? "bg-primary !text-white"
                : "",
            "hover:bg-primary hover:text-white rounded-full px-3 py-2"
        )}
    >
        <Link
            href={href}
            className="flex flex-row items-center justify-start gap-2"
        >
            {icon}
            <p className="text-[14px]  font-nunito">{title}</p>
        </Link>
    </li>;
};

export default ExpendedSideList;

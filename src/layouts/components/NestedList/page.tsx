import { circle } from "../../../../public/assests/page";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../../utils/page";

export const NestedSideList = ({
  className,
  data,
  setActiveSubMenuItem,
}: {
  className?: string;
  data: any;
  setActiveSubMenuItem:(id: string) => void;
}) => {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {data.map((item: any) => {
        const isActive = pathname === item.href;
        return (
          <li key={item.id} className="pl-8 py-2 ">
            <Link
              onClick={() => setActiveSubMenuItem(item.id)}
              href={item.href}
              className={cn(
                isActive ? "font-[500] " : "hover:font-[500] ",
                "flex flex-row items-center justify-start gap-3 "
              )}
            >
              <Image src={circle} alt="image" />
              <p className="text-[#A7A6A6] text-sm">{item.name}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NestedSideList;

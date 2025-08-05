"use client";
import { useState, useEffect } from "react";
import { cn } from "../../utils/page";
import Link from "next/link";
import { navbarData } from "../../data/page";
import { usePathname } from "next/navigation";
import { ExpendedSide } from "../components/page";
import { arrowr, arrowl } from "../../../public/assests/page";
import Image from "next/image";
import { BigModal } from "@/components/page";
import { SidebarIcon } from "@/lib/@heroicons/page";

export const SideBar = () => {
  const pathname = usePathname();

  const [isSideBarExpended, setSideBarExpended] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("openSubMenus")) || {}
      : {}
  );
  const [activeSubMenuItem, setActiveSubMenuItem] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("activeSubMenuItem")
      : null
  );
  const [isMobile, setIsMobile] = useState(false);

  const handleMouseEnter = () => {
    if (!isSideBarExpended && !isMobile) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isSideBarExpended && !isMobile) {
      setIsHovering(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("openSubMenus", JSON.stringify(openSubMenus));
  }, [openSubMenus]);

  const toggleSubMenu = (menu: any) => {
    setOpenSubMenus((prev: any) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  useEffect(() => {
    if (activeSubMenuItem) {
      localStorage.setItem("activeSubMenuItem", activeSubMenuItem);
    } else {
      localStorage.removeItem("activeSubMenuItem");
    }
  }, [activeSubMenuItem]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 700) {
  //       setSideBarExpended(false);
  //       setIsHovering(false);
  //       setIsMobile(true);
  //     } else {
  //       setIsMobile(false);
  //     }
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <SidebarIcon
        width={30}
        height={30}
        className="ss:hidden fixed top-5 left-5 z-50 cursor-pointer"
        onClick={openModal}
      />

      <aside
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className={cn(
          isSideBarExpended || isHovering ? "w-[265px]" : "min-w-[65px]",
          "max-ss:hidden border-r-1 rounded-2xl shadow-sideShadow transition-all duration-500 ease transform min-h-screen"
        )}
      >
        <div className="mt-24">
          {!isMobile && (
            <button
              className="absolute bg-lightSecondary rounded-full p-[6px] -right-[10px] transition-shadow duration-300 ease-in-out"
              onClick={() => setSideBarExpended((prev) => !prev)}
            >
              {isSideBarExpended ? (
                <Image src={arrowr} alt="image" />
              ) : (
                <Image src={arrowl} alt="image" />
              )}
            </button>
          )}
          <div className="">
            {isSideBarExpended || isHovering ? (
              <ExpendedSide
                openSubMenus={openSubMenus}
                activeSubMenuItem={activeSubMenuItem}
                toggleSubMenu={toggleSubMenu}
                setActiveSubMenuItem={setActiveSubMenuItem}
              />
            ) : (
              <ul className=" flex flex-col justify-center items-center space-y-2 font-[300] !text-darkSecondary transition-shadow duration-300 ease-in-out">
                {navbarData.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li
                      key={item.id}
                      className={cn(
                        isActive ? "bg-primary !text-white" : "",
                        "hover:bg-primary hover:text-white rounded-full p-2"
                      )}
                    >
                      <Link href={item.href}>{item.icon}</Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <BigModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          ModalclassName=" !w-[270px] !rounded-none "
          isSidebar = {true}
        >
          <ExpendedSide
            openSubMenus={openSubMenus}
            activeSubMenuItem={activeSubMenuItem}
            toggleSubMenu={toggleSubMenu}
            setActiveSubMenuItem={setActiveSubMenuItem}
          />
        </BigModal>
      </aside>
    </>
  );
};

export default SideBar;

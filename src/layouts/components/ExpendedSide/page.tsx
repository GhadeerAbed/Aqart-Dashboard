
import { URL_PATHS, agencyProfile, membership ,propertyList ,leads,agents} from "../../../data/page";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../../utils/page";
import {
  AgencyHupSvg,
  AgencyProfileSvg,
  MembershipSvg,
  PropertySvg,
  PropertyListSvg,
  AgentsSvg,
  LeadSvg,
  MarktingSvg,
  ContactsSvg,
} from "../../../components/page";
import { ExpendedSideList, NestedSideList } from "../page";
import ArrowBottomSvg from "../../../components/Svg/ArrowBottom/page";
import ArrowTopSvg from "../../../components/Svg/ArrowTop/page";
import { FC, useEffect, useState } from "react";

interface ExpendedSideProps {
  openSubMenus: { [key: string]: boolean };
  activeSubMenuItem: string | null;
  toggleSubMenu: (menu: string) => void;
  setActiveSubMenuItem: (id: string) => void;
}

export const ExpendedSide: FC<ExpendedSideProps> = ({
  openSubMenus,
  activeSubMenuItem,
  toggleSubMenu,
  setActiveSubMenuItem,
}) => {
  const pathname = usePathname();
  const isActive = (path:string ,subPaths:any[]) => pathname === path || subPaths?.some((subPath) => pathname.startsWith(subPath));


  useEffect(() => {
    if (activeSubMenuItem) {
      localStorage.setItem(activeSubMenuItem, "true");
    } else {
      localStorage.removeItem("profileMenu");
    }
  }, [activeSubMenuItem]);

  return (
    <ul className="flex flex-col justify-center space-y-1 text-darkSecondary  lg:pl-6 pr-2 pl-3 whitespace-nowrap">
      <ExpendedSideList
        title="Agency Hub"
        icon={<AgencyHupSvg />}
        href={URL_PATHS.DASHBOARD.PAGE}
        isActive={isActive(URL_PATHS.DASHBOARD.PAGE,[])}
      />
      <li
        className={cn(
          isActive(URL_PATHS.AGENCY_PROFILE.PAGE,[
            URL_PATHS.AGENCY_PROFILE.DETAILS,
            URL_PATHS.AGENCY_PROFILE.SETTING,
            URL_PATHS.AGENCY_PROFILE.NOTIFICATION,
            URL_PATHS.AGENCY_PROFILE.ACTIVITIES,
          ] )
            ? "bg-primary !text-white"
            : "",
          "hover:bg-primary hover:text-white rounded-full px-3 py-2"
        )}
      >
        <div className="flex flex-row justify-between">
          <Link
            href={URL_PATHS.AGENCY_PROFILE.DETAILS}
            className="flex flex-row items-center justify-start gap-2"
            onClick={() => toggleSubMenu("profileMenu")}
          >
            <AgencyProfileSvg />
            <p className="text-[14px] font-nunito">Agency Profile</p>
          
          <button
            className="bg-lightSecondary rounded-full w-[18px] h-[18px] ml-9 flex justify-center items-center"
          >
            {openSubMenus.profileMenu ? (
              <ArrowTopSvg className="text-primary" />
            ) : (
              <ArrowBottomSvg className="text-primary" />
            )}
          </button>
          </Link>
        </div>
      </li>
      {openSubMenus.profileMenu && (
        <NestedSideList
          data={agencyProfile}
          setActiveSubMenuItem={setActiveSubMenuItem}
        />
      )}
      <li
        className={cn(
          isActive(URL_PATHS.MEMBERSHIP.PAGE ,[
            URL_PATHS.MEMBERSHIP.INVOICES,
            URL_PATHS.MEMBERSHIP.MY_PACKAGE,
            // URL_PATHS.MEMBERSHIP.VIEW_PACKAGES_DETAILS,
          ]) ? "bg-primary !text-white" : "",
          "hover:bg-primary hover:text-white rounded-full px-3 py-2"
        )}
      >
        <div className="flex flex-row justify-between">
          <Link
            href={URL_PATHS.MEMBERSHIP.MY_PACKAGE}
            className="flex flex-row items-center justify-start gap-2"
            onClick={() => toggleSubMenu("membershipMenu")}
          >
            <MembershipSvg />
            <p className="text-[14px] font-nunito">Membership</p>
          
          <button
            className="bg-lightSecondary rounded-full ml-12 w-[18px] h-[18px] flex justify-center items-center"
          >
            {openSubMenus.membershipMenu ? (
              <ArrowTopSvg className="text-primary" />
            ) : (
              <ArrowBottomSvg className="text-primary" />
            )}
          </button>
          </Link>
        </div>
      </li>
      {openSubMenus.membershipMenu && (
        <NestedSideList
          data={membership}
          setActiveSubMenuItem={setActiveSubMenuItem}
        />
      )}

      <ExpendedSideList
        title="Add New Property"
        icon={<PropertySvg />}
        href={URL_PATHS.NEW_PROPERTY.PAGE}
        isActive={isActive(URL_PATHS.NEW_PROPERTY.PAGE,[])}
      /> 

      <li
        className={cn(
          isActive(URL_PATHS.PROPERTY_LIST.PAGE ,[
            URL_PATHS.PROPERTY_LIST.MY_PROPERTIES_LIST,
            URL_PATHS.PROPERTY_LIST.MY_PROPERTIES_STATUS,
          ]) ? "bg-primary !text-white" : "",
          "hover:bg-primary hover:text-white rounded-full px-3 py-2"
        )}
      >
        <div className="flex flex-row justify-between">
          <Link
            href={URL_PATHS.PROPERTY_LIST.MY_PROPERTIES_LIST}
            className="flex flex-row items-center justify-start gap-2"
            onClick={() => toggleSubMenu("propertyListMenu")}
          >
            <PropertyListSvg />
            <p className="text-[14px] font-nunito">My Property List</p>
          
          <button
            className="bg-lightSecondary rounded-full ml-6 w-[18px] h-[18px] flex justify-center items-center"
          >
            {openSubMenus.propertyListMenu ? (
              <ArrowTopSvg className="text-primary" />
            ) : (
              <ArrowBottomSvg className="text-primary" />
            )}
          </button>
          </Link>
        </div>
      </li>
      {openSubMenus.propertyListMenu && (
        <NestedSideList
          data={propertyList}
          setActiveSubMenuItem={setActiveSubMenuItem}
        />
      )}
      {/* <ExpendedSideList
        title="My Property List"
        icon={<PropertyListSvg />}
        href={URL_PATHS.DASHBOARD.PROPERTY_LIST}
        isActive={isActive(URL_PATHS.DASHBOARD.PROPERTY_LIST)}
      /> */}

      {/* <ExpendedSideList
        title="Agents"
        icon={<AgentsSvg />}
        href={URL_PATHS.DASHBOARD.AGENTS}
        isActive={isActive(URL_PATHS.DASHBOARD.AGENTS)}
      />
     
      <ExpendedSideList
        title="Lead / Deals"
        icon={<LeadSvg />}
        href={URL_PATHS.DASHBOARD.LEAD}
        isActive={isActive(URL_PATHS.DASHBOARD.LEAD)}
      /> */}
         <li
        className={cn(
          isActive(URL_PATHS.AGENTS.PAGE,[
            URL_PATHS.AGENTS.ADD_NEW_AGENT,
            URL_PATHS.AGENTS.PERFORMANCE_ANALYSIS,
            URL_PATHS.AGENTS.AGENTS_LIST,
            URL_PATHS.AGENTS.AGENT_EDIT,
          ]) ? "bg-primary !text-white" : "",
          "hover:bg-primary hover:text-white rounded-full px-3 py-2"
        )}
      >
        <div className="flex flex-row justify-between">
          <Link
            href={URL_PATHS.AGENTS.ADD_NEW_AGENT}
            className="flex flex-row items-center justify-start gap-2"
            onClick={() => toggleSubMenu("agentsMenu")}
          >
            <AgentsSvg />
            <p className="text-[14px] font-nunito">Agents</p>
          
          <button
            className="bg-lightSecondary rounded-full ml-[83px] w-[18px] h-[18px] flex justify-center items-center"
          >
            {openSubMenus.agentsMenu ? (
              <ArrowTopSvg className="text-primary" />
            ) : (
              <ArrowBottomSvg className="text-primary" />
            )}
          </button>
          </Link>
        </div>
      </li>
      {openSubMenus.agentsMenu && (
        <NestedSideList
          data={agents}
          setActiveSubMenuItem={setActiveSubMenuItem}
        />
      )}
         <li
        className={cn(
          isActive(URL_PATHS.LEAD.PAGE , [
            URL_PATHS.LEAD.EDIT_LEADS,
            URL_PATHS.LEAD.LEADS_LIST,
            URL_PATHS.LEAD.ADD_NEW_LEAD,
          ]) ? "bg-primary !text-white" : "",
          "hover:bg-primary hover:text-white rounded-full px-3 py-2"
        )}
      >
        <div className="flex flex-row justify-between">
          <Link
            href={URL_PATHS.LEAD.ADD_NEW_LEAD}
            className="flex flex-row items-center justify-start gap-2"
            onClick={() => toggleSubMenu("leadsMenu")}
          >
            <LeadSvg />
            <p className="text-[14px] font-nunito">Lead / Deals</p>
          
          <button
            className="bg-lightSecondary rounded-full ml-12 w-[18px] h-[18px] flex justify-center items-center"
          >
            {openSubMenus.leadsMenu ? (
              <ArrowTopSvg className="text-primary" />
            ) : (
              <ArrowBottomSvg className="text-primary" />
            )}
          </button>
          </Link>
        </div>
      </li>
      {openSubMenus.leadsMenu && (
        <NestedSideList
          data={leads}
          setActiveSubMenuItem={setActiveSubMenuItem}
        />
      )}
        
      <ExpendedSideList
        title="Agency Contacts"
        icon={<ContactsSvg />}
        href={URL_PATHS.DASHBOARD.AGENCY_CONTACTS}
        isActive={isActive(URL_PATHS.DASHBOARD.AGENCY_CONTACTS ,[])}
      />

      <ExpendedSideList
        title="Marketing Hub"
        icon={<MarktingSvg />}
        href={URL_PATHS.DASHBOARD.MARKETING_HUP}
        isActive={isActive(URL_PATHS.DASHBOARD.MARKETING_HUP,[])}
      />
    </ul>
  );
};

export default ExpendedSide;

"use client"
import CategoryCard from "@/components/CategoryCard/page";
import {
  User2Icon,
  User1Icon,
  UserIcon,
  User4Icon,
  User3Icon,
} from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook } from "@/hooks/page";
import React from "react";

interface chartProp {
  className?: string;
}




const PackageChart: React.FC<chartProp> = ({ className }) => {
  const { data: AgentNumber } = useSWRHook(API_SERVICES_URLS.GET_NUM_AGENT);
  const { data: FeatureNumber } = useSWRHook(API_SERVICES_URLS.GET_NUM_FEATURE);
  const { data: AgencyNumber } = useSWRHook(API_SERVICES_URLS.GET_NUM_AGENCY);
  const { data: AdminNumber } = useSWRHook(API_SERVICES_URLS.GET_NUM_ADMIN);
  const { data: ListNumber } = useSWRHook(API_SERVICES_URLS.GET_NUM_LISTING);

  return (
    <div className={`grid grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] gap-3 mt-5 mr-10 max-custom:my-5 ${className}`}>
      <CategoryCard
        icon={<UserIcon className="text-teal-500" />}
        category="ADMIN"
        count={AdminNumber?.data?.data || 0}
        total={AdminNumber?.data?.total || 0}
        color="#17AA9D"
        bg_color="bg-[#AFF5EE]"
      />
      <CategoryCard
        icon={<User1Icon className="text-[#AF4A4E]" />}
        category="MANAGER"
        count={AgencyNumber?.data?.data || 0}
        total={AgencyNumber?.data?.total || 0}
        color="#17AA9D"
        bg_color="bg-[#FFE8E9]"
      />
      <CategoryCard
        icon={<User2Icon className="text-[#968421]" />}
        category="AGENTS"
        count={AgentNumber?.data?.data || 0}
        total={AgentNumber?.data?.total || 0}
        color="#17AA9D"
        bg_color="bg-[#F9F3D3]"
      />
      <CategoryCard
        icon={<User3Icon className="text-[#36668C]" />}
        category="LISTINGS"
        count={ListNumber?.data?.data || 0}
        total={ListNumber?.data?.total || 0}
        color="#17AA9D"
        bg_color="bg-[#DDF0FF]"
      />
      <CategoryCard
        icon={<User4Icon className="text-[#48519D] " />}
        category="FEATURED"
        count={FeatureNumber?.data?.data || 0}
        total={FeatureNumber?.data?.total || 0}
        color="#17AA9D"
        bg_color="bg-[#C5CBFF]"
      />
    </div>
  );
};

export default PackageChart;


export const URL_PATHS = {
  HOME: "/",
  DASHBOARD: {
    PAGE: "/dashboard",
    MARKETING_HUP:"/dashboard/marketing_hub",
    AGENCY_CONTACTS:"/dashboard/agency_contacts",

  },
  AGENCY_PROFILE: {
    PAGE: "/dashboard/agency_profile",
    DETAILS:"/dashboard/agency_profile/details",
    SETTING:"/dashboard/agency_profile/setting",
    NOTIFICATION:"/dashboard/agency_profile/notification",
    ACTIVITIES:"/dashboard/agency_profile/activities",
  },
  MEMBERSHIP:{
    PAGE: "/dashboard/membership",
    INVOICES:"/dashboard/membership/invoices",
    MY_PACKAGE:"/dashboard/membership/my_package",
    // VIEW_PACKAGES_DETAILS:"/dashboard/membership/view_packages_details",
  },
  NEW_PROPERTY:{
    PAGE: "/dashboard/new_property",
  },
  PROPERTY_LIST:{
    PAGE :"/dashboard/property_list",
    MY_PROPERTIES_LIST:"/dashboard/property_list/my_properties_list",
    MY_PROPERTIES_STATUS:"/dashboard/property_list/my_properties_status",
  },
  AGENTS:{
  PAGE:"/dashboard/agents",
  ADD_NEW_AGENT:"/dashboard/agents/add_new_agent",
  PERFORMANCE_ANALYSIS:"/dashboard/agents/performance_analysis",
  AGENTS_LIST:"/dashboard/agents/agents_list",
  AGENT_EDIT:"/dashboard/agents/edit_agent_profile"
  },

  LEAD:{
    PAGE:"/dashboard/lead",
    EDIT_LEADS :"/dashboard/lead/edit_leads",
    LEADS_LIST:"/dashboard/lead/leads_list",
    ADD_NEW_LEAD:"/dashboard/lead/add_new_lead"
  }
 
}as const

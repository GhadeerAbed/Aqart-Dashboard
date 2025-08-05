
import { URL_PATHS } from "../routes/page";
import { AgencyHupSvg ,AgencyProfileSvg ,MembershipSvg,PropertySvg ,PropertyListSvg ,AgentsSvg ,LeadSvg ,MarktingSvg ,ContactsSvg} from "../../components/page";
// import { Url } from 'next/dist/shared/lib/router/router';


export const navbarData = [
  {
    id: 1,
    name: "Home",
    icon: <AgencyHupSvg/>,
    href: URL_PATHS.DASHBOARD.PAGE,
  },
  {
    id: 2,
    name: "Home",
    icon: <AgencyProfileSvg/>,
    href: URL_PATHS.AGENCY_PROFILE.PAGE,
  },
  {
    id: 3,
    name: "Home",
    icon: <MembershipSvg/>,
    href: URL_PATHS.MEMBERSHIP.PAGE,
  },
  {
    id: 4,
    name: "Home",
    icon: <PropertySvg/>,
    href: URL_PATHS.NEW_PROPERTY.PAGE,
  },
  {
    id: 5,
    name: "Home",
    icon: <PropertyListSvg/>,
    href: URL_PATHS.PROPERTY_LIST.PAGE,
  },
  {
    id: 6,
    name: "Home",
    icon: <AgentsSvg/>,
    href: URL_PATHS.AGENTS.PAGE,
  },
  {
    id: 7,
    name: "Home",
    icon: <LeadSvg/>,
    href: URL_PATHS.LEAD.PAGE,
  },
  {
    id: 8,
    name: "Home",
    icon: <MarktingSvg/>,
    href: URL_PATHS.DASHBOARD.MARKETING_HUP,
  },
  {
    id: 9,
    name: "Home",
    icon: <ContactsSvg/>,
    href: URL_PATHS.DASHBOARD.AGENCY_CONTACTS,
  },
];

export const agencyProfile = [
    {
      id:1,
      name:"Profile Details",
      href:URL_PATHS.AGENCY_PROFILE.DETAILS
    },
    {
      id:2,
      name:"Settings",
      href:URL_PATHS.AGENCY_PROFILE.SETTING
    },
    {
      id:3,
      name:"Notifications",
      href:URL_PATHS.AGENCY_PROFILE.NOTIFICATION
    },
    {
      id:4,
      name:"Activities",
      href:URL_PATHS.AGENCY_PROFILE.ACTIVITIES
    },

]

export const membership = [
  {
    id:1,
    name:"My package",
    href:URL_PATHS.MEMBERSHIP.MY_PACKAGE
  },
  {
    id:2,
    name:"Invoices",
    href:URL_PATHS.MEMBERSHIP.INVOICES
  },
]
export const propertyList = [
  {
    id:1,
    name:"My Properties List",
    href:URL_PATHS.PROPERTY_LIST.MY_PROPERTIES_LIST
  },
  {
    id:2,
    name:"My Properties Status",
    href:URL_PATHS.PROPERTY_LIST.MY_PROPERTIES_STATUS
  },
]

export const agents = [
  {
    id:3,
    name:"Add New Agent",
    href:URL_PATHS.AGENTS.ADD_NEW_AGENT
  },
  {
    id:1,
    name:"Performance Analysis",
    href:URL_PATHS.AGENTS.PERFORMANCE_ANALYSIS
  },
  {
    id:2,
    name:"Agents List",
    href:URL_PATHS.AGENTS.AGENTS_LIST
  },
  // {
  //   id:3,
  //   name:"Edit Agent Profile",
  //   href:URL_PATHS.AGENTS.AGENT_EDIT
  // },
]

export const leads = [
  {
    id:1,
    name:"Add New Lead",
    href:URL_PATHS.LEAD.ADD_NEW_LEAD
  },
  {
    id:2,
    name:"Leads List",
    href:URL_PATHS.LEAD.LEADS_LIST
  },
  // {
  //   id:3,
  //   name:"View / Edit Leads",
  //   href:URL_PATHS.LEAD.EDIT_LEADS
  // },
]
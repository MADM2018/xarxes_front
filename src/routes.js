import Dashboard from "views/Dashboard/Dashboard.jsx";
import Analytics from "views/Analytics/Analytics.jsx";
import Maps from "views/Maps/Maps.jsx";
import Info from "views/Info/Info.jsx";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import Place from "@material-ui/icons/Place";

import InfoIcon from "@material-ui/icons/Info";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/analytics",
    name: "Analytics",
    rtlName: "لوحة القيادة",
    icon: TrendingUpIcon,
    component: Analytics,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "لوحة القيادة",
    icon: Place,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/info",
    name: "Info",
    rtlName: "لوحة القيادة",
    icon: InfoIcon,
    component: Info,
    layout: "/admin"
  }
];
export default dashRoutes;

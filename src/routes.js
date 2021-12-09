import Dashboard from "views/Dashboard.js";
import Users from "components/users";
import Prescriptions from "components/prescriptions";
import Patients from "components/patients";
import Drugs from "components/drugs";
import Consulting from "components/consulting";
import Points from "components/points";
import Lookup from "components/lookup";
import PrescriptionForm from "./components/prescriptions/prescriptionform";
import PatientForm from "components/patients/patienform";
import Login from "components/auth/login";
import LookupForm from "components/lookup/lookupform";
import drugForm from "components/drugs/drugForm";
import pointsform from "components/points/pointsform";
import consultForm from "components/consulting/consultForm";
import userform from "components/users/userform";
import roles from "components/roles";
import roleForm from "components/roles/roleForm";
import PatientDetail from "components/patients/patientdetail";
import guidelines from "components/guidelines";
import guidelinesForm from "components/guidelines/guidelinesForm";
import pharmacy from "components/pharmacy";
import voucher from "components/voucher";
import voucherform from "components/voucher/voucherform";
import mypharmacy from "components/pharmacy/mypharmacy";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    show: true,
  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-diamond",
    component: Users,
    layout: "/admin",
    show: true,
  },
  {
    path: "/user/register",
    component: userform,
    layout: "/admin",
    show: false,
  },
  {
    path: "/user/edit",
    component: userform,
    layout: "/admin",
    show: false,
  },
  {
    path: "/prescriptions",
    name: "Prescriptions",
    icon: "nc-icon nc-pin-3",
    component: Prescriptions,
    layout: "/admin",
    show: true,
  },
  {
    path: "/prescription/edit",
    component: PrescriptionForm,
    layout: "/admin",
    show: false,
  },
  {
    path: "/patients",
    name: "Patients",
    icon: "nc-icon nc-bell-55",
    component: Patients,
    layout: "/admin",
    show: true,
  },
  {
    path: "/patient/add",
    component: PatientForm,
    layout: "/admin",
    show: false,
  },

  {
    path: "/patient/edit",
    component: PatientForm,
    layout: "/admin",
    show: false,
  },

  {
    path: "/pharmacies",
    name: "Pharmacies",
    icon: "nc-icon nc-bell-55",
    component: pharmacy,
    layout: "/admin",
    show: true,
  },
  {
    path: "/pharmacy/add",
    component: PatientForm,
    layout: "/admin",
    show: false,
  },

  {
    path: "/pharmacy/mypharmacy",
    component: mypharmacy,
    layout: "/admin",
    show: false,
  },

  {
    path: "/pharmacy/edit",
    component: PatientForm,
    layout: "/admin",
    show: false,
  },
  {
    path: "/patient/detail",
    component: PatientDetail,
    layout: "/admin",
    show: false,
  },
  {
    path: "/drugs",
    name: "Drugs",
    icon: "nc-icon nc-single-02",
    component: Drugs,
    layout: "/admin",
    show: true,
  },
  {
    path: "/drug/add",
    component: drugForm,
    layout: "/admin",
    show: false,
  },
  {
    path: "/drug/edit",
    component: drugForm,
    layout: "/admin",
    show: false,
  },

  {
    path: "/guidelines",
    name: "Guidelines",
    icon: "nc-icon nc-bell-55",
    component: guidelines,
    layout: "/admin",
    show: true,
  },
  {
    path: "/guideline/add",
    component: guidelinesForm,
    layout: "/admin",
    show: false,
  },

  {
    path: "/guideline/edit",
    component: guidelinesForm,
    layout: "/admin",
    show: false,
  },

  {
    path: "/vouchers",
    name: "Vouchers",
    icon: "nc-icon nc-single-02",
    component: voucher,
    layout: "/admin",
    show: true,
  },
  {
    path: "/voucher/add",
    component: voucherform,
    layout: "/admin",
    show: false,
  },
  {
    path: "/voucher/edit",
    component: voucherform,
    layout: "/admin",
    show: false,
  },

  {
    path: "/consults",
    name: "Consults",
    icon: "nc-icon nc-tile-56",
    component: Consulting,
    layout: "/admin",
    show: true,
  },
  {
    path: "/consult/post",
    component: consultForm,
    layout: "/admin",
    show: false,
  },
  {
    path: "/consult/edit",
    component: consultForm,
    layout: "/admin",
    show: false,
  },
  {
    path: "/points",
    name: "Points",
    icon: "nc-icon nc-tile-56",
    component: Points,
    layout: "/admin",
    show: true,
  },
  {
    path: "/point/add",
    component: pointsform,
    layout: "/admin",
    show: false,
  },
  {
    path: "/point/edit",
    component: pointsform,
    layout: "/admin",
    show: false,
  },
  {
    path: "/lookups",
    name: "Lookup",
    icon: "nc-icon nc-caps-small",
    component: Lookup,
    layout: "/admin",
    show: true,
  },

  {
    path: "/lookup/add",
    component: LookupForm,
    layout: "/admin",
    show: false,
  },
  {
    path: "/lookup/edit",
    component: LookupForm,
    layout: "/admin",
    show: false,
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-caps-small",
    component: Login,
    layout: "/auth",
    show: false,
  },
  {
    path: "/roles",
    name: "Roles",
    icon: "nc-icon nc-bell-55",
    component: roles,
    layout: "/admin",
    show: true,
  },
  {
    path: "/role/add",
    component: roleForm,
    layout: "/admin",
    show: false,
  },

  {
    path: "/role/edit",
    component: roleForm,
    layout: "/admin",
    show: false,
  },
];
export default routes;

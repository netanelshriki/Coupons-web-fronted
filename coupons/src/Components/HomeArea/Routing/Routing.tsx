import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Layout from "../../EmployeeArea/Layout/Layout";
import Cards from "../Cards/Cards";
import Papering from "../Papering/Papering";
import "./Routing.css";
import Information from "../Information/Information";
import AddCustomer from "../../EmployeeArea/AddCustomer/AddCustomer";
import EditCustomer from "../../EmployeeArea/EditCustomer/EditCustomer";
import AllCompanies from "../../EmployeeArea/AllCompanies/AllCompanies";
import CompanyPlace from "../../CompanyArea/CompanyPlace/CompanyPlace";
import CustomerCoupons from "../../CustomerArea/CustomerCoupons/CustomerCoupons";
import CustomerDetails from "../../CustomerArea/CustomerDetails/CustomerDetails";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import CompanyAdvanced from "../../CompanyArea/CompanyAdvanced/CompanyAdvanced";
import CouponsCategory from "../../CompanyArea/CouponsCategory/CouponsCategory";
import Coupons from "../Coupons/Coupons";
import AddCompany from "../../EmployeeArea/AddCompany/AddCompany";
import EditCompany from "../../EmployeeArea/EditCompany/EditCompany";
import CustomerAdvanced from "../../CustomerArea/CustomerAdvanced/CustomerAdvanced";
import CustomerCategory from "../../CustomerArea/CustomerCategory/CustomerCategory";
import CustomerOptions from "../../CustomerArea/CustomerOptions/CustomerOptions";
import OneCustomer from "../../EmployeeArea/OneCustomer/OneCustomer";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Switch>
        <Route path="/home" component={Cards} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/logout" component={Logout} exact />
        <Route path="/coupons" component={Coupons} exact />
        <Route path="/employee" component={Papering} exact />
        <Route path="/customer" component={AddCustomer} exact />
        <Route path="/editcust/:id" component={EditCustomer} exact />
        <Route path="/editcomp/:id" component={EditCompany} exact />
        <Route path="/customers" component={Layout} exact />
        <Route path="/companies" component={AllCompanies} exact />
        <Route path="/company" component={CompanyPlace} exact />
        <Route path="/more" component={Information} exact />
        <Route path="/area" component={CustomerCoupons} exact />
        <Route path="/customer/details" component={CustomerDetails} exact />
        <Route path="/company/details" component={CompanyDetails} exact />
        <Route path="/company/advanced" component={CompanyAdvanced} exact />
        <Route path="/customer/advanced" component={CustomerAdvanced} exact />
        <Route path="/company/category" component={CouponsCategory} exact />
        <Route path="/customer/category" component={CustomerCategory} exact />
        <Route path="/customer/options" component={CustomerOptions} exact />
        <Route path="/add/company" component={AddCompany} exact />
        <Route path="/find/customer" component={OneCustomer} exact />
        <Route path="/add/coupon" component={AddCoupon} exact />
        <Redirect from="/" to="/home" exact />
      </Switch>
    </div>
  );
}

export default Routing;

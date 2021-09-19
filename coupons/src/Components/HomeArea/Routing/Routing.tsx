import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import AddEmployee from "../../EmployeeArea/AddCustomer/AddCustomer";
import Layout from "../../EmployeeArea/Layout/Layout";
import Cards from "../Cards/Cards";
import EditEmployee from "../../EmployeeArea/EditCustomer/EditCustomer";
import Papering from "../Papering/Papering";
import "./Routing.css";
import Information from "../Information/Information";
import AddCustomer from "../../EmployeeArea/AddCustomer/AddCustomer";
import EditCustomer from "../../EmployeeArea/EditCustomer/EditCustomer";
import AllCompanies from "../../EmployeeArea/AllCompanies/AllCompanies";
import CompanyPlace from "../../CompanyArea/CompanyPlace/CompanyPlace";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Switch>
        <Route path="/home" component={Cards} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/logout" component={Logout} exact />
        <Route path="/employee" component={Papering} exact />
        <Route path="/customer" component={AddCustomer} exact />
        <Route path="/editcust/:id" component={EditCustomer} exact />
        <Route path="/customers" component={Layout} exact />
        <Route path="/companies" component={AllCompanies} exact />
        <Route path="/company" component={CompanyPlace} exact />
        <Route path="/more" component={Information} exact />
        <Redirect from="/" to="/home" exact />
      </Switch>
    </div>
  );
}

export default Routing;

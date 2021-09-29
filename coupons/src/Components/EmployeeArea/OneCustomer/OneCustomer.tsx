import { Input, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import Coupon from "../../../UserModel/Coupon";
import UserModel from "../../../UserModel/UserModel";
import store from "../../Redux/Store";
import "./OneCustomer.css";



function OneCustomer(): JSX.Element {

    // const [text, setText] = useState({txt:""});
const [customer, setCustomer] = useState<UserModel[]>(store.getState().employeeState.employees);
const [coupon, setCoupon] = useState<Coupon[]>(store.getState().couponsState.coupons)
// const handleChange = e => 
//     setText({ ...text,[e.target.name]: e.target.value});
useEffect(() => {
  
   setCustomer(store.getState().employeeState.employees);
   
});

console.log("coupon: ",coupon[0]);

console.log("customer: ",customer[0]);
    
const res = customer.map((custom)=>{
    return (
   <>
        <span key={custom.id}>{custom.email}</span>
        <br/>
        </>

)});

return (
      
      <div className="OneCustomer">
		  
        <TextField
          id="filled-read-only-input"
   
          variant="filled"
       
        />
<br/>

        <span>
         
    
        {customer && res}
         
        </span>
        </div>
    );
}

export default OneCustomer;

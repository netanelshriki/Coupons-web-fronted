import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/interceptor";
import notify from "../../../Services/Notifilcation";
import Coupon from "../../../UserModel/Coupon";
import Customer from "../../../UserModel/Customer";
import store from "../../Redux/Store";
import "./CustomerDetails.css";



function CustomerDetails(): JSX.Element {
  
    const [gets, setGet] = useState<Customer>();
    const history = useHistory();
      const cust = useState(store.getState().authState.client);
      const [coupon, setCoupon] = useState<Coupon[]>(store.getState().couponsState.coupons)

      
      useEffect(() => {
          if (!store.getState().authState.client) {
            notify.error("please login");
            history.push("/login");
          }
  
      const axiosGet = async () => {
        // "http://localhost:8080/customer/details/",
          const response = await tokenAxios.get<Customer>(
        globals.urls.customers+"details/",
             {
              params: {
                  customerId: cust[0].id,
              }
             } );
          setGet(response.data);
        
        };
        axiosGet();
      },[]);


 console.log(gets);
 console.log("coupon: ",coupon[0]);


    return (
       
       <>
       <Table className="Table" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">first name</TableCell>
                    <TableCell align="right"> last name</TableCell>
                    <TableCell align="right">email</TableCell>
                    <TableCell align="right">password</TableCell>
                       
                  </TableRow>
                </TableHead>
                <TableBody >
         
         <TableRow>
           <TableCell align="right">{gets?.id}</TableCell>
           <TableCell align="right">{gets?.firstName}</TableCell>
           <TableCell align="right">{gets?.lastName}</TableCell>
           <TableCell align="right">{gets?.email}</TableCell>
           <TableCell align="right">{gets?.password}</TableCell>
       
      
         </TableRow>
       </TableBody>    
                </Table>

              
              
        </>
    );
}

export default CustomerDetails;

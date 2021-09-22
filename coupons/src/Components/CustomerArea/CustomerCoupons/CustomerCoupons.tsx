import { Table, TableBody, TableCell, TableHead, TableRow ,IconButton } from "@material-ui/core";
import {  useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import tokenAxios from "../../../Services/interceptor";
import notify from "../../../Services/Notifilcation";
import Coupon from "../../../UserModel/Coupon";
import store from "../../Redux/Store";
import "./CustomerCoupons.css";
import DeleteIcon from '@material-ui/icons/Delete';



function CustomerCoupons(): JSX.Element {

    const [gets, setGet] = useState<Coupon[]>([]);
  const history = useHistory();
    const customer = useState(store.getState().authState.client);

    
    useEffect(() => {
        if (!store.getState().authState.client) {
          notify.error("please login");
          history.push("/login");
        }

    const axiosGet = async () => {
                 
        const response = await tokenAxios.get<Coupon[]>(
          "http://localhost:8080/customer/coupons",
           {
            params: {
                customerId: customer[0].id,
            }
           } );
        setGet(response.data);
      };
      axiosGet();
    },[]);

    const result = gets.map((get) => {
        return (
       
            <TableRow key={get.id}>
              <TableCell>{get.id} </TableCell>
              <TableCell align="right">{get.category}</TableCell>
              <TableCell align="right">{get.title}</TableCell>
              <TableCell align="right">{get.description}</TableCell>
              <TableCell align="right">{get.startDate}</TableCell>
              <TableCell align="right">{get.endDate}</TableCell>
              <TableCell align="right">{get.amount}</TableCell>
              <TableCell align="right">{get.price}</TableCell>
              <TableCell align="right">{get.image}</TableCell>
          
            </TableRow>
      
        );
      });




    return (
        <>
        <Table className="Table" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right"> category&nbsp;</TableCell>
                    <TableCell align="right">title&nbsp;</TableCell>
                    <TableCell align="right">description&nbsp;</TableCell>
                    <TableCell align="right">startDate&nbsp;</TableCell>
                    <TableCell align="right">endDate&nbsp;</TableCell>
                    <TableCell align="right">amount&nbsp;</TableCell>
                    <TableCell align="right">price&nbsp;</TableCell>
                    <TableCell align="right">image&nbsp;</TableCell>
                 
                     
                  </TableRow>
                </TableHead>
                <TableBody>
                {gets && result}
                </TableBody>
                </Table>
    
             
    

<br/>
<br/>
<br/>
<br/>

        </>
    );
}

export default CustomerCoupons;

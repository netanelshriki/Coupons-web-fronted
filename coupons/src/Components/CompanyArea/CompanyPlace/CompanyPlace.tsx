import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import tokenAxios from "../../../Services/interceptor";
import notify from "../../../Services/Notifilcation";

import store from "../../Redux/Store";
import "./CompanyPlace.css";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Coupon from "../../../UserModel/Coupon";


function CompanyPlace(): JSX.Element {
  
  const [gets, setGet] = useState<Coupon[]>([]);
    const history = useHistory();
    const company = useState(store.getState().authState.client);
    const token = useState(store.getState().authState.client.token);


    useEffect(() => {
        if (!store.getState().authState.client) {
          notify.error("please login");
          history.push("/login");
        }


        const axiosGet = async () => {
                 
          const response = await tokenAxios.get<Coupon[]>(
            "http://localhost:8080/company/coupons",
             {
              params: {
                companyID: company[0].id,
              }
             } );
          setGet(response.data);
       
        };
        axiosGet();
      }, []);

const result = gets.map((get) => {
  return (
   
   <TableBody key={get.id} >
      <TableRow>
        <TableCell>{get.id} </TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <TableCell align="right">{get.companyID}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <TableCell align="right">{get.category}</TableCell>&nbsp;
        <TableCell align="right">{get.title}</TableCell>
        <TableCell align="right">{get.description}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <TableCell align="right">{get.startDate}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <TableCell align="right">{get.endDate}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <TableCell align="right">{get.amount}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <TableCell align="right">{get.price}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <TableCell align="right">{get.image}</TableCell>
      
      </TableRow>
    </TableBody>
  );
});

   
    return (
    <>
    <Table className="Table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">company id</TableCell>
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
            </Table>

            {gets && result}

    </>
    );
}

export default CompanyPlace;

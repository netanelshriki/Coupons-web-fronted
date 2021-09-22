import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import tokenAxios from "../../../Services/interceptor";
import notify from "../../../Services/Notifilcation";
import CompanyModel from "../../../UserModel/CompanyModel";
import store from "../../Redux/Store";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {
    const [gets, setGet] = useState<CompanyModel>();
    const history = useHistory();
      const cust = useState(store.getState().authState.client);
  
      
      useEffect(() => {
          if (!store.getState().authState.client) {
            notify.error("please login");
            history.push("/login");
          }
  
      const axiosGet = async () => {
                   
          const response = await tokenAxios.get<CompanyModel>(
            "http://localhost:8080/company/details/",
             {
              params: {
                companyID: cust[0].id,
              }
             } );
          setGet(response.data);
        
        };
        axiosGet();
      },[]);


 console.log(gets);

    return (
       
       <>
       <Table className="Table" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">first name</TableCell>
                    <TableCell align="right">email</TableCell>
                    <TableCell align="right">password</TableCell>
                       
                  </TableRow>
                </TableHead>
                <TableBody >
         
         <TableRow>
           <TableCell align="right">{gets?.id}</TableCell>
           <TableCell align="right">{gets?.firstName}</TableCell>
           <TableCell align="right">{gets?.email}</TableCell>
           <TableCell align="right">{gets?.password}</TableCell>
       
      
         </TableRow>
       </TableBody>    
                </Table>

                  </>
    )
}

export default CompanyDetails;

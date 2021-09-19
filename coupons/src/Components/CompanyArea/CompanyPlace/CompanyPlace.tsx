import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import tokenAxios from "../../../Services/interceptor";
import notify from "../../../Services/Notifilcation";
import CompanyModel from "../../../UserModel/CompanyModel";
import UserModel from "../../../UserModel/UserModel";
import store from "../../Redux/Store";
import "./CompanyPlace.css";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";


function CompanyPlace(): JSX.Element {
    const [gets, setGet] = useState<CompanyModel>();
    const history = useHistory();
    const company = useState(store.getState().authState.client);
  
    useEffect(() => {
        if (!store.getState().authState.client) {
          notify.error("please login");
          history.push("/login");
        }
        const axiosGet = async () => {
            console.log("comapny: "+company)
          const response = await tokenAxios.get<CompanyModel>(
            "http://localhost:8080/company/"+company
          );
          setGet(response.data);
        };
        axiosGet();
      }, [gets]);




   
    return (
        <div className="CompanyPlace">
			  <Table className="Table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">first name</TableCell>
            <TableCell align="right">last name</TableCell>
            <TableCell align="right"> Email&nbsp;</TableCell>
            <TableCell align="right">Password&nbsp;</TableCell>
            <TableCell align="right">ClientType&nbsp;</TableCell>
            <TableCell align="right">Action&nbsp;</TableCell>
          </TableRow>
        </TableHead>

        {/* {gets && res} */}

         <TableBody>
            <TableRow>
            
              {/* <TableCell align="right">{company.firstName}</TableCell>
              <TableCell align="right">{company.lastName}</TableCell>
              <TableCell align="right">{company.email}</TableCell>
              <TableCell align="right">{company.password}</TableCell>
              <TableCell align="right">{company.clientType}</TableCell> */}
              
              <TableCell align="right">
                <Button>
                  <CreateIcon  />
                </Button>
                <Button>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
      </Table> 

{/* <Button onClick={()=>console.log()}>Click</Button> */}
      
        </div>
    );
}

export default CompanyPlace;

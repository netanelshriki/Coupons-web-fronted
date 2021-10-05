import "./AllCompanies.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

import notify from "../../../Services/Notifilcation";
import { useHistory } from "react-router-dom";
import store from "../../Redux/Store";
import tokenAxios from "../../../Services/interceptor";
import CompanyModel from "../../../UserModel/CompanyModel";
import globals from "../../../Services/Globals";

function AllCompanies(): JSX.Element {
    const [gets, setGet] = useState<CompanyModel[]>([]);
    const history = useHistory();
  
    useEffect(() => {
        if (!store.getState().authState.client) {
          notify.error("please login");
          history.push("/login");
        }
        const axiosGet = async () => {
          // "http://localhost:8080/admin/companies"
          const response = await tokenAxios.get<CompanyModel[]>(
           globals.urls.admin+"companies"
          );
          setGet(response.data);
        };
        axiosGet();
      }, [gets]);
    
      function deletePost(id) {
        // "http://localhost:8080/admin/companies/"
        tokenAxios
          .delete<any>(globals.urls.admin+"companies/" + id)
          .then(() => {
            notify.success("Company deleted!");
            setGet([]);
          });
      }
    
      function updatePost(id) {
        console.log(id);
        history.push("/editcomp/" + id);
    
      }
    
      const res = gets.map((get) => {
        return (
          <TableBody key={get.id}>
            <TableRow>
              <TableCell>{get.id} </TableCell>
              <TableCell align="right">{get.firstName}</TableCell>
              <TableCell align="right">{get.email}</TableCell>
              <TableCell align="right">{get.password}</TableCell>
              <TableCell align="right">{get.clientType}</TableCell>
              {/* <TableCell align="right">{get.coupons}</TableCell> */}
              <TableCell align="right">
                <Button>
                  <CreateIcon onClick={() => updatePost(get.id)} />
                </Button>
                <Button>
                  <DeleteIcon onClick={() => deletePost(get.id)} />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        );
      });
    
      return (
        <div className="Layout">
          <Table className="Table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">name</TableCell>
                <TableCell align="right"> Email&nbsp;</TableCell>
                <TableCell align="right">Password&nbsp;</TableCell>
                <TableCell align="right">ClientType&nbsp;</TableCell>
                {/* <TableCell align="right">Coupons&nbsp;</TableCell> */}
                <TableCell align="right">Action&nbsp;</TableCell>
              </TableRow>
            </TableHead>
    
            {gets && res}
          </Table>
        </div>
      );
    }


export default AllCompanies;

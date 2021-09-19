import axios from "axios";
import { useEffect, useState } from "react";
import UserModel from "../../../UserModel/UserModel";
import {
  Button,
  Icon,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

import "./Layout.css";
import notify from "../../../Services/Notifilcation";
import { useHistory } from "react-router-dom";
import store from "../../Redux/Store";
import tokenAxios from "../../../Services/interceptor";

function Layout() {
  const [gets, setGet] = useState<UserModel[]>([]);
  const history = useHistory();

  useEffect(() => {
    if (!store.getState().authState.client) {
      notify.error("please login");
      history.push("/login");
    }
    const axiosGet = async () => {
      const response = await tokenAxios.get<UserModel[]>(
        "http://localhost:8080/admin/customers"
      );
      setGet(response.data);
    };
    axiosGet();
  }, [gets]);

  function deletePost(id) {
    axios
      .delete<any>("http://localhost:8080/admin/customers/" + id)
      .then(() => {
        notify.success("Employee deleted!");
        setGet([]);
      });
  }

  function updatePost(id) {
    console.log(id);
    history.push("/editcust/" + id);
    const result = axios
      .put<any>("http://localhost:8080/admin/customers/update")
      .then(() => {
        notify.success("Customer updated!!");
        setGet([]);
      });
  }

  const res = gets.map((get) => {
    return (
      <TableBody>
        <TableRow>
          <TableCell>{get.id} </TableCell>
          <TableCell align="right">{get.firstName}</TableCell>
          <TableCell align="right">{get.lastName}</TableCell>
          <TableCell align="right">{get.email}</TableCell>
          <TableCell align="right">{get.password}</TableCell>
          <TableCell align="right">{get.clientType}</TableCell>
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
            <TableCell align="right">first name</TableCell>
            <TableCell align="right">last name</TableCell>
            <TableCell align="right"> Email&nbsp;</TableCell>
            <TableCell align="right">Password&nbsp;</TableCell>
            <TableCell align="right">ClientType&nbsp;</TableCell>
            <TableCell align="right">Action&nbsp;</TableCell>
          </TableRow>
        </TableHead>

        {gets && res}
      </Table>
    </div>
  );
}

export default Layout;

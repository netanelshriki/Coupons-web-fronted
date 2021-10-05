import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/interceptor";
import notify from "../../../Services/Notifilcation";
import Coupon from "../../../UserModel/Coupon";
import Customer from "../../../UserModel/Customer";
import store from "../../Redux/Store";
import "./OneCustomer.css";



function OneCustomer(): JSX.Element {

  const [gets, setGet] = useState<Customer>();
  const history = useHistory();
    const cust = useState(store.getState().authState.client);
    const [coupon, setCoupon] = useState<Coupon[]>(store.getState().couponsState.coupons)
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<any>();
    // const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    
    // useEffect(() => {
    //     if (!store.getState().authState.client) {
    //       notify.error("please login");
    //       history.push("/login");
    //     }

        async function send(send: any) {
      

          // "http://localhost:8080/admin/customers/"+send.customerId  
          const response = await tokenAxios.get<Customer>(
            globals.urls.admin+"customers/"+send.customerId
      )
          setGet(response.data);
         
      };

  return (
     
     <>


<>
<form onSubmit={handleSubmit(send)}>
              <TextField
                id="outlined-basic"
                label="max prise"
                variant="outlined"
                type="number"
                {...register("customerId")}
              />
              </form>
<Button
              type="submit"
                variant="contained"
                color="primary"
              >
                Check out
              </Button>
</>



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

export default OneCustomer;

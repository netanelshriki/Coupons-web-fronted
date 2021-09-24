import { TableBody, TableRow, TableCell, Table, TableHead, TextField, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import tokenAxios from "../../../Services/interceptor";
import notify from "../../../Services/Notifilcation";
import CompanyModel from "../../../UserModel/CompanyModel";
import Coupon from "../../../UserModel/Coupon";
import store from "../../Redux/Store";
import "./CompanyAdvanced.css";

function CompanyAdvanced(): JSX.Element {
    
 


    const [gets, setGet] = useState<Coupon[]>([]);
    const history = useHistory();
      const cust = useState(store.getState().authState.client);
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<any>();
     
    


      async function send(send: any) {
      
        console.log(send);

        const byMax = {
            companyId:cust[0].id,
            prize: send.prize
        }
                   
        const response = await tokenAxios.post<Coupon[]>(
          "http://localhost:8080/company/coupon",byMax)
        setGet(response.data);
   
    };

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
{gets.length===0?
    <>
                <form onSubmit={handleSubmit(send)}>
              <TextField
                id="outlined-basic"
                label="max prise"
                variant="outlined"
                type="number"
                {...register("prize")}
              />
              <br/>
              <br/>
                <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Check out
              </Button>
              </form>
              </>
              :
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

                <Button
            onClick={() => history.push("/")}
            variant="contained"
            color="secondary"
          >
            home
          </Button>
             
                </>


}
        </>
    );
}

export default CompanyAdvanced;

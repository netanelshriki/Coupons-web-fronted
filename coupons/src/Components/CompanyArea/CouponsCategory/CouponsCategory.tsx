import { TableBody, TableRow, TableCell, TextField, Button, Table, TableHead, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import tokenAxios from "../../../Services/interceptor";
import Coupon from "../../../UserModel/Coupon";
import store from "../../Redux/Store";
import "./CouponsCategory.css";

function CouponsCategory(): JSX.Element {

    const [gets, setGet] = useState<Coupon[]>([]);
    const history = useHistory();
      const cust = useState(store.getState().authState.client);
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<any>();
      const [open, setOpen] = useState(false);
  const [age, setAge] = useState<string | number>("");

      const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as number);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };

      

      async function send(send: any) {
        
        console.log(store.getState().authState.client);
      if(store.getState().authState.client===null){
        history.push("/login")
      }
        console.log(send);

        const byCategory = {
            companyId:cust[0].id,
            category: send.category
        }
                   
        const response = await tokenAxios.post<Coupon[]>(
          "http://localhost:8080/company/category",byCategory)
        setGet(response.data);
   
    };

    
    // const result = gets.map((get) => {
    //     return (
          
    //       <TableBody key={get.id}>
    //         <TableRow>
    //           <TableCell>{get.id} </TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //           <TableCell align="right">{get.companyID}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //           <TableCell align="right">{get.category}</TableCell>&nbsp;
    //           <TableCell align="right">{get.title}</TableCell>
    //           <TableCell align="right">{get.description}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //           <TableCell align="right">{get.startDate}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //           <TableCell align="right">{get.endDate}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //           <TableCell align="right">{get.amount}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //           <TableCell align="right">{get.price}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //           <TableCell align="right">{get.image}</TableCell>
            
    //         </TableRow>
    //       </TableBody>
    //     );
    //   });

    
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
           
                <FormControl >
                <InputLabel id="demo-controlled-open-select-label">
category                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  defaultValue="category"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  onChange={handleChange}
                  {...register("category", {
                    required: { value: true, message: "Missing User Type" },
                  })}
                >
                  <MenuItem value="">
                    <em>Category:</em>
                  </MenuItem>
                  <MenuItem value="FOOD">FOOD</MenuItem>
                  <MenuItem value="ELECTRICITY">ELECTRICITY</MenuItem>
                  <MenuItem value="RESTAURANT">RESTAURANT</MenuItem>
                  <MenuItem value="VACATION">VACATION</MenuItem>
                </Select>
              </FormControl>

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

export default CouponsCategory;

import {
  TableRow,
  TableCell,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableBody,
} from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import tokenAxios from "../../../Services/interceptor";
import notify from "../../../Services/Notifilcation";
import Coupon from "../../../UserModel/Coupon";
import store from "../../Redux/Store";
import "./CustomerCategory.css";

function CustomerCategory(): JSX.Element {
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
    console.log(send);

    const byCategory = {
      customerId: cust[0].id,
      category: send.category,
    };

    const response = await tokenAxios.post<Coupon[]>(
      "http://localhost:8080/customer/category",
      byCategory
    );
    setGet(response.data);
    if(response.data.length!==0) {
     
      notify.success("found "+response.data.length+" coupons")

    } else {
     
      notify.error("no coupons found in category "+byCategory.category+"!"); 
   
    }
  }

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
      {gets.length === 0 ? (
        <>
          <form onSubmit={handleSubmit(send)}>
            <FormControl>
              <InputLabel id="demo-controlled-open-select-label">
                category{" "}
              </InputLabel>
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
                  <em>Type:</em>
                </MenuItem>
                <MenuItem value="FOOD">FOOD</MenuItem>
                <MenuItem value="ELECTRICITY">ELECTRICITY</MenuItem>
                <MenuItem value="RESTAURANT">RESTAURANT</MenuItem>
                <MenuItem value="VACATION">VACATION</MenuItem>
              </Select>
            </FormControl>

            <br />
            <br />
            <Button type="submit" variant="contained" color="primary">
              Check out
            </Button>
<br/>
<br/>
            <Button
            onClick={() => history.push("/")}
            variant="contained"
            color="secondary"
          >
            home
          </Button>
          
          <br/>
          <br/>


           <Button
            onClick={() => history.goBack()}
            variant="contained"
            color="primary"
          >
            back
          </Button>
          </form>
        </>
      ) : (
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

            <TableBody>{gets && result}</TableBody>
          </Table>

          <br />
          <br />

          <Button
            onClick={() => history.push("/")}
            variant="contained"
            color="secondary"
          >
            home
          </Button>
          
           <Button
            onClick={() => history.goBack()}
            variant="contained"
            color="primary"
          >
            back
          </Button>
        </>
      )}
    </>
  );
}

export default CustomerCategory;

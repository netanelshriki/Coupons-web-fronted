import { FormControl, TextField, Button, Input, Box, Card, CardContent, Typography, makeStyles, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import tokenAxios from "../../../Services/interceptor";
import Coupon from "../../../UserModel/Coupon";
import store from "../../Redux/Store";
import "./AddCoupon.css";
import clsx from "clsx";
import notyf from "notyf/notyf";
import notify from "../../../Services/Notifilcation";
import { error } from "console";
import globals from "../../../Services/Globals";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },

  pos: {
    marginBottom: 0,
    marginLeft: "30%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
 marginLeft: "25%"
  },
  box: {
    marginLeft: "39%",
    maxWidth: "50px",
    marginTop: "70px",
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  btn: {
    marginLeft: theme.spacing(4),
  },
  margin: {
    margin: theme.spacing(1),
    marginLeft: "20px",
  },
  stam:{
  
    marginLeft: theme.spacing(8),

  }
}));


function AddCoupon(): JSX.Element {

    const [company,setCompany] = useState(store.getState().authState.client);
    const [coupon,setCoupon] = useState<Coupon>();
  const {
    register,
    handleSubmit,
    watch,
      formState: { touchedFields }
  } = useForm<Coupon>({
    mode: "onTouched",
  });
  const classes = useStyles();


  const history = useHistory();


 
    useEffect(() => {

    });

  
    async function addCoupon(coupon: Coupon) {
        setCompany(store.getState().authState.client);
        // const start = new Date(coupon.startDate);
        // const end = new Date(coupon.endDate);
        
    console.log(coupon);
    try {
    
      const formData = new FormData();
      
      formData.append("companyID", company.id.toString());
      formData.append("category", coupon.category);
      formData.append("title", coupon.title);
      formData.append("description", coupon.description);
      formData.append("startDate", coupon.startDate.toString());
      formData.append("endDate", coupon.endDate.toString());
      formData.append("amount", coupon.amount.toString());
      formData.append("price", coupon.price.toString());
      formData.append("image", coupon.image?.item(0));

      // "http://localhost:8080/company/coupon",

     const request = await tokenAxios.post<Coupon>(
     globals.urls.company+"coupon",
        
        formData
     
        );

      setCoupon(request.data);
      console.log(request.data);
      history.push("/company");
    } catch (err) {
   
      // notify.error(error.request.message);
    }
  }

  return (
 
    <Box className={classes.box}>
    <div className="Login">
      <Card className={classes.root} square >
        <CardContent>
          <Typography className={classes.pos}>add coupon</Typography>
          <br />
      <form onSubmit={handleSubmit(addCoupon)}>
       
        <>
      

<FormControl
                variant="outlined"
                className={clsx(classes.margin, classes.textField)}
              >
                {" "}
                <InputLabel>category</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="text"
                  {...register("category", { required: true, })}
              
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      ></IconButton>
                    </InputAdornment>
                  }
                  labelWidth={45}
                />
              </FormControl>
              
              <FormControl
                variant="outlined"
                className={clsx(classes.margin, classes.textField)}
              >
                {" "}
                <InputLabel>title</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="text"
                  {...register("title", { required: true,  })}
              
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      ></IconButton>
                    </InputAdornment>
                  }
                  labelWidth={45}
                />
              </FormControl>
              
                <FormControl
                variant="outlined"
                className={clsx(classes.margin, classes.textField)}
              >
                {" "}
                <InputLabel>description</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="text"
                  {...register("description", { required: true, })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      ></IconButton>
                    </InputAdornment>
                  }
                  labelWidth={45}
                />
              </FormControl>     
              
              <FormControl
                variant="outlined"
                className={clsx(classes.margin, classes.textField)}
              >
                {" "}
                <InputLabel></InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="date"
                  {...register("startDate",{ required: true, })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      ></IconButton>
                    </InputAdornment>
                  }
                  labelWidth={45}
                />
              </FormControl>
          
         
           <FormControl
                variant="outlined"
                className={clsx(classes.margin, classes.textField)}
              >
                {" "}
                <InputLabel></InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="date"
                  {...register("endDate",{ required: true, })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      ></IconButton>
                    </InputAdornment>
                  }
                  labelWidth={45}
                />
              </FormControl>
       
       <FormControl
                variant="outlined"
                className={clsx(classes.margin, classes.textField)}
              >
                {" "}
                <InputLabel>amount</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="text"
                  {...register("amount", { required: true,  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      ></IconButton>
                    </InputAdornment>
                  }
                  labelWidth={45}
                />
              </FormControl>   
              
              <FormControl
                variant="outlined"
                className={clsx(classes.margin, classes.textField)}
              >
                {" "}
                <InputLabel>price</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="text"
                  {...register("price", { required: true,  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      ></IconButton>
                    </InputAdornment>
                  }
                  labelWidth={45}
                />
              </FormControl>
              <br />
              <br />

          <Button
  variant="contained"
  component="label"
  className={classes.stam}
>
  Upload File
  <input
    type="file"
    hidden
    {...register("image", { required: true })}
  />
</Button>
          {/* {errors.image?.type==='minLength' && <span>name is too short</span>} */}

          <br />
          <br />
          <Button type="submit" color="primary" variant="contained" 
                      className={classes.btn}

          >
            Add
          </Button>

              <Button
            onClick={() => history.goBack()}
            variant="contained"
            color="secondary"
            className={classes.btn}
          >
            back
          </Button>
        </>
      </form>
      </CardContent>

       
</Card>
</div>
</Box>
  );
}

export default AddCoupon;



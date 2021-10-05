import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import notify from "../../../Services/Notifilcation";
import UserModel from "../../../UserModel/UserModel";
import { EmployeesAddedAction } from "../../Redux/EmployeesSatate";
import "./AddCustomer.css";
import store from "../../Redux/Store";
import { useEffect, useState } from "react";
import tokenAxios from "../../../Services/interceptor";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React from "react";
import clsx from "clsx";
import globals from "../../../Services/Globals";



const useStyles = makeStyles((theme)=>({
root: {
  minWidth: 275,
},
btn: {
  marginLeft: theme.spacing(4),
},
textField: {
  width: "25ch",
},
pos: {
  marginBottom: 0,
  marginLeft: theme.spacing(6),
},

box: {
  marginLeft: "39%",
  maxWidth: "50px",
  marginTop: "40px",
},
stam: {
  marginLeft: "39%",
  marginTop: "30px",
},
odstam: {
  marginLeft: "32%",
  marginTop: " 20px",
},
formControl: {
  margin: theme.spacing(1),
  minWidth: 120,
marginLeft: "25%"
},
margin: {
  margin: theme.spacing(1),
  marginLeft: "20px",
},


}));

function AddEmployee(): JSX.Element {

  useEffect(()=>{
    if(!store.getState().authState.client){
        notify.error("please login");
        history.push("/login")
    }
})



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserModel>();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function send(user: UserModel) {
    try {
      const employeesend = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        clientType: "CUSTOMER",
      };
      // "http://localhost:8080/customer/register",
      const post = await tokenAxios.post<UserModel>(
      globals.urls.customers+"register",
      
     employeesend
      );

      const added = post.data;
      store.dispatch(EmployeesAddedAction(added));

      notify.success("Customer " + user.firstName + " created!");
      history.push("/customers");
    } catch (err) {
   
    }
  }

  return (
  

    <Box className={classes.box}>
    <div>
      
      <Card  className={classes.root} square>
        <CardContent>
          <Typography className={classes.pos}>Add new Customer</Typography>
        
          <br />
          <form onSubmit={handleSubmit(send)}>
            {/* <TextField
              id="outlined-basic"
              label="first name"
              variant="outlined"
              type="firstName"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "your name is required",
                },
                maxLength: {
                  value: 30,
                  message: "your name can not be greater than 30",
                },
                minLength: {
                  value: 2,
                  message: "your name can not be less than 2 chars",
                },
              })}
            />

            <br />
            <FormHelperText error={true}>{errors.firstName?.message}</FormHelperText>
            <br />

            <TextField
              id="outlined-basic"
              label="last name"
              variant="outlined"
              type="lastName"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "your name is required",
                },
                maxLength: {
                  value: 30,
                  message: "your name can not be greater than 30",
                },
                minLength: {
                  value: 2,
                  message: "your name can not be less than 2 chars",
                },
              })}
            />

            <br />
            <FormHelperText error={true}>{errors.lastName?.message}</FormHelperText>
            <br />

            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "your email is required",
                },
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "your email required",
                },
              })}
            />
            <br />
            <FormHelperText error={true}>{errors.email?.message}</FormHelperText>
            <br />
            <TextField
              id="outlined-basic"
              label="password"
              variant="outlined"
              type="password"
              {...register("password", {
                minLength: {
                  value: 5,
                  message: "your password can not be less than 5 chars",
                },
              })}
            />
            <br />
            <FormHelperText error={true}>{errors.password?.message}</FormHelperText> */}

<FormControl
                variant="outlined"
                className={clsx(classes.margin, classes.textField)}
              >
                {" "}
                <InputLabel>First Name</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="text"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "your name is required",
                    },
                    maxLength: {
                      value: 30,
                      message: "your name can not be greater than 30",
                    },
                    minLength: {
                      value: 2,
                      message: "your name can not be less than 2 chars",
                    },
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      ></IconButton>
                    </InputAdornment>
                  }
                  labelWidth={80}
                />
              </FormControl>

              <FormHelperText error={true}>
                {errors.firstName?.message}
              </FormHelperText>

            

              <FormControl
                variant="outlined"
                className={clsx(classes.margin, classes.textField)}
              >
                {" "}
                <InputLabel>Last name</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="text"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "your name is required",
                    },
                    maxLength: {
                      value: 30,
                      message: "your name can not be greater than 30",
                    },
                    minLength: {
                      value: 2,
                      message: "your name can not be less than 2 chars",
                    },
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      ></IconButton>
                    </InputAdornment>
                  }
                  labelWidth={80}
                />
              </FormControl>

              <FormHelperText error={true}>
                {errors.lastName?.message}
              </FormHelperText>

        

              <FormControl
                variant="outlined"
                className={clsx(classes.margin, classes.textField)}
              >
                {" "}
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="email"
                  {...register("email", {
                    minLength: {
                      value: 5,
                      message: "you must insert email",
                    },
                  })}
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

            
              <FormHelperText error={true}>
                {errors.email?.message}
              </FormHelperText>

              
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  onChange={handleChange("password")}
                  {...register("password", {
                    minLength: {
                      value: 5,
                      message: "your password can not be less than 5 chars",
                    },
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>

              <FormHelperText error={true}>
                {errors.password?.message}
              </FormHelperText>
              
          

            <br />
            <Button type="submit" variant="contained" color="primary" className={classes.btn}>
              Add
            </Button>

            <Button onClick={()=>history.goBack()}variant="contained" color="secondary" className={classes.btn}>back</Button>

          </form>
        </CardContent>
        
      </Card>

    </div>
    </Box>
 
  );
}

export default AddEmployee;

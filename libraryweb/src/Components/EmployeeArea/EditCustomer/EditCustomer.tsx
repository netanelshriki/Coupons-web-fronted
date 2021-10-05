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
import clsx from "clsx";

import { useForm } from "react-hook-form";
import { RouteComponentProps, useHistory } from "react-router-dom";
import notify from "../../../Services/Notifilcation";
import { EmployeesUpdatedAction } from "../../Redux/EmployeesSatate";
import { useState } from "react";
import UserModel from "../../../UserModel/UserModel";
import store from "../../Redux/Store";
import Globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/interceptor";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React from "react";

interface RouteParam {
  id: string;
}

interface EditDetailsProps extends RouteComponentProps<RouteParam> {}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  box: {
    marginLeft: "39%",
    maxWidth: "50px",
    marginTop: "0px",
  },
  pos: {
    marginBottom: 0,
    marginLeft: "27%",
  },
  margin: {
    margin: theme.spacing(1),
    marginLeft: "20px",
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
}));

function EditEmployee(props: EditDetailsProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserModel>({});
  const history = useHistory();
  const currentId = +props.match.params?.id;
  const classes = useStyles();

  const [employee, setEmployee] = useState(
    store
      .getState()
      .employeeState.employees.find((c) => c.id === +props.match.params?.id)
  );

  const [client, setClient] = useState(store.getState().authState.client);

  const [customer, setCustomer] = useState();

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

  console.log(employee);

  async function send(user: UserModel) {
    console.log(employee);
    user.id = currentId;
    const customer = {
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      password: user?.password,
      clientType: "CUSTOMER",
    };
    console.log(customer);

    // updating DB
    const response = await tokenAxios.put<UserModel>(
      Globals.urls.admin + "customers",
      customer
    );

    //update global app state
    store.dispatch(EmployeesUpdatedAction(response.data));

    //update local
    setEmployee(
      store
        .getState()
        .employeeState.employees.find((c) => c.id === +props.match.params?.id)
    );

    notify.success("Customer updated!");

    history.push("/customers");
  }

  return (
    <Box className={classes.box}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.pos}>Edit Customer</Typography>
          <br />
          <form onSubmit={handleSubmit(send)}>
            {/* <TextField
                id="outlined-basic"
                label="first name"
                variant="outlined"
                type="text"
                defaultValue={employee.firstName}
                name="firstName"
                {...register("firstName" , {
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
                defaultValue={employee.lastName}
                type="text"
                name="lastName"
                {...register("lastName" , {
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
                defaultValue={employee.email}
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "your email is required",
                  },
                  // pattern: {
                  //   value: /^\S+@\S+$/i,
                  //   message: "your email required",
                  // },
                })}
              />
              <br />
              <FormHelperText error={true}>{errors.email?.message}</FormHelperText>
              <br />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                 defaultValue={employee.password}
                type="password"
                {...register("password", {
                  minLength: {
                    value: 5,
                    message: "your password can not be less than 5 chars",
                  },
                })}
              />
              <br />
              <FormHelperText error={true}>{errors.password?.message}</FormHelperText>
   */}

            <FormControl
              variant="outlined"
              className={clsx(classes.margin, classes.textField)}
            >
              <InputLabel>First name</InputLabel>
              <OutlinedInput
                defaultValue={employee.firstName}
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
                labelWidth={76}
              />
            </FormControl>

            <FormHelperText error={true}>
              {errors.firstName?.message}
            </FormHelperText>

            <br />
            <FormControl
              variant="outlined"
              className={clsx(classes.margin, classes.textField)}
            >
              <InputLabel>last name</InputLabel>
              <OutlinedInput
                defaultValue={employee.lastName}
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
                labelWidth={76}
              />
            </FormControl>

            <FormHelperText error={true}>
              {errors.lastName?.message}
            </FormHelperText>

            <br />

            <FormControl
              variant="outlined"
              className={clsx(classes.margin, classes.textField)}
            >
              {" "}
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                defaultValue={employee.email}
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

            <br />

            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                defaultValue={employee.password}
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
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.btn}
            >
              Edit
            </Button>

            <Button
              onClick={() => history.push("/customers")}
              variant="contained"
              color="secondary"
              className={classes.btn}
            >
              back
            </Button>

            <br />
            <br />
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default EditEmployee;

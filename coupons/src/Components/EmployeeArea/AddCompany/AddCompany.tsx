import "./AddCompany.css";
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
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import clsx from "clsx";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import notify from "../../../Services/Notifilcation";
import UserModel from "../../../UserModel/UserModel";
import { EmployeesAddedAction } from "../../Redux/EmployeesSatate";
import { Alert } from "@material-ui/lab";
import Papering from "../../HomeArea/Papering/Papering";
import { useState } from "react";
import UserAuthModel from "../../../UserModel/UserAuthModel";
import store from "../../Redux/Store";
import { registerAction } from "../../Redux/AuthState";
import CompanyModel from "../../../UserModel/CompanyModel";
import tokenAxios from "../../../Services/interceptor";
import React from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },

  pos: {
    marginBottom: 0,
    marginLeft: "27%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  box: {
    marginLeft: "39%",
    maxWidth: "50px",
    marginTop: "70px",
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

function AddCompany(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyModel>();
  const history = useHistory();
  const classes = useStyles();
  const [age, setAge] = useState<string | number>("");
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

  //   const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //     setAge(event.target.value as number);
  //   };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  async function send(company: CompanyModel) {
    console.log(company);
    const addCompany = {
      firstName: company.firstName,
      email: company.email,
      password: company.password,
      clientType: "COMPANY",
    };

    try {
      const response = await tokenAxios.post<CompanyModel>(
        "http://localhost:8080/admin/companies",
        addCompany
      );

      // store.dispatch(registerAction(response.data));

      notify.success("company added successfully!");
      history.push("/companies");
    } catch (err) {
      notify.error("something went wrong!");
    }
  }

  return (
    <Box className={classes.box}>
      <div>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.pos}>Add company</Typography>

            <form onSubmit={handleSubmit(send)}>
              {/* <TextField
                className={classes.textField}
                id="outlined-basic"
                label="name"
                variant="outlined"
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
              />

              <br />

              <FormHelperText error={true}>
                {errors.firstName?.message}
              </FormHelperText>

              <br />

              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                type="email"
                {...register("email", {
                  minLength: {
                    value: 5,
                    message: "you must insert email",
                  },
                })}
              />

              <FormHelperText error={true}>
                {errors.email?.message}
              </FormHelperText>
              <br /> */}
              {/* <TextField
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
                  <FormHelperText error={true}>
                    {errors.password?.message}
                  </FormHelperText>

                   */}

              <br />
              <FormControl
                variant="outlined"
                className={clsx(classes.margin, classes.textField)}
              >
                {" "}
                <InputLabel>Name</InputLabel>
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
                  labelWidth={45}
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

              <br />

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

              <Button
                className={classes.btn}
                type="submit"
                variant="contained"
                color="primary"
              >
                add
              </Button>

              <Button
                onClick={() => history.goBack()}
                variant="contained"
                color="secondary"
                className={classes.btn}
              >
                back
              </Button>
            </form>
          </CardContent>

          <br />
        </Card>
      </div>
    </Box>
  );
}

export default AddCompany;

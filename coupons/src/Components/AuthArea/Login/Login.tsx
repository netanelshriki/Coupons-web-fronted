import "./Login.css";
import {
  Button,
  Card,
  CardContent,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import clsx from "clsx";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import notify from "../../../Services/Notifilcation";
import { loginAction } from "../../Redux/AuthState";
import store from "../../Redux/Store";
import tokenAxios from "../../../Services/interceptor";
import Box from "@material-ui/core/Box";
import CredentialsModel from "../../../UserModel/CredentialsModel";
import { useState } from "react";
import ClientModel from "../../../UserModel/ClientModel";
import ClientType from "../../../UserModel/clientTypeModel";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },

  pos: {
    marginBottom: 0,
    marginLeft: "39%",
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
}));

function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsModel>();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState<string | number>("");

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

  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setAge(event.target.value as number);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  async function send(credentials: CredentialsModel) {
    console.log(credentials);
    try {
      const response = await tokenAxios.post<ClientModel>(
        "http://localhost:8080/client/login",
        credentials
      );
      console.log(response.data);

      store.dispatch(loginAction(response.data));
      notify.success("login successful!");
      history.push("/home");
    } catch (err) {
      notify.error("something went wrong");
    }
  }

  return (
    <Box className={classes.box}>
      <div className="Login">
        <Card className={classes.root} square >
          <CardContent>
            <Typography className={classes.pos}>Login</Typography>
            <br />
            <form onSubmit={handleSubmit(send)}>
             
              {/* <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                name="email"
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
              <FormHelperText error={true}>
                {errors.email?.message}
              </FormHelperText>
              <br />
              
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                name="password"
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
              </FormHelperText> */}

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

           
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                  Client Type
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                
                  defaultValue={ClientType.type}
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  onChange={handleChange}
                  {...register("clientType", {
                    required: { value: true, message: "Missing User Type" },
                  })}
                >
                
                  <MenuItem value="">
                    <em>Type:</em>
                 </MenuItem>
                  <MenuItem value={ClientType.customer}>CUSTOMER</MenuItem>
                  <MenuItem value={ClientType.admin}>ADMIN</MenuItem>
                  <MenuItem value={ClientType.company}>COMPANY</MenuItem>
                </Select>
              </FormControl>
              
              {/* <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                  Client Type
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
              
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  onChange={handleChange}
                  {...register("clientType", {
                    required: { value: true, message: "Missing User Type" },
                  })}
                >
                
                  <MenuItem value="">
                    <em>Type:</em>
                 </MenuItem>
                  <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                  <MenuItem value='COMPANY'>COMPANY</MenuItem>
                </Select>
              </FormControl> */}

              <br />
              <br />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.btn}
              >
                Login
              </Button>

              <Button
            onClick={() => history.push("/home")}
            variant="contained"
            color="secondary"
            className={classes.btn}
          >
            back
          </Button>
            </form>
          </CardContent>

       
        </Card>
      </div>
    </Box>
  );
}

export default Login;

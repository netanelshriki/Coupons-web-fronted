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
  Input,
  Typography,
  FormControl,
} from "@material-ui/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import notify from "../../../Services/Notifilcation";
import UserModel from "../../../UserModel/UserModel";
import { EmployeesAddedAction } from "../../Redux/EmployeesSatate";
import Library from "../../Redux/Store";
import { Alert } from "@material-ui/lab";
import Papering from "../../HomeArea/Papering/Papering";
import UserLoginModel from "../../../UserModel/ClientModel";
import { loginAction } from "../../Redux/AuthState";
import store from "../../Redux/Store";
import tokenAxios from "../../../Services/interceptor";
import UserAuthModel from "../../../UserModel/UserAuthModel";
import Box from "@material-ui/core/Box";
import CredentialsModel from "../../../UserModel/CredentialsModel";
import { useState } from "react";
import ClientType from "../../../UserModel/clientTypeModel";
import ClientModel from "../../../UserModel/ClientModel";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },

  pos: {
    marginBottom: 12,
  },
  box: {
    marginLeft: "39%",
    maxWidth: "50px",
    marginTop: "70px",
  },
  stam: {
    marginLeft: "39%",
    marginTop: "30px",
  },
  odstam: {
    marginLeft: "36%",
    marginTop: " 20px",
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

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as number);
  };

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
        <Card className={classes.root} square elevation={125}>
          <CardContent>
            <Typography className={classes.pos}>Login</Typography>
            <br />
            <form onSubmit={handleSubmit(send)}>
             
              <TextField
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
              </FormHelperText>

              <br />

              <select
                placeholder="ClientType..."
             
                name="clientType"
                {...register("clientType", {
                  required: true,
                })}
              >
                <option value="-" disabled>
                  Choose here
                </option>

                <option id="dark1" value={ClientType.admin}>
                  ADMIN
                </option>
                <option id="dark1" value={ClientType.company}>
                  COMPANY
                </option>
                <option id="dark1" value={ClientType.customer}>
                  CUSTOMER
                </option>
              
              </select>

              <br />
              <br />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.odstam}
              >
                Login
              </Button>
            </form>
          </CardContent>

          <Button
            onClick={() => history.push("/home")}
            variant="contained"
            color="secondary"
            className={classes.stam}
          >
            back
          </Button>
        </Card>
      </div>
    </Box>
  );
}

export default Login;

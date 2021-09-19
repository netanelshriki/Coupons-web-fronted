import {
    Button,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    TextField,
    Typography,
  } from "@material-ui/core";
  import axios from "axios";
  import { useForm } from "react-hook-form";
  import { RouteComponentProps, useHistory, useParams } from "react-router-dom";
  import notify from "../../../Services/Notifilcation";
  import { EmployeesAddedAction, EmployeesUpdatedAction } from "../../Redux/EmployeesSatate";
  import Library from "../../Redux/Store";
  import { Alert } from "@material-ui/lab";
import { useEffect, useState } from "react";
import UserModel from "../../../UserModel/UserModel";
import store from "../../Redux/Store";
import Globals from "../../../Services/Globals";
import Input from '@material-ui/core/Input';


  interface RouteParam {
  id: string;
}

interface EditDetailsProps extends RouteComponentProps<RouteParam> { }



  function EditEmployee(props:EditDetailsProps): JSX.Element {
 const { register, handleSubmit, formState: { errors }, } = useForm<UserModel>({
 });
    const history = useHistory();
    const currentId = +props.match.params?.id 
 const [employee, setEmployee] = useState(store.getState().EmployeeState.employees.find((c)=>c.id === +props.match.params?.id ));

 const [client,setClient] = useState(store.getState().authState.client);


async function send(user:UserModel) {
  user.id = currentId
  const customer = {
   
    id: user?.id,
    firstName: user?.firstName ,
    lastName: user?.lastName ,
    email: user?.email ,
    password: user?.password ,
    clientType: "CUSTOMER"
  };
  console.log(customer)

// updating DB
 const response = await axios.put<UserModel>( Globals.urls.admin+"customers/update",customer );

 //update global app state
 store.dispatch(EmployeesUpdatedAction(response.data))

//update local
setEmployee(store.getState().EmployeeState.employees.find((c)=>c.id === +props.match.params?.id) );

history.push('/employees');

};



  
    return (
      <div className="EditEmployee">
        {/* <Card>
          <CardContent>
            <Typography>Edit Customer</Typography>
            <br />
            <form onSubmit={handleSubmit(send)}> */}

              {/* <TextField
                id="outlined-basic"
                label="name"
                variant="outlined"
                type="text"
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
              <FormHelperText error={true}>{errors.name?.message}</FormHelperText>
              <br />

              <TextField
                id="outlined-basic"
                label="name"
                variant="outlined"
                defaultValue={client?.lastName}
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
                defaultValue={client?.email}
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
                 defaultValue={client?.email}
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
  
              <br />
              <Button type="submit" variant="contained" color="primary">
                Edit
              </Button>
              <br/>
              <br/>
            
            </form>
            
          </CardContent>
          <Button onClick={()=>history.push("/employees")}variant="contained" color="secondary">back</Button>
        </Card> */}
     
      </div> 
    );
  }
  
  export default EditEmployee;

function useSelector(arg0: (state: any) => any) {
  throw new Error("Function not implemented.");
}
  
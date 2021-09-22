import {
    Button,
    Card,
    CardContent,
    FormHelperText,
    TextField,
    Typography,
  } from "@material-ui/core";
  import axios from "axios";
  import { useForm } from "react-hook-form";
  import { RouteComponentProps, useHistory } from "react-router-dom";
  import notify from "../../../Services/Notifilcation";
  import {  EmployeesUpdatedAction } from "../../Redux/EmployeesSatate";
import { useState } from "react";
import UserModel from "../../../UserModel/UserModel";
import store from "../../Redux/Store";
import Globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/interceptor";


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

const [customer, setCustomer] = useState()



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
 const response = await tokenAxios.put<UserModel>( Globals.urls.admin+"customers",customer );

 //update global app state
 store.dispatch(EmployeesUpdatedAction(response.data))

//update local
setEmployee(store.getState().EmployeeState.employees.find((c)=>c.id === +props.match.params?.id) );
    
notify.success("Customer updated!");

history.push('/customers');

};



  
    return (
      <div className="EditEmployee">
        <Card>
          <CardContent>
            <Typography>Edit Customer</Typography>
            <br />
            <form onSubmit={handleSubmit(send)}> 

            <TextField
                id="outlined-basic"
                label="first name"
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
              <FormHelperText error={true}>{errors.firstName?.message}</FormHelperText>
              <br />

              <TextField
                id="outlined-basic"
                label="last name"
                variant="outlined"
             //   defaultValue={employee.lastName}
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
           //     defaultValue={client?.email}
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
               //  defaultValue={client?.email}
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
          <Button onClick={()=>history.push("/customers")}variant="contained" color="secondary">back</Button>
        </Card>
     
      </div> 
    );
  }
  
  export default EditEmployee;


  
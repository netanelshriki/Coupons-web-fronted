import { FormControl, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import tokenAxios from "../../../Services/interceptor";
import Coupon from "../../../UserModel/Coupon";
import store from "../../Redux/Store";
import "./AddCoupon.css";

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

     
     const request = await tokenAxios.post<Coupon>(
     
        
        "http://localhost:8080/company/coupon",
        formData
     
        );
      setCoupon(request.data);
      console.log(request.data);
      history.push("/company");
    } catch (err) {
      // console.log(err.message);
    }
  }

  return (
 
    
      <form onSubmit={handleSubmit(addCoupon)}>
       
        <>
      

          {/* {errors.companyID?.type==='minLength' && <span>name is too short</span>} */}

{/* 
          <input className="form-control" type="number" name="companyID" 
                    defaultValue={company.id}
                        {...register("companyID")}/> */}

          <br />

          <TextField
            id="outlined-basic"
            label="category"
            variant="outlined"
            type="text"
            {...register("category", { required: true, })}
          />

          {/* {errors.category?.type==='minLength' && <span>name is too short</span>} */}

          <br />

          <TextField
            id="outlined-basic"
            label="title"
            variant="outlined"
            type="text"
            {...register("title", { required: true,  })}
          />

          {/* {errors.title?.type==='minLength' && <span>name is too short</span>} */}

          <br />

          <TextField
            id="outlined-basic"
            label="description"
            variant="outlined"
            type="text"
            {...register("description", { required: true, })}
          />

          {/* {errors.description?.type==='minLength' && <span>name is too short</span>} */}

          <br />

      
          <input
            id="outlined-basic"
            // label="start date"
            // variant="outlined"
            type="date"
            name="startDate"
            {...register("startDate",{ required: true, })}
         
         />     
            <br />
        
           <input
            id="outlined-basic"
            // label="end date"
            // variant="outlined"
            type="date"
            name="endDate"
            {...register("endDate",{ required: true, })}
        
        />   
          
          <br />


          <TextField
            id="outlined-basic"
            label="amount"
            variant="outlined"
            type="text"
            {...register("amount", { required: true,  })}
          />

          <br />
          {/* {errors.amount?.type==='minLength' && <span>name is too short</span>} */}

          <TextField
            id="outlined-basic"
            label="price"
            variant="outlined"
            type="text"
            {...register("price", { required: true,  })}
          />

          {/* {errors.price?.type==='minLength' && <span>name is too short</span>} */}

          <br />

          <input
            type="file"
            color="primary"
            {...register("image", { required: true })}
          />
          {/* {errors.image?.type==='minLength' && <span>name is too short</span>} */}

          <br />
          <Button type="submit" color="primary" variant="contained" >
            Add
          </Button>
        </>
      </form>
   
  );
}

export default AddCoupon;

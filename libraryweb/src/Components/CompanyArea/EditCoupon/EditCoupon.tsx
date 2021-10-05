import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, useHistory } from "react-router-dom";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/interceptor";
import CouponGet from "../../../UserModel/CouponGet";
import UserModel from "../../../UserModel/UserModel";
import store from "../../Redux/Store";
import "./EditCoupon.css";

interface RouteParam {
    id: string;
  }
  
  interface EditDetailsProps extends RouteComponentProps<RouteParam> {}
  


function EditCoupon(props: EditDetailsProps): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<CouponGet>({});
      const history = useHistory();
      const currentId = +props.match.params?.id;
      const company = useState(store.getState().authState.client);
      const [couponToUpdate,setCouponToUpdate]= useState(store.getState().couponsGetState.coupons);



async function updateCoupon(coupon: CouponGet){
    console.log(coupon);
const couponImage = couponToUpdate.find((c)=>c.id === currentId) 
console.log("image id: "+couponImage.companyID)
    coupon.id = currentId;
    const couponUpdate = {
        id: coupon?.id,
        companyID: company[0].id,
        category: coupon?.category,
        title: coupon?.title,
        description: coupon?.description,
        startDate: coupon?.startDate,
        endDate: coupon?.endDate,
        amount: coupon?.amount,
        price: coupon?.price,
        imageID: couponImage.imageID,
      };

    //   "5470469b-a60f-4721-a5b7-b457f0f8e8ea"
      // updating DB
      // "http://localhost:8080/company/coupon/"
    const response = await tokenAxios.put<any>(
   globals.urls.company+"coupon"+currentId,
      couponUpdate
    );
    history.push("/company")
}

    return (
      
              <form onSubmit={handleSubmit(updateCoupon)}>
       
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

       
         {/* {errors.image?.type==='minLength' && <span>name is too short</span>} */}

         <br />
         <Button type="submit" color="primary" variant="contained" >
           Add
         </Button>
       </>
     </form>
  
  
    );
}

export default EditCoupon;

import Coupon from "./Coupon";

class UserModel{

    public id?: number;
    public firstName?: string;
    public lastName?: string;
    public email?:string;
    public password?:string;
    public clientType?:string;
   public  coupons? : Coupon[];
    
    
    }
    export default UserModel;
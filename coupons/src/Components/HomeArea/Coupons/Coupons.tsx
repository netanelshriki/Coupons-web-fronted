import {
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
  IconButton,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import CreateIcon from "@material-ui/icons/Create";
import { useHistory } from "react-router-dom";
import tokenAxios from "../../../Services/interceptor";
import notify from "../../../Services/Notifilcation";
import Coupon from "../../../UserModel/Coupon";
import store from "../../Redux/Store";
import "./Coupons.css";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { CouponDownloadedAction } from "../../Redux/CouponsState";


function Coupons(): JSX.Element {
  const [gets, setGet] = useState<Coupon[]>([]);
  const customer = useState(store.getState().authState.client);
  //const coupons = useState(store.getState().couponsState.coupons.)

  const history = useHistory();

  useEffect(() => {
    const axiosGet = async () => {
      const response = await tokenAxios.get<Coupon[]>(
        "http://localhost:8080/client/coupons"
      );
      const allCoupons = response.data;
     
      store.dispatch(CouponDownloadedAction(allCoupons));
     
      setGet(response.data);
      console.log(response.data);
    };
    axiosGet();
  }, []);


  async function buyCoupon(id) {

    
    console.log(id);

const myCoupon = gets.find(x => x.id === id);

    const coupon = {
      id: id,
      companyID: myCoupon.companyID,
      category: myCoupon.category,
      title: myCoupon.title,
      description: myCoupon.description,
      startDate: myCoupon.startDate,
      endDate: myCoupon.endDate,
      amount: myCoupon.amount,
      price:myCoupon.price,
      image: myCoupon.image,
    };
    console.log(coupon); 
    try {
      const result = await tokenAxios.post<Coupon>(
        "http://localhost:8080/customer/buy",
        coupon,
        {
          params: {
            customerId: customer[0].id,
          },
        }
      );
      history.push("/area");
      notify.success("coupon added successfully!");
    } catch (err) {
      notify.error("you can  buy coupon only once!");
    }
  }

  const result = gets.map((get) => {
    return (
      <>
        <TableRow key={get.id}>
          <TableCell>{get.id} </TableCell>
          <TableCell align="right">{get.companyID}</TableCell>
          <TableCell align="right">{get.category}</TableCell>
          <TableCell align="right">{get.title}</TableCell>
          <TableCell align="right">{get.description}</TableCell>
          <TableCell align="right">{get.startDate}</TableCell>
          <TableCell align="right">{get.endDate}</TableCell>
          <TableCell align="right">{get.amount}</TableCell>
          <TableCell align="right">{get.price}</TableCell>
          <TableCell align="right">{get.image}</TableCell>
          <TableCell align="right">
            <IconButton>
              <ShoppingCartIcon onClick={() => buyCoupon(get.id)} />
            </IconButton>
          </TableCell>
        </TableRow>
      </>
    );
  });

  return (
    <>
      <Table className="Table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">company id</TableCell>
            <TableCell align="right"> category&nbsp;</TableCell>
            <TableCell align="right">title&nbsp;</TableCell>
            <TableCell align="right">description&nbsp;</TableCell>
            <TableCell align="right">startDate&nbsp;</TableCell>
            <TableCell align="right">endDate&nbsp;</TableCell>
            <TableCell align="right">amount&nbsp;</TableCell>
            <TableCell align="right">price&nbsp;</TableCell>
            <TableCell align="right">image&nbsp;</TableCell>
            <TableCell align="right">buy&nbsp;</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>{gets && result}</TableBody>
      </Table>
    </>
  );
}

export default Coupons;

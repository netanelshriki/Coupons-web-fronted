import {
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
  Collapse,
} from "@material-ui/core";
import clsx from 'clsx';
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
import axios from "axios";
import CouponGet from "../../../UserModel/CouponGet";
import DeleteIcon from '@material-ui/icons/Delete';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
const useStyles = makeStyles((theme) => ({
  card:{
   marginLeft: theme.spacing(11),
  },
   root: {
     maxWidth: "230px",
       margin: theme.spacing(4),
     opacity: 1,
     "&:hover":{
         opacity: "0.5",
         transition: "1s",
         
         }
 
   },
   paper:{
       margin: theme.spacing(2),
 
   },
   expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
   media: {
     height: "220px",
     width: "220px",
   },
   tooltip:{
     opacity: "1",
   //   margin: theme.spacing(2),
     "&:hover":{
       opacity: "1",
   }
 },
 expandOpen: {
  transform: 'rotate(180deg)',
},
 }));
 


function Coupons(): JSX.Element {
  const [gets, setGet] = useState<CouponGet[]>([]);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const customer = useState(store.getState().authState.client);
  //const coupons = useState(store.getState().couponsState.coupons.)

  const history = useHistory();

  useEffect(() => {
    const axiosGet = async () => {
      const response = await axios.get<CouponGet[]>(
        "http://localhost:8080/client/coupons"
      );
      const allCoupons = response.data;
     
     // store.dispatch(CouponDownloadedAction(allCoupons));
     
      setGet(response.data);
      
      console.log(response.data);
    };
    axiosGet();
  
}, []);


  async function buyCoupon(id) {
    console.log("customer: "+customer[0]);

    if(customer[0]===null) {
  history.push("login");
  notify.error("you have to login if you want to buy a coupon!");
  return;

}
    
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
      imageID: myCoupon.imageID,
    
    };
    console.log(coupon); 
   
    try {
     
      const result = await tokenAxios.post<CouponGet>(
        "http://localhost:8080/customer/buy",
        coupon,{
        params: {
          customerId: customer[0].id
        }
      }
      );
      history.push("/area");
      notify.success("coupon added successfully!");
    } catch (err) {
      notify.error("you can  buy coupon only once!");
    }
  }

  const result = gets.map((coupon) => {
    return (
      <>
        {/* <TableRow key={get.id}>
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
        </TableRow> */}

<Grid spacing={5} >
        <Card className={classes.root} >
          
              <CardContent>
                <Typography>{coupon?.description}</Typography>
  
              
              </CardContent>
              <CardMedia
                className={classes.media}
                image={"http://localhost:8080/client/coupons/images/" + coupon?.imageID}
              />
        
              <CardActions>
              {/* <IconButton aria-label="add to favorites"
           
              >
            
              <DeleteIcon />
            
            </IconButton> */}  
           
          
    
            {/* <IconButton>
              <ShoppingCartIcon onClick={() => buyCoupon(coupon?.id)} />
            </IconButton> */}

<Tooltip title={"buy coupon!"} arrow 
className={classes.tooltip}
onClick={() => buyCoupon(coupon?.id)}
>
        
        <IconButton>       
             
             <              ShoppingCartIcon
/>
 
  </IconButton>
      </Tooltip>

            




            <Tooltip title={coupon?.title} arrow className={classes.tooltip}>
        
          <IconButton>       
               
               <ContactSupportIcon />
   
    </IconButton>
        </Tooltip>  
         
            <Tooltip title={coupon?.amount+"$"} arrow className={classes.tooltip}>
        
          <IconButton>       
               
               <MonetizationOnIcon />
   
    </IconButton>
        </Tooltip>
                
                  <Tooltip title={"will be expired in: "+coupon?.endDate} arrow className={classes.tooltip}>
        
          <IconButton>       
               
               <              EventAvailableIcon
 />
   
    </IconButton>
        </Tooltip>
           
              </CardActions>
           
              {/* <CardActions disableSpacing>
              <IconButton aria-label="add to favorites"
              onClick={()=>console.log(coupon.id)}
              >
              <ContactSupportIcon />
          
            </IconButton>
        
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            
            <CardContent>
         
            <Typography paragraph>{coupon.description}</Typography>

            </CardContent>
         
            </Collapse>
      
            <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
             
              </CardActions> */}
         
         
            </Card>
           
            <br/>
            <br/>
          </Grid>



      </>
    );
  });

  return (
    <>
      {/* <Table className="Table" aria-label="simple table">
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
   
      </Table> */}
             
              <Grid container className={classes.card} >

              {gets && result}
          
             </Grid>
   
    </>
  );
}

export default Coupons;

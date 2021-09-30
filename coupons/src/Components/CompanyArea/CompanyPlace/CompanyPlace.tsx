import { Button, Card, CardActions, CardContent, CardMedia, Collapse, Grid, IconButton, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import tokenAxios from "../../../Services/interceptor";
import notify from "../../../Services/Notifilcation";
import clsx from 'clsx';
import store from "../../Redux/Store";
import "./CompanyPlace.css";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Coupon from "../../../UserModel/Coupon";
import CouponGet from "../../../UserModel/CouponGet";
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  card:{
   marginLeft: theme.spacing(11),
  },
   root: {
     maxWidth: "200px",
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
     height: "200px",
     width: "200px",
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

function CompanyPlace(): JSX.Element {
  
  const [gets, setGet] = useState<CouponGet[]>([]);
    const history = useHistory();
    const company = useState(store.getState().authState.client);
    const token = useState(store.getState().authState.client.token);
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    



    useEffect(() => {
        if (!store.getState().authState.client) {
          notify.error("please login");
          history.push("/login");
        }


        const axiosGet = async () => {
                 
          const response = await tokenAxios.get<CouponGet[]>(
            "http://localhost:8080/company/coupons",
             {
              params: {
                companyId: company[0].id,
              }
             } );
          setGet(response.data);
       
        };
        axiosGet();
      }, []);

// const result = gets.map((get) => {
//   return (
   
//    <TableBody key={get.id} >
//       <TableRow>
//         <TableCell>{get.id}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//         <TableCell align="right">{get.companyID}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//         <TableCell align="right">{get.category}</TableCell>&nbsp;
//         <TableCell align="right">{get.title}</TableCell>
//         <TableCell align="right">{get.description}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//         <TableCell align="right">{get.startDate}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//         <TableCell align="right">{get.endDate}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//         <TableCell align="right">{get.amount}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//         <TableCell align="right">{get.price}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//         <TableCell align="right">{get.imageID}</TableCell>
      
//       </TableRow>
//     </TableBody>
//   );
// });

const result = gets.map((coupon) => {
    
  return (
  <div>
  <Grid spacing={5} >
    <Card className={classes.root} >
      
          <CardContent>
            <Typography>{coupon?.id}</Typography>
            <Typography>{coupon?.title}</Typography>
          </CardContent>
          <CardMedia
            className={classes.media}
            image={"http://localhost:8080/client/coupons/images/" + coupon?.imageID}
          
          />
    
          <CardActions>
          <IconButton aria-label="add to favorites"
       
          >
        
          <DeleteIcon />
        
        </IconButton>

        {/* <IconButton>
          <ShoppingCartIcon onClick={() => buyCoupon(coupon?.id)} />
        </IconButton> */}
        <Tooltip title={coupon?.description} arrow className={classes.tooltip}>
    
      <IconButton>       
           
           <ContactSupportIcon />

</IconButton>
    </Tooltip>
       
          </CardActions>
       
          <CardActions disableSpacing>
          <IconButton aria-label="add to favorites"
          onClick={()=>console.log(coupon.id)}
          >
          <ContactSupportIcon />
      
        </IconButton>
    
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        
        <CardContent>
     
        <Typography paragraph>Method:</Typography>

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
         
          </CardActions>
     
     
        </Card>
       
        <br/>
        <br/>
      </Grid>

      </div>

);

});



   
    // return (
    // <>
    // <Table className="Table" aria-label="simple table">
    //         <TableHead>
    //           <TableRow>
    //             <TableCell>Id</TableCell>
    //             <TableCell align="right">company id</TableCell>
    //             <TableCell align="right"> category&nbsp;</TableCell>
    //             <TableCell align="right">title&nbsp;</TableCell>
    //             <TableCell align="right">description&nbsp;</TableCell>
    //             <TableCell align="right">startDate&nbsp;</TableCell>
    //             <TableCell align="right">endDate&nbsp;</TableCell>
    //             <TableCell align="right">amount&nbsp;</TableCell>
    //             <TableCell align="right">price&nbsp;</TableCell>
    //             <TableCell align="right">image&nbsp;</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         </Table>

    //         {gets && result}

    // </>
    // );

    return (
      <>
       
          <Grid container className={classes.card} >

    {gets && result}

</Grid>

      </>
  );
}

export default CompanyPlace;

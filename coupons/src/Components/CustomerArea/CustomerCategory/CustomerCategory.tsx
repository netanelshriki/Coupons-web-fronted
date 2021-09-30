import {
  TableRow,
  TableCell,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableBody,
  makeStyles,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import tokenAxios from "../../../Services/interceptor";
import notify from "../../../Services/Notifilcation";
import Coupon from "../../../UserModel/Coupon";
import CouponGet from "../../../UserModel/CouponGet";
import store from "../../Redux/Store";
import "./CustomerCategory.css";
import clsx from 'clsx';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';


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

function CustomerCategory(): JSX.Element {
  const [gets, setGet] = useState<CouponGet[]>([]);
  const history = useHistory();
  const cust = useState(store.getState().authState.client);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState<string | number>("");
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  async function send(send: any) {
    console.log(send);

    const byCategory = {
      customerId: cust[0].id,
      category: send.category,
    };

    const response = await tokenAxios.post<CouponGet[]>(
      "http://localhost:8080/customer/coupons/category",
     
      byCategory
   
      );
    setGet(response.data);
    if(response.data.length!==0) {
     
      notify.success("found "+response.data.length+" coupons")

    } else {
     
      notify.error("no coupons found in category "+byCategory.category+"!"); 
   
    }
  }

  // const result = gets.map((get) => {
  //   return (
  //     <TableRow key={get.id}>
  //       <TableCell>{get.id} </TableCell>
  //       <TableCell align="right">{get.category}</TableCell>
  //       <TableCell align="right">{get.title}</TableCell>
  //       <TableCell align="right">{get.description}</TableCell>
  //       <TableCell align="right">{get.startDate}</TableCell>
  //       <TableCell align="right">{get.endDate}</TableCell>
  //       <TableCell align="right">{get.amount}</TableCell>
  //       <TableCell align="right">{get.price}</TableCell>
  //       <TableCell align="right">{get.imageID}</TableCell>
  //     </TableRow>
  //   );
  // });

  const result = gets.map((coupon) => {
    
    return (
    <div key={coupon.id}>
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
            <Button aria-label="add to favorites"
         
            >
          
            <DeleteIcon />
          
          </Button>
  
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


  return (
    <>
      {gets.length === 0 ? (
        <>
          <form onSubmit={handleSubmit(send)}>
            <FormControl>
              <InputLabel id="demo-controlled-open-select-label">
                category{" "}
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                defaultValue="category"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                onChange={handleChange}
                {...register("category", {
                  required: { value: true, message: "Missing User Type" },
                })}
              >
                <MenuItem value="">
                  <em>Type:</em>
                </MenuItem>
                <MenuItem value="FOOD">FOOD</MenuItem>
                <MenuItem value="ELECTRICITY">ELECTRICITY</MenuItem>
                <MenuItem value="RESTAURANT">RESTAURANT</MenuItem>
                <MenuItem value="VACATION">VACATION</MenuItem>
              </Select>
            </FormControl>

            <br />
            <br />
            <Button type="submit" variant="contained" color="primary">
              Check out
            </Button>
<br/>
<br/>
            <Button
            onClick={() => history.push("/")}
            variant="contained"
            color="secondary"
          >
            home
          </Button>
          
          <br/>
          <br/>


           <Button
            onClick={() => history.goBack()}
            variant="contained"
            color="primary"
          >
            back
          </Button>
          </form>
        </>
      ) : (
        <>
          {/* <Table className="Table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right"> category&nbsp;</TableCell>
                <TableCell align="right">title&nbsp;</TableCell>
                <TableCell align="right">description&nbsp;</TableCell>
                <TableCell align="right">startDate&nbsp;</TableCell>
                <TableCell align="right">endDate&nbsp;</TableCell>
                <TableCell align="right">amount&nbsp;</TableCell>
                <TableCell align="right">price&nbsp;</TableCell>
                <TableCell align="right">image&nbsp;</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>{gets && result}</TableBody>
          </Table> */}

    
<Grid container className={classes.card} >

{gets && result}

</Grid>

          <br />
          <br />

          <Button
            onClick={() => history.push("/")}
            variant="contained"
            color="secondary"
          >
            home
          </Button>
          
           <Button
            onClick={() => history.goBack()}
            variant="contained"
            color="primary"
          >
            back
          </Button>
        </>
      )}
    </>
  );
}

export default CustomerCategory;

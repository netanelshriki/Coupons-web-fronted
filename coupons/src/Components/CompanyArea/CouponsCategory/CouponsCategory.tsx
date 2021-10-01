import { TableBody, TableRow, TableCell, TextField, Button, Table, TableHead, FormControl, InputLabel, MenuItem, Select, makeStyles, Card, CardActions, CardContent, CardMedia, Collapse, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import tokenAxios from "../../../Services/interceptor";
import Coupon from "../../../UserModel/Coupon";
import store from "../../Redux/Store";
import "./CouponsCategory.css";
import clsx from 'clsx';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import CouponGet from "../../../UserModel/CouponGet";
import FormatListNumberedRtlIcon from "@material-ui/icons/FormatListNumberedRtl";
import CreateIcon from "@material-ui/icons/Create";




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
btn:{
marginLeft: theme.spacing(45),
},
 }));

function CouponsCategory(): JSX.Element {

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
        
        console.log(store.getState().authState.client);
      if(store.getState().authState.client===null){
        history.push("/login")
      }
        console.log(send);

        const byCategory = {
            companyId:cust[0].id,
            category: send.category
        }
                   
        const response = await tokenAxios.post<CouponGet[]>(
          "http://localhost:8080/company/category",byCategory)
        setGet(response.data);
   
    };

    async function deleteCoupon(id) {
      console.log("id to delete: " + id);
  
      const deleteCoupon = await tokenAxios.delete<any>(
        "http://localhost:8080/company/coupons/" + id
      );
    }
  
    async function updateCoupon(id) {
      history.push("/coupon/" + id);
    }

    
    // const result = gets.map((get) => {
    //     return (
          
    //       <TableBody key={get.id}>
    //         <TableRow>
    //           <TableCell>{get.id} </TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //           <TableCell align="right">{get.companyID}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //           <TableCell align="right">{get.category}</TableCell>&nbsp;
    //           <TableCell align="right">{get.title}</TableCell>
    //           <TableCell align="right">{get.description}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //           <TableCell align="right">{get.startDate}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //           <TableCell align="right">{get.endDate}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //           <TableCell align="right">{get.amount}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //           <TableCell align="right">{get.price}</TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //           <TableCell align="right">{get.image}</TableCell>
            
    //         </TableRow>
    //       </TableBody>
    //     );
    //   });

    
    // 
    
    const result = gets.map((coupon) => {
    
      return (
      <div key={coupon.id}>
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
              <Tooltip
                title={"delete coupon"}
                arrow
                className={classes.tooltip}
              >
                <IconButton>
                  <DeleteIcon onClick={() => deleteCoupon(coupon.id)} />
                </IconButton>
              </Tooltip>

              <Tooltip
                title={"update coupon"}
                arrow
                className={classes.tooltip}
              >
                <IconButton>
                  <CreateIcon onClick={() => updateCoupon(coupon.id)} />
                </IconButton>
              </Tooltip>

              <Tooltip
                title={"the amount is: " + coupon?.amount}
                arrow
                className={classes.tooltip}
              >
                <IconButton>
                  <FormatListNumberedRtlIcon />
                </IconButton>
              </Tooltip>
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
{gets.length===0?
    <>
                <form onSubmit={handleSubmit(send)}>
           
                <FormControl >
                <InputLabel id="demo-controlled-open-select-label">
category                </InputLabel>
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
                    <em>Category:</em>
                  </MenuItem>
                  <MenuItem value="FOOD">FOOD</MenuItem>
                  <MenuItem value="ELECTRICITY">ELECTRICITY</MenuItem>
                  <MenuItem value="RESTAURANT">RESTAURANT</MenuItem>
                  <MenuItem value="VACATION">VACATION</MenuItem>
                </Select>
              </FormControl>

              <br/>
              <br/>
                <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Check out
              </Button>
              </form>
              </>
              :
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

                <TableBody>
      
        {gets && result}

        
</TableBody> */}

                {/* </Table> */}
    
    <Grid container className={classes.card} >

    {gets && result}
 
 </Grid>
                
                <br/>
                <br/>

                <Button
            onClick={() => history.push("/")}
            variant="contained"
            color="secondary"
            className={classes.btn}
          >
            home
          </Button>   
           
            <Button
            onClick={() => history.goBack()}
            variant="contained"
            color="primary"
            className={classes.btn}

          >
            back
          </Button>
        

             
                </>


}
        </>
    );
}

export default CouponsCategory;

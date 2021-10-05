import "./CompanyOptions.css";
import { Button, makeStyles, withStyles } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    btn: {
        marginLeft: theme.spacing(31),
      },
     
    btn1: {
    marginLeft: theme.spacing(45),
  },
}))
const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[600],
      opacity: 1,
      transition: "1s",
      '&:hover': {
      
        backgroundColor: purple[10],
        // transition: "2s",
        color: "black",
     },
   
    },
}))(Button);

function CompanyOptions(): JSX.Element {
    const history = useHistory();
    const classes = useStyles();
    
    
        return (
            <>
                
        
               <br />
               <br />
               <br />
               <br />
               <br />
               <br />
               
              <ColorButton onClick={()=>history.push("/company/advanced")} className={classes.btn}   variant="contained" color="secondary">
                  
                  get coupons by  max price
             
              </ColorButton>
        
    
         
                
                <ColorButton onClick={()=>history.push("/company/category")} className={classes.btn}
                 color="primary"
                   variant="contained"
                 >
                  
                    get coupons by category
               
                </ColorButton>  
                
<br/>
<br/>
<br/>
<br/>
<br/>

<ColorButton onClick={()=>history.push("/add/coupon")} className={classes.btn}   variant="contained" color="secondary">
                  
              add coupon
             
              </ColorButton>

                
                {/* <ColorButton onClick={()=>history.push("/find/customer")} className={classes.btn}
                 color="primary"
                   variant="contained"
                 >
                  
                 test
               
                </ColorButton> */}
    
    
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <Button onClick={()=>history.push("/")} className={classes.btn1} color="primary" variant="contained">
    home
    </Button>
         
          <Button onClick={()=>history.goBack()}  color="secondary"className={classes.btn1} variant="contained">
    back
    </Button>
          
          </>
        );
    }

export default CompanyOptions;

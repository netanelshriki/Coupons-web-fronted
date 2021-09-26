import { Button, makeStyles, withStyles } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";
import "./CustomerOptions.css";

const useStyles = makeStyles((theme) => ({
    btn: {
        marginLeft: theme.spacing(26),
      },
      
}))
const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[600],
      opacity: 1,
     
      '&:hover': {
      
        backgroundColor: purple[200],
     
        color: "black",
     },
    },
}))(Button);

function CustomerOptions(): JSX.Element {

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
          <ColorButton onClick={()=>history.push("/customer/advanced")} className={classes.btn}   variant="contained" color="secondary">
              
              get coupons by  max price
         
          </ColorButton>
    

     
            
            <Button onClick={()=>history.push("/customer/category")} className={classes.btn}
             color="primary"
               variant="contained"
             >
              
                get coupons by category
           
            </Button>


      
      </>
    );
}

export default CustomerOptions;

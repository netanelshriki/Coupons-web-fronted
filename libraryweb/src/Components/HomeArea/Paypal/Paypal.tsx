import { makeStyles } from "@material-ui/styles";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./Paypal.css";
import clsx from "clsx";
import { Button, Theme } from "@material-ui/core";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme: Theme) => ({
    paypal:{
         marginLeft: theme.spacing(27),
         marginTop: theme.spacing(20),
    }
}))

function Paypal(): JSX.Element {
    const history = useHistory();
    const classes = useStyles();
// () => {
//     return ;
// }
    return (
    
    <div className={classes.paypal}>
     <PayPalScriptProvider options={{ "client-id": "test" }}>
     <PayPalButtons style={{ layout: "horizontal" }} />      
       </PayPalScriptProvider>

       <br/>
       <br/>

<Button onClick={()=> history.push("/")} variant="contained" color="primary" className={classes.paypal}>
    home
</Button>

<Button onClick={()=> history.goBack()} variant="contained" color="secondary" className={classes.paypal}>
back</Button>

        </div>
  
  );
}

export default Paypal;

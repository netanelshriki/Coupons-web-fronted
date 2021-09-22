import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import store from '../../Redux/Store';
import ClientType from '../../../UserModel/clientTypeModel';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  btn:{
    textTransform: 'lowercase'
   
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SideBar({children}) {
  const classes = useStyles();
  const [state, setState] = React.useState({

    left: false,
  
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const history = useHistory();

  const[client, setClient] = useState(store.getState().authState.client);

  useEffect(()=> {
    console.log(client);
        const unsubscribe = store.subscribe(() => {
        setClient(store.getState().authState.client)
      return unsubscribe;
     })
  });

  const list = (anchor: Anchor) => (
   
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
     >
         <Router >
        <br/>
    
      <List>
     
        
       
          <ListItem button={true} >
        {client?.clientType===ClientType.admin ?
         <Button onClick={()=> history.push("/customer")} className={classes.btn}>
         <ListItemIcon> <MailIcon /></ListItemIcon>
       <ListItemText primary='add customer'/>
         </Button>
       :client?.clientType===ClientType.customer?
       <Button onClick={()=> history.push("/area")} className={classes.btn}>
       <ListItemIcon> <ShoppingCartIcon /></ListItemIcon>
     <ListItemText primary='my coupons'/>
       </Button>
       : 
       <Button onClick={()=> history.push("/company")} className={classes.btn}>
       <ListItemIcon> <AccountBoxIcon /></ListItemIcon>
     <ListItemText primary='your area'/>
       </Button>
      }
       
        </ListItem>

      </List>
   <Divider variant="middle" light={true} />
    
      <List>

     
     <ListItem button={true} >
   {client?.clientType===ClientType.admin ?
    <Button onClick={()=> history.push("/customers")} className={classes.btn}>
    <ListItemIcon> <MailIcon /></ListItemIcon>
  <ListItemText primary='All customers'/>
    </Button>
    :client?.clientType===ClientType.customer?
    <Button onClick={()=> history.push("/customer/details")} className={classes.btn}>
    <ListItemIcon> <AccountBoxIcon /></ListItemIcon>
  <ListItemText primary='my details'/>
    </Button>
    : 
    <Button onClick={()=> history.push("/company/details")} className={classes.btn}>
    <ListItemIcon> <AccountBoxIcon /></ListItemIcon>
  <ListItemText primary='my details'/>
    </Button>
   }
   
    
    
    
    
     </ListItem>

 </List>

      
      <Divider variant="middle" light={true} />
      
      <List>

      <ListItem button={true} >
        {client?.clientType===ClientType.admin ?
         <Button onClick={()=> history.push("/companies")} className={classes.btn}>
         <ListItemIcon> <MailIcon /></ListItemIcon>
       <ListItemText primary='All companies'/>
         </Button>
      :client?.clientType===ClientType.customer?
      <Button onClick={()=> history.push("/customer/details")} className={classes.btn}>
      <ListItemIcon> <AccountBoxIcon /></ListItemIcon>
    <ListItemText primary='my details'/>
      </Button>
      : 
      <Button onClick={()=> history.push("/company/advanced")} className={classes.btn}>
      <ListItemIcon> <AccountBoxIcon /></ListItemIcon>
    <ListItemText primary='max prise'/>
      </Button>
     }
                  </ListItem>
      </List>
      <Divider variant="middle" light={true} />
      
      <List>

      <ListItem button={true} >
        {client?.clientType===ClientType.admin ?
         <Button onClick={()=> history.push("/companies")} className={classes.btn}>
         <ListItemIcon> <MailIcon /></ListItemIcon>
       <ListItemText primary='All companies'/>
         </Button>
      :client?.clientType===ClientType.customer?
      <Button onClick={()=> history.push("/customer/details")} className={classes.btn}>
      <ListItemIcon> <AccountBoxIcon /></ListItemIcon>
    <ListItemText primary='my details'/>
      </Button>
      : 
      <Button onClick={()=> history.push("/company/category")} className={classes.btn}>
      <ListItemIcon> <AccountBoxIcon /></ListItemIcon>
    <ListItemText primary='by category'/>
      </Button>
     }
                  </ListItem>
      </List>
      {/* <Divider variant="middle" light={true} />
      <List>
      <ListItem button key='WorkIcon'>
            <ListItemIcon> <MailIcon /></ListItemIcon>
            <ListItemText primary='add employee' />
          </ListItem>
      </List>
      <Divider variant="middle" light={true} />
      <List>
      <ListItem button key='WorkIcon'>
            <ListItemIcon> <MailIcon /></ListItemIcon>
            <ListItemText primary='add employee' />
          </ListItem> */}
      {/* </List> */}
      {/* <Switch>
            <Route path="/home" exact/>
            <Route path="/employee" exact>
           {AddEmployee} 
            </Route>
            <Route path="/employees" component={Layout} exact/> 
           <Redirect from="/" to="/home" exact/>
            </Switch>
      */}
      </Router>
    
    </div>

  );

  return (
    <div>
   
        <React.Fragment key={'left'}>
          <Button onClick={toggleDrawer('left', true)}>{children}</Button>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
        </React.Fragment>
       
    </div>
    
  );
}

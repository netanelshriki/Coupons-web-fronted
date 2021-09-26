import React, { useEffect, useState } from "react";
import { Badge, Button, Container, createMuiTheme, createTheme, CssBaseline, Divider, IconButton, makeStyles, Switch, ThemeProvider, Toolbar, Typography } from "@material-ui/core";
import Header from "./Components/HomeArea/Header/Header";
import { BrowserRouter, NavLink, useHistory } from "react-router-dom";
import Routing from "./Components/HomeArea/Routing/Routing";
import { useSpring, animated, config } from "react-spring";
import SideBar from "./Components/HomeArea/SideBar/SideBar";
import store from "./Components/Redux/Store";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import {  HashRouter } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
   textDecoration: "none",
  },
  link:{
    textDecoration: "none",

  },
 
  tagline: {
    fontSize: 20,
    textTransform: "uppercase",
    justifyContent: "center",
    fontFamily: "Montserrat",
  },
}));

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [client, setClient] = useState(store.getState().authState.client);
 const classes = useStyles();
  const history = useHistory();
  
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    delay: 200,
    config: config.gentle,
  });

  

  useEffect(() => {
    console.log(client);
    const unsubscribe = store.subscribe(() => {
      setClient(store.getState().authState.client);
      return unsubscribe;
    });
  });

  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    }
  })

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  
  function mode(){
    setDarkMode(!darkMode);
  }
 
  return (
    <BrowserRouter >
     <ThemeProvider theme={theme}>
      <CssBaseline>
       <Container className="App" >

{/* <Header /> */}

<>
      <Toolbar>
        <IconButton color="inherit">
          <SideBar>
            <MenuIcon />
          </SideBar>
        </IconButton>

        <Typography variant="h5" className={classes.title}>
          <animated.h5 style={props}>
         
            <NavLink to={"/home"} className={classes.link}>
           
            <Button >Coupons</Button>
          
           
            </NavLink>
          
          </animated.h5>
        
          </Typography>

        <span>
        
          {client === null ? (
            <span>hello guest</span>
          ) : (
            <span> hello {client?.name}</span>
          )}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        {client === null ? (
          <span>
            <NavLink to={"/register"}className={classes.link}>
            <Button>register</Button>
            </NavLink>
         
            &nbsp;&nbsp;
           
            <NavLink to={"/login"} className={classes.link}>
            <Button>login</Button>
           
            </NavLink>
         
          </span>
        ) : (
          <NavLink to={"/logout"} className={classes.link}>
             <Button>logout</Button>
            </NavLink>
         
        )}

        <IconButton color="inherit">
         
          <Badge badgeContent={client===null?0:4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
        {darkMode===true ?<IconButton onClick={()=>mode()}><Brightness7Icon style={{fill: "yellow"}}/></IconButton >:<IconButton onClick={()=>mode()}><Brightness2Icon/></IconButton>}

      </Toolbar>


      <Divider />

      <Toolbar className={classes.tagline}>welcome to the Coupons web</Toolbar>
    </>

      
         <Routing />
     
       </Container>
       </CssBaseline>
     </ThemeProvider>
    
    </BrowserRouter>
  );
  {
    /* <header className="header">
     {/* <Header /> */
  }
  {
    /* <Layout/> */
  }
  {
    /* <DeleteEmployees/> */
  }
  {
    /* <ShowEmplHooks/> */
  }
  {
    /* <AddEmployee/> */
  }
  {
    /* <Employees/> */
  }
  {
    /* <AddEmployeeRedux/> */
  }
}

export default App;

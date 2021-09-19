import React, { useState } from "react";
import logo from "./logo.svg";
import AddEmployee from "./Components/EmployeeArea/AddCustomer/AddCustomer";
import Layout from "./Components/EmployeeArea/Layout/Layout";
import { Container, createMuiTheme, createTheme, CssBaseline, Switch, ThemeProvider } from "@material-ui/core";
import Header from "./Components/HomeArea/Header/Header";
import Main from "./Components/HomeArea/Main/Main";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Components/HomeArea/Routing/Routing";
import SideBar from "./Components/HomeArea/SideBar/SideBar";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    }
  })

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  
 
  return (
    <BrowserRouter >
     <ThemeProvider theme={theme}>
      <CssBaseline>
       <Container className="App" >

        <Header />
          <Switch onChange={handleDarkMode} value={darkMode}/>
      
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

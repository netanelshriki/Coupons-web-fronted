import React, { useState } from "react";
import { Container, createMuiTheme, createTheme, CssBaseline, Switch, ThemeProvider } from "@material-ui/core";
import Header from "./Components/HomeArea/Header/Header";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Components/HomeArea/Routing/Routing";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
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

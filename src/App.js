import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useDarkMode from 'use-dark-mode';
import AppContext from './AppContext';
import MainApp from './MainApp';
import GlobalStyles from './theme/GlobalStyles';
import { lightTheme, darkTheme } from './theme/themes';
import AnimatedCursor from './components/AnimatedCursor';


function App() {
  
  const darkMode = useDarkMode(true);
  return (
    <AppContext.Provider value={{ darkMode }}>
      <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <GlobalStyles />
        <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <MainApp />
            <AnimatedCursor />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ErrorPage from './components/ErrorPage';
import Header from './components/Header';
import LoanCalculatorDashboard from './components/LoanCalculatorDashboard';
import ExchangeRates from './components/ExchangeRates';
import About from './components/About';

const App = () => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode as shown in the image

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#ffffff', // Dark gray for dark mode, white for light
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000', // White text in dark mode, black in light
      },
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ 
          backgroundColor: theme.palette.background.default, 
          color: theme.palette.text.primary, 
          minHeight: '100vh',
          transition: 'background-color 0.3s, color 0.3s'
        }}>
          <Header onThemeChange={handleThemeChange} isDarkMode={darkMode} />
          <Routes>
            <Route path="/" element={<LoanCalculatorDashboard />} />
            <Route path="/exchange-rates" element={<ExchangeRates />} />
            <Route path="/about" element={<About />} />
            <Route path="/error-page" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const EMIDisplayContainer = styled('div')(({ theme }) => ({
  marginTop: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const ResetButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#ab47bc' : '#ab47bc',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#9c27b0' : '#9c27b0',
  },
  marginLeft: '10px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: '10px',
    marginLeft: '0',
  },
}));

const EMIDisplay = ({ emi, selectedCurrency, setSelectedCurrency, exchangeRates, onReset }) => {
  const convertCurrency = (amount) => {
    if (!exchangeRates[selectedCurrency]) return amount;
    return (amount * exchangeRates[selectedCurrency]).toFixed(2);
  };

  return (
    <EMIDisplayContainer>
      <h3>Monthly EMI: ${convertCurrency(emi)}</h3>
      <div>
        <label>Currency: </label>
        <Select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          style={{ marginLeft: '10px', color: 'inherit', backgroundColor: '#424242' }}
        >
          {Object.keys(exchangeRates).map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </div>
      <ResetButton onClick={onReset} variant="contained">
        Reset Table
      </ResetButton>
    </EMIDisplayContainer>
  );
};

export default EMIDisplay;
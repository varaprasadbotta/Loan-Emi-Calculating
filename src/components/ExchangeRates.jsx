import React from 'react';
import { styled } from '@mui/material/styles';

const PageContainer = styled('div')(({ theme }) => ({
  padding: '20px',
  maxWidth: '600px',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
  },
}));

const ExchangeRates = () => {
  return (
    <PageContainer>
      <h2>Exchange Rates (Live)</h2>
    </PageContainer>
  );
};

export default ExchangeRates;
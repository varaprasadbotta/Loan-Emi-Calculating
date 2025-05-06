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

const About = () => {
  return (
    <PageContainer>
      <h2>About</h2>
      <p>This is the About page for the Loan Calculator app.</p>
    </PageContainer>
  );
};

export default About;
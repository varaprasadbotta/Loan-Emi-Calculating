import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const FormContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  marginTop: '20px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '10px',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#ffffff',
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#1976D2',
    },
  },
  flex: 1,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const CalculateButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1976D2' : '#1976D2',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#1565C0' : '#1565C0',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: '10px',
  },
}));

const LoanForm = ({ loanAmount, setLoanAmount, interestRate, setInterestRate, term, setTerm, onCalculate }) => {
  return (
    <div>
      <h2>Loan Calculator Dashboard</h2>
      <FormContainer>
        <StyledTextField
          label="Loan Amount"
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <StyledTextField
          label="Interest Rate (%)"
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <StyledTextField
          label="Term (Years)"
          type="number"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </FormContainer>
      <CalculateButton onClick={onCalculate} variant="contained" style={{ marginTop: '20px' }}>
        Calculate
      </CalculateButton>
    </div>
  );
};

export default LoanForm;
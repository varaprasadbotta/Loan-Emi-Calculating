import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: '20px',
  backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#ffffff',
  [theme.breakpoints.down('sm')]: {
    overflowX: 'auto',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderColor: theme.palette.mode === 'dark' ? '#616161' : '#e0e0e0',
}));

const AmortizationTable = ({ amortizationSchedule, selectedCurrency, exchangeRates }) => {
  const convertCurrency = (amount) => {
    if (!exchangeRates[selectedCurrency]) return amount;
    return (amount * exchangeRates[selectedCurrency]).toFixed(2);
  };

  return (
    <>
      <h3 style={{ marginTop: '20px' }}>Amortization Schedule ({selectedCurrency})</h3>
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Month</StyledTableCell>
              <StyledTableCell>Principal</StyledTableCell>
              <StyledTableCell>Interest</StyledTableCell>
              <StyledTableCell>Remaining Balance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {amortizationSchedule.map((row) => (
              <TableRow key={row.month}>
                <StyledTableCell>{row.month}</StyledTableCell>
                <StyledTableCell>{convertCurrency(row.principal)} {selectedCurrency}</StyledTableCell>
                <StyledTableCell>{convertCurrency(row.interest)} {selectedCurrency}</StyledTableCell>
                <StyledTableCell>{convertCurrency(row.balance)} {selectedCurrency}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
};

export default AmortizationTable;
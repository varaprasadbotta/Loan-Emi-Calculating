import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import LoanForm from './LoanForm';
import EMIDisplay from './EMIDisplay';
import AmortizationTable from './AmortizationTable';

const DashboardContainer = styled('div')(({ theme }) => ({
  padding: '20px',
  maxWidth: '800px',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
  },
}));

const LoanCalculatorDashboard = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [term, setTerm] = useState(5);
  const [emi, setEmi] = useState(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showTable, setShowTable] = useState(false);

  // Fetch exchange rates from API on component mount
  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/1adaa243f48602a0ccdf0967/latest/USD')
      .then((response) => response.json())
      .then((data) => {
        if (data.result === 'success') {
          setExchangeRates(data.conversion_rates);
        } else {
          console.error('Error fetching exchange rates:', data);
        }
      })
      .catch((error) => console.error('Error fetching exchange rates:', error));
  }, []);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(term);

    if (!principal || !annualRate || !years) {
      alert('Please fill in all fields with valid numbers.');
      return;
    }

    const monthlyRate = annualRate / 12 / 100; // R
    const months = years * 12; // N

    // EMI Formula: [P x R x (1+R)^N] / [(1+R)^N - 1]
    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    setEmi(emiValue.toFixed(2));

    // Generate Amortization Schedule
    let balance = principal;
    const schedule = [];
    for (let month = 1; month <= months; month++) {
      const interest = balance * monthlyRate;
      const principalPayment = emiValue - interest;
      balance -= principalPayment;

      schedule.push({
        month,
        principal: principalPayment.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : 0,
      });
    }

    setAmortizationSchedule(schedule);
    setShowTable(true);
  };

  const handleReset = () => {
    setShowTable(false);
    setEmi(null);
    setAmortizationSchedule([]);
    setSelectedCurrency('USD');
  };

  return (
    <DashboardContainer>
      <LoanForm
        loanAmount={loanAmount}
        setLoanAmount={setLoanAmount}
        interestRate={interestRate}
        setInterestRate={setInterestRate}
        term={term}
        setTerm={setTerm}
        onCalculate={calculateEMI}
      />
      {emi && (
        <EMIDisplay
          emi={emi}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          exchangeRates={exchangeRates}
          onReset={handleReset}
        />
      )}
      {showTable && amortizationSchedule.length > 0 && (
        <AmortizationTable
          amortizationSchedule={amortizationSchedule}
          selectedCurrency={selectedCurrency}
          exchangeRates={exchangeRates}
        />
      )}
    </DashboardContainer>
  );
};

export default LoanCalculatorDashboard;
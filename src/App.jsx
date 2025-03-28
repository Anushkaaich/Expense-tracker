import React, { useState, useEffect } from 'react';
import Header from './component/Header';
import Balance from './component/Balance';
import IncomeExpenses from './component/IncomeExpenses';
import TransactionList from './component/TransactionList';
import AddTransaction from './component/AddTransaction';
import './App.css'
const App = () => {
  const [transactions, setTransactions] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Calculate balance, income, expense
  const amounts = transactions.map(transaction => transaction.amount);
  const balance = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

  // Add transaction
  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      ...transaction
    };
    setTransactions([newTransaction, ...transactions]);
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  return (
    <div>
      <Header />
      <div className="container">
        <Balance balance={balance} />
        <IncomeExpenses income={income} expense={expense} />
        <TransactionList 
          transactions={transactions} 
          deleteTransaction={deleteTransaction} 
        />
        <AddTransaction addTransaction={addTransaction} />
      </div>
    </div>
  );
};

export default App;
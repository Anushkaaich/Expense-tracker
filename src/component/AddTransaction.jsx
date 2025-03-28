import React, { useState } from 'react';
import "./AddTransaction.css"
const AddTransaction = ({ addTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('income'); // 'income' or 'expense'

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!description || !amount) return;

    const numericAmount = transactionType === 'income' ? 
      Math.abs(+amount) : 
      -Math.abs(+amount);

    const newTransaction = {
      text: description,
      amount: numericAmount
    };

    addTransaction(newTransaction);
    setDescription('');
    setAmount('');
  };

  return (
    <div>
      <h3>Add New Transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="description">Transaction Description</label>
          <input 
            type="text" 
            id="description"
            placeholder='e.g. Groceries, Salary, Rent' 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required
          />
        </div>
        
        <div className="form-control">
          <label>Transaction Type</label>
          <div className="toggle-container">
            <button
              type="button"
              className={`toggle-option ${transactionType === 'income' ? 'active' : ''}`}
              onClick={() => setTransactionType('income')}
            >
              Income
            </button>
            <button
              type="button"
              className={`toggle-option ${transactionType === 'expense' ? 'active' : ''}`}
              onClick={() => setTransactionType('expense')}
            >
              Expense
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input 
            type="number" 
            id="amount"
            placeholder='Enter amount' 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            min="0"
            step="1"
            required
          />
        </div>
        
        <button className='btn' type="submit">
          Add {transactionType === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
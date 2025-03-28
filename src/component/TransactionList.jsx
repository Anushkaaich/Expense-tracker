import React from 'react';

const TransactionList = ({ transactions, deleteTransaction }) => {
  const downloadCSV = () => {
    // CSV header
    let csv = 'Type,Description,Amount\n';
    
    // Add each transaction
    transactions.forEach(transaction => {
      const type = transaction.amount > 0 ? 'Income' : 'Expense';
      csv += `${type},"${transaction.text}",${transaction.amount}\n`;
    });

    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    link.click();
  };
  return (
    <div>
       <div className="list-header">
        <h3>History</h3>
        {transactions.length > 0 && (
          <div className="download-options">
            <button onClick={downloadCSV} className="download-btn">
              <span role="img" aria-label="download">⬇️</span> Download
            </button>
          </div>
        )}
      </div>
      <ul id="list" className="list">
        {transactions.map(transaction => (
          <li 
            key={transaction.id} 
            className={transaction.amount < 0 ? 'minus' : 'plus'}
          >
            {transaction.text} 
            <span>${Math.abs(transaction.amount).toFixed(2)}</span>
            <button 
              className="delete-btn" 
              onClick={() => deleteTransaction(transaction.id)}
              aria-label={`Delete ${transaction.text} transaction`}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
// DownloadButton.js
import React from 'react';

const DownloadButton = ({ transactions }) => {
  const downloadCSV = () => {
    // CSV header
    let csv = 'Type,Description,Amount,Date\n';
    
    // Add each transaction
    transactions.forEach(transaction => {
      const type = transaction.amount > 0 ? 'Income' : 'Expense';
      const date = new Date().toLocaleDateString(); // Add timestamp if needed
      csv += `${type},"${transaction.text}",${transaction.amount},${date}\n`;
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
    <button 
      onClick={downloadCSV}
      className="download-btn"
      disabled={transactions.length === 0}
    >
      Download Transactions (CSV)
    </button>
  );
};

export default DownloadButton;
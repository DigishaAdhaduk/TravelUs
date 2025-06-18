import React, { useState } from 'react';

export default function AddExpenses() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');

  const handleAddExpense = () => {
    if (title && amount && paidBy) {
      console.log({ title, amount, paidBy });
      setTitle('');
      setAmount('');
      setPaidBy('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-[#192166] mb-4">Add Expense</h2>
      <input
        type="text"
        placeholder="Expense Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Paid By"
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
      />
      <button
        onClick={handleAddExpense}
        className="w-full bg-[#192166] text-white py-2 rounded hover:bg-[#3c448f]"
      >
        Add Expense
      </button>
    </div>
  );
}

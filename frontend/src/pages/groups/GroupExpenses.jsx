import React, { useState } from "react";

const dummyExpenses = [
  { title: "Hotel", amount: 3200, paidBy: "You", date: "2025-06-11" },
  { title: "Dinner", amount: 1400, paidBy: "Alice", date: "2025-06-10" },
  { title: "Cab", amount: 600, paidBy: "Bob", date: "2025-06-09" },
];

const groupMembers = ["You", "Alice", "Bob"];

export default function GroupExpenses() {
  const [expenses, setExpenses] = useState(dummyExpenses);
  const [form, setForm] = useState({ title: "", amount: "", paidBy: "" });
  const [filter, setFilter] = useState("All");

  const handleAddExpense = () => {
    if (form.title && form.amount && form.paidBy) {
      setExpenses([
        ...expenses,
        { ...form, amount: parseFloat(form.amount), date: new Date().toISOString().slice(0, 10) },
      ]);
      setForm({ title: "", amount: "", paidBy: "" });
    }
  };

  const handleDelete = (index) => {
    const newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);
  };

  const handleEdit = (index) => {
    const toEdit = expenses[index];
    setForm({ title: toEdit.title, amount: toEdit.amount.toString(), paidBy: toEdit.paidBy });
    handleDelete(index);
  };

  const filteredExpenses = filter === "All" ? expenses : expenses.filter((e) => e.paidBy === filter);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const perPerson = (total / groupMembers.length).toFixed(2);
  const contributions = groupMembers.map((member) => {
    const paid = expenses
      .filter((e) => e.paidBy === member)
      .reduce((sum, e) => sum + e.amount, 0);
    return { member, paid, balance: (paid - perPerson).toFixed(2) };
  });

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-8 text-[#192166]">
      <h2 className="text-3xl font-bold mb-6">Group Expenses</h2>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Add New Expense</h3>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Title"
            className="p-3 rounded-md border border-gray-300"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="p-3 rounded-md border border-gray-300"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <select
            className="p-3 rounded-md border border-gray-300"
            value={form.paidBy}
            onChange={(e) => setForm({ ...form, paidBy: e.target.value })}
          >
            <option value="">Paid by</option>
            {groupMembers.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAddExpense}
          className="mt-4 bg-[#192166] text-white px-6 py-2 rounded-md hover:bg-[#101547]"
        >
          Add Expense
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Expense List</h3>
          <select
            className="p-2 rounded-md border border-gray-300"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            {groupMembers.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <ul className="divide-y divide-gray-200">
          {filteredExpenses.map((exp, idx) => (
            <li key={idx} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{exp.title}</p>
                <p className="text-sm text-gray-500">
                  Paid by {exp.paidBy} on {exp.date}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-semibold">₹{exp.amount.toFixed(2)}</p>
                <button
                  onClick={() => handleEdit(idx)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Balance Summary</h3>
        <ul className="divide-y divide-gray-200">
          {contributions.map(({ member, paid, balance }) => (
            <li key={member} className="py-2 flex justify-between">
              <span>{member}</span>
              <span>
                Paid: ₹{paid.toFixed(2)} | Balance:
                <span className={balance >= 0 ? "text-green-600" : "text-red-600"}> ₹{balance}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
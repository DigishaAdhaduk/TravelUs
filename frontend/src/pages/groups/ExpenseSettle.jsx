import React, { useState } from "react";

const members = [
  { name: "Alice" },
  { name: "Bob" },
  { name: "Charlie" },
];

export default function ExpenseSettle() {
  const [payer, setPayer] = useState("");
  const [payee, setPayee] = useState("");
  const [amount, setAmount] = useState("");
  const [settlements, setSettlements] = useState([]);

  const handleSettle = () => {
    if (payer && payee && amount && payer !== payee) {
      setSettlements([...settlements, { payer, payee, amount }]);
      setPayer("");
      setPayee("");
      setAmount("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-[#192166] mb-6">Settle Expenses</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
        <div className="mb-4">
          <label className="block font-medium mb-2 text-[#192166]">Who is paying?</label>
          <select
            value={payer}
            onChange={(e) => setPayer(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Member</option>
            {members.map((m) => (
              <option key={m.name} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2 text-[#192166]">Who received the amount?</label>
          <select
            value={payee}
            onChange={(e) => setPayee(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Member</option>
            {members.map((m) => (
              <option key={m.name} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2 text-[#192166]">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          onClick={handleSettle}
          className="bg-[#192166] text-white px-4 py-2 rounded hover:bg-[#2a3180]"
        >
          Settle
        </button>
      </div>

      {settlements.length > 0 && (
        <div className="mt-10 max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold text-[#192166] mb-4">Settled Transactions</h2>
          <ul className="space-y-2">
            {settlements.map((s, idx) => (
              <li
                key={idx}
                className="bg-white rounded p-3 shadow text-gray-700 border-l-4 border-green-500"
              >
                {s.payer} paid ₹{s.amount} to {s.payee}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

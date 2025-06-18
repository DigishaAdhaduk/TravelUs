import React from "react";

const dummyExpenses = [
  { name: "Alice", paid: 3000, owes: 1000 },
  { name: "Bob", paid: 1000, owes: 2000 },
  { name: "Charlie", paid: 2000, owes: 3000 },
];

export default function ExpenseBalance() {
  const netBalances = dummyExpenses.map((person) => ({
    name: person.name,
    balance: person.paid - person.owes,
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-[#192166] mb-6">Expense Balance</h2>
        <div className="space-y-4">
          {netBalances.map((person, idx) => (
            <div
              key={idx}
              className={`flex justify-between items-center border-l-4 px-4 py-3 rounded shadow ${
                person.balance > 0
                  ? "border-green-500 bg-green-50"
                  : person.balance < 0
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <span className="text-lg font-medium text-[#192166]">{person.name}</span>
              <span
                className={`text-md font-semibold ${
                  person.balance > 0
                    ? "text-green-600"
                    : person.balance < 0
                    ? "text-red-600"
                    : "text-gray-700"
                }`}
              >
                {person.balance > 0
                  ? `Gets ₹${person.balance}`
                  : person.balance < 0
                  ? `Owes ₹${Math.abs(person.balance)}`
                  : "Settled"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

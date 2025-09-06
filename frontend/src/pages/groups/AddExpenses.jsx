import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Receipt, IndianRupee } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { expensesAPI } from "../../services/api";
import { formatAmount, parseAmount, isValidAmount } from "../../utils/currency";

const AddExpenses = () => {
  const navigate = useNavigate();
  const { id: groupId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Expense title is required");
      return;
    }

    const amount = parseAmount(formData.amount);
    if (!isValidAmount(formData.amount)) {
      setError("Please enter a valid amount (₹1 to ₹1,00,00,000)");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // EXPENSE_API.ADD - POST /expenses/add to create new shared expense
      await expensesAPI.addExpense(
        parseInt(groupId),
        formData.title.trim(),
        amount,
      );

      // Navigate back to group details
      navigate(`/groups/${groupId}`);
    } catch (err) {
      setError(err.message || "Failed to add expense. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-travel-blue/5">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />

        <div className="flex-1 ml-64 p-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate(`/groups/${groupId}`)}
              className="flex items-center gap-2 text-travel-blue hover:text-travel-purple mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Group
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-travel-blue/10 rounded-xl flex items-center justify-center">
                <Receipt className="text-travel-blue" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Add Expense
                </h1>
                <p className="text-gray-600">
                  Record a new shared expense for the group
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="max-w-2xl">
            <div className="bg-white rounded-2xl shadow-sm border border-travel-blue/10 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Expense Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expense Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-travel-blue/20 rounded-lg focus:ring-2 focus:ring-travel-blue focus:border-travel-blue"
                    placeholder=""
                    required
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IndianRupee className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      step="0.01"
                      min="1"
                      max="10000000"
                      className="w-full pl-10 pr-4 py-3 border border-travel-blue/20 rounded-lg focus:ring-2 focus:ring-travel-blue focus:border-travel-blue"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    This amount will be split equally among all group members
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-travel-blue text-white px-8 py-3 rounded-lg hover:bg-travel-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Receipt size={20} />
                        Add Expense
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate(`/groups/${groupId}`)}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpenses;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Receipt, Plus, IndianRupee, Users } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { expensesAPI } from "../../services/api";
import { formatAmount } from "../../utils/currency";

const GroupExpenses = () => {
  const navigate = useNavigate();
  const { id: groupId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState({ youOwe: [], youAreOwed: [] });
  const [settlements, setSettlements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("expenses");

  useEffect(() => {
    loadExpenseData();
  }, [groupId]);

  const loadExpenseData = async () => {
    try {
      setIsLoading(true);
      // Load all expense data in parallel for better performance
      const [expensesData, balanceData, settlementsData] = await Promise.all([
        expensesAPI.getGroupExpenses(parseInt(groupId)), // EXPENSE_API.LIST - GET /expenses/group/{groupId}
        expensesAPI.getGroupBalance(parseInt(groupId)), // EXPENSE_API.BALANCE - GET /expenses/group/{groupId}/balance
        expensesAPI.getSettlements(parseInt(groupId)), // EXPENSE_API.SETTLE - GET /expenses/group/{groupId}/settle
      ]);

      setExpenses(expensesData);
      setBalance(balanceData);
      setSettlements(settlementsData);
    } catch (error) {
      console.error("Error loading expense data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "expenses", label: "Expenses", icon: Receipt },
    { id: "balances", label: "Balances", icon: Users },
    { id: "settlements", label: "Settle Up", icon: IndianRupee },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-travel-blue/5">
        <Navbar />
        <div className="flex pt-16">
          <Sidebar />
          <div className="flex-1 ml-64 p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-travel-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-travel-blue/70">Loading expenses...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-travel-blue/10 rounded-xl flex items-center justify-center">
                  <Receipt className="text-travel-blue" size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Group Expenses
                  </h1>
                  <p className="text-gray-600">
                    Track and manage shared expenses
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/expenses/add")}
                className="flex items-center gap-2 bg-travel-blue text-white px-6 py-2 rounded-lg hover:bg-travel-purple transition-colors"
              >
                <Plus size={18} />
                Add Expense
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-travel-blue/10 mb-8">
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-travel-blue text-travel-blue"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="p-6">
              {/* Expenses Tab */}
              {activeTab === "expenses" && (
                <div>
                  {expenses.length === 0 ? (
                    <div className="text-center py-12">
                      <Receipt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No expenses yet
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Add your first expense to start tracking
                      </p>
                      <button
                        onClick={() => navigate("/expenses/add")}
                        className="bg-travel-blue text-white px-4 py-2 rounded-lg hover:bg-travel-purple transition-colors"
                      >
                        Add Expense
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {expenses.map((expense, index) => (
                        <div
                          key={index}
                          className="p-4 border border-travel-blue/20 rounded-xl hover:border-travel-blue hover:bg-travel-blue/5 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {expense.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Paid by {expense.paidBy}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-travel-blue">
                                {formatAmount(expense.amount)}
                              </p>
                              <p className="text-sm text-gray-600">
                                {expense.shares.length} members
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Balances Tab */}
              {activeTab === "balances" && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* You Owe */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">
                        You Owe
                      </h3>
                      {balance.youOwe.length === 0 ? (
                        <p className="text-gray-500">You don't owe anyone</p>
                      ) : (
                        <div className="space-y-3">
                          {balance.youOwe.map((debt, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                            >
                              <span className="font-medium text-gray-900">
                                {debt.username}
                              </span>
                              <span className="font-bold text-red-600">
                                {formatAmount(debt.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* You Are Owed */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">
                        You Are Owed
                      </h3>
                      {balance.youAreOwed.length === 0 ? (
                        <p className="text-gray-500">No one owes you</p>
                      ) : (
                        <div className="space-y-3">
                          {balance.youAreOwed.map((credit, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                            >
                              <span className="font-medium text-gray-900">
                                {credit.username}
                              </span>
                              <span className="font-bold text-green-600">
                                {formatAmount(credit.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Settlements Tab */}
              {activeTab === "settlements" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Suggested Settlements
                  </h3>
                  {settlements.length === 0 ? (
                    <p className="text-gray-500">
                      All expenses are settled up!
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {settlements.map((settlement, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-travel-blue/20 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {settlement.from} should pay {settlement.to}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-travel-blue">
                              {formatAmount(settlement.amount)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupExpenses;

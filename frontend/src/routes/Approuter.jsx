import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import GroupList from "../pages/groups/GroupList";
import CreateGroup from "../pages/groups/CreateGroup";
import JoinGroup from "../pages/groups/JoinGroup";
import GroupDetails from "../pages/groups/GroupDetails";
import GroupDocuments from "../pages/groups/GroupDocuments";
import GroupExpenses from "../pages/groups/GroupExpenses";
import AddExpenses from "../pages/groups/AddExpenses";
import ExpenseBalance from "../pages/groups/ExpenseBalance";
import ExpenseSettle from "../pages/groups/ExpenseSettle";
import GroupChat from "../pages/groups/GroupChat";
import InvitePage from "../pages/groups/InvitePage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/groups" element={<GroupList />} />
        <Route path="/groups/create" element={<CreateGroup />} />
        <Route path="/groups/join" element={<JoinGroup />} />
        <Route path="/groups/:id" element={<GroupDetails />} />
        <Route path="/groups/:id/documents" element={<GroupDocuments />} />
        <Route path="/groups/:id/expenses" element={<GroupExpenses />} />
        <Route path="/groups/:id/expenses/add" element={<AddExpenses />} />
        <Route path="/groups/:id/balance" element={<ExpenseBalance />} />
        <Route path="/groups/:id/settle" element={<ExpenseSettle />} />
        <Route path="/groups/:id/chat" element={<GroupChat />} />
        <Route path="/groups/:id/invite" element={<InvitePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
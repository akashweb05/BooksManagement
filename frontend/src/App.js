import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import BookList from "./Components/BookList";
import AddBook from "./Components/AddBook";
import EditBook from "./Components/EditBook";

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

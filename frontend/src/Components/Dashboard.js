import React from "react";
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container text-center mt-5">
    <h1 className="mb-4">Dashboard</h1>

    <div className="d-flex justify-content-center">
      <Link to={"/booklist"} className="btn btn-primary btn-lg mx-2">
        Go to BookList
      </Link>

      <Link to={"/addbook"} className="btn btn-success btn-lg mx-2">
        Go to AddBook
      </Link>
    </div>
  </div>
);
}

export default Dashboard;

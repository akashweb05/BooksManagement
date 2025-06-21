import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddBook(props) {
  const [book, setBook] = useState({ Name: "", Description: "" });
  const navigate = useNavigate();
  const apiUrl = "https://localhost:7128/api/Books";

  const AddNewBook = (e) => {
    e.preventDefault();
    const data = { Name: book.Name, Description: book.Description };

    axios
      .post(apiUrl, data)
      .then(() => {
        navigate("/booklist");
      })
      .catch((error) => {
        console.error("There was an error adding the book!", error);
      });
  };

  const onChange = (e) => {
    //e.persist();
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add a New Book</h2>
      <form onSubmit={AddNewBook} className="form-group">
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="Name"
            id="Name"
            className="form-control"
            placeholder="Enter book name"
            value={book.Name}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <input
            type="text"
            name="Description"
            id="Description"
            className="form-control"
            placeholder="Enter book description"
            value={book.Description}
            onChange={onChange}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <Link to="/dashboard" className="btn btn-secondary">
            Go to Dashboard
          </Link>
        </div>
      </form>
    </div>
  );
}
export default AddBook;

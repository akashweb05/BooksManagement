import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditBook() {
  const [book, setBook] = useState({ name: "", description: "", author: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  const url = `https://localhost:7128/api/Books/${id}`;
  useEffect(() => {
    const GetData = async () => {
      try {
        const result = await axios.get(url);
        console.log("API Response:", result.data);
        setBook(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    GetData();
  }, [url]);

  const onChange = (e) => {
    //e.persist();
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const EditBook = (e) => {
    e.preventDefault();
    const data = {
      id: id, 
      name: book.name,
      description: book.description,
      author: book.author,
    };

    console.log("Sending data to server:", data);

    axios
      .put(url, data)
      .then((response) => {
        console.log("Book updated successfully:", response);
        navigate("/booklist");
      })
      .catch((error) => {
        console.error("Error updating the book:", error.response || error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Book</h2>
      <form onSubmit={EditBook} className="form-group">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Enter book name"
            value={book.name}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            className="form-control"
            placeholder="Enter book author"
            value={book.author}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="form-control"
            placeholder="Enter book description"
            value={book.description}
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

export default EditBook;

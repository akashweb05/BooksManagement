import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function BookList() {
  const navigate = useNavigate();

  // State
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  //  Fetch books from API
  const fetchBooks = async () => {
    try {
      const response = await axios.get("https://localhost:7128/api/Books", {
        params: {
          search,
          page,
          pageSize,
          sortBy,
          sortOrder,
        },
      });

      setBooks(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Call when filters change
  useEffect(() => {
    fetchBooks();
  }, [search, page, sortBy, sortOrder]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7128/api/Books/${id}`);
      fetchBooks(); // refresh list after deletion
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span
          key={index}
          style={{ backgroundColor: "yellow", fontWeight: "bold" }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-success">Book List</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, author, or description"
        className="form-control mb-3"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset to page 1 on search
        }}
      />

      {/* Table */}
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th onClick={() => handleSort("name")}>
              Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("author")}>
              Author {sortBy === "author" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No books found.
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id}>
                <td>{highlightText(book.name, search)}</td>
                <td>{highlightText(book.author, search)}</td>
                <td
                  style={{
                    maxWidth: "300px",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {highlightText(book.description, search)}
                </td>
                <td>
                  <button
                    onClick={() => navigate("/edit/" + book.id)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-outline-secondary"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-outline-secondary"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      
<div className="d-flex justify-content-center my-3">
  {/* Show first page if not on first or second */}
  {page > 2 && (
    <>
      <button
        className="btn btn-sm mx-1 btn-outline-primary"
        onClick={() => setPage(1)}
      >
        1
      </button>
      {page > 3 && <span className="mx-1">...</span>}
    </>
  )}

  {/* Show previous page if not on first */}
  {page > 1 && (
    <button
      className="btn btn-sm mx-1 btn-outline-primary"
      onClick={() => setPage(page - 1)}
    >
      {page - 1}
    </button>
  )}

  {/* Always show current page */}
  <button
    className="btn btn-sm mx-1 btn-primary"
    disabled
  >
    {page}
  </button>

  {/* Show next page if not on last */}
  {page < totalPages && (
    <button
      className="btn btn-sm mx-1 btn-outline-primary"
      onClick={() => setPage(page + 1)}
    >
      {page + 1}
    </button>
  )}

  {/* Show ellipsis and last page if needed */}
  {page < totalPages - 1 && (
    <>
      {page < totalPages - 2 && <span className="mx-1">...</span>}
      <button
        className="btn btn-sm mx-1 btn-outline-primary"
        onClick={() => setPage(totalPages)}
      >
        {totalPages}
      </button>
    </>
  )}
</div>

      {/* 🔗 Navigation */}
      <div className="mt-4">
        <Link to="/dashboard" className="btn btn-primary me-3">
          Go to Dashboard
        </Link>
        <Link to="/addbook" className="btn btn-success">
          Add New Book
        </Link>
      </div>
    </div>
  );
}

export default BookList;

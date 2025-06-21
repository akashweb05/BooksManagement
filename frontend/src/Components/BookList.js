import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function BookList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const GetData = async () => {
      try {
        const result = await axios.get("https://localhost:7128/api/Books");
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    GetData();
  }, []);

  const DeleteBook = async (id) => {
    try {
      await axios.delete(`https://localhost:7128/api/Books/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("There was an error deleting the book:", error);
    }
  };
  const EditBook = (id) => {
    navigate("/edit/" + id);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-success">Book List</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th colSpan={3}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td
                  style={{
                    maxWidth: "300px",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {item.description}
                </td>
                <td>
                  <button
                    onClick={() => EditBook(item.id)}
                    className="btn btn-warning btn-sm mr-2"
                  >
                    Edit
                  </button>{" "}
                  <button
                    onClick={() => DeleteBook(item.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3">
        <Link to="/dashboard" className="btn btn-primary mr-3">
          Go to Dashboard
        </Link>
        <Link to="/addbook" className="btn btn-success">
          Go to AddBook
        </Link>
      </div>
    </div>
  );
}

export default BookList;

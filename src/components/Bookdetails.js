import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt,  } from 'react-icons/fa'; 
import { MdModeEdit } from "react-icons/md";

function Bookdetails() {
  const [books, setBooks] =  useState([]);


  useEffect(() => {
    axios.get('http://localhost:8081/getbooks')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("Error fetching books:", error);
      });
  }, []);

  


  const handleDeleteClick = (bookId) => {
   
    axios.delete(`http://localhost:8081/deletebooks/${bookId}`)
      .then(response => {
        console.log(response.data); // Log the response message
        // Remove deleted book from the state
        setBooks(books.filter(book => book.bookId !== bookId));
      })
      .catch(error => {
        console.error("Error deleting book:", error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-11 sticky top-0 bg-white  z-10">
        Book Collections
      </h1>

      {/* Scrollable content area */}
      <div className="space-y-6 max-h-[80vh] overflow-y-auto">
        {books.map(book => (
          <div
            key={book.bookId}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-wrap p-4 border border-gray-300"
          >
            {/* Book Cover Image (Left column) */}
            <div className="w-56 h-64 min-w-[220px] mr-4"> {/* Added mr-4 for gap */}
              <img
                src={book.bookCoverImage || "https://via.placeholder.com/150"}
                alt={book.title}
                className="w-full h-full object-fill rounded-lg"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = "https://via.placeholder.com/150"; // Fallback image
                }}
              />
            </div>

            {/* Book Details (Middle column) */}
            <div className="flex flex-col justify-between w-96 h-64 flex-grow min-w-[300px]">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{book.title}</h2>
              <p className="text-sm mb-2">
                <strong className="text-blue-700">Author:</strong> {book.author}
              </p>
              <p className="text-sm mb-2">
                <strong className="text-blue-700">Genre:</strong> {book.genre}
              </p>
              <p className="text-gray-800 text-sm mb-2">
                <strong className="text-blue-700">Price:</strong> ${book.price.toFixed(2)}
              </p>

              {/* Badge-like Details */}
              <div className="flex flex-wrap space-x-2">
                <span className="w-45 py-1 px-3 bg-gray-200 text-gray-800 font-bold text-xs rounded-xl">
                  {book.language}
                </span>
                <span className="w-45 py-1 px-3 bg-gray-200 text-gray-800 font-bold text-xs rounded-xl">
                  {book.edition}
                </span>
                <span className="w-45 py-1 px-3 bg-gray-200 text-gray-800 font-bold text-xs rounded-xl">
                  {book.bookFormat}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm mt-4">
                <strong>Description:</strong> {book.description}
              </p>
            </div>

            {/* Edit & Delete Icons (Right column) */}
            <div className="flex flex-col items-center justify-start space-y-2 ml-auto">
              <button
                onClick={() => handleDeleteClick(book.bookId)} // Delete book by ID
                className="bg-red-500 text-white p-5 rounded-lg hover:bg-red-600"
              >
                <FaTrashAlt />
              </button>
              <button
                onClick={() => alert('Edit feature coming soon!')} // Placeholder for Edit functionality
                className="bg-black text-white p-4 text-2xl  rounded-lg hover:bg-yellow-500"
              >
                <MdModeEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookdetails;

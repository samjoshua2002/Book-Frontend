import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "FICTION",
    publisher: "",
    publicationDate: "",
    price: "",
    costPrice: "",
    stockQuantity: "",
    language: "ENGLISH",
    edition: "",
    pageCount: "",
    bookFormat: "HARDCOVER",
    description: "",
    bookCoverImage: "",
    recipient: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);

    try {
      
      const response = await axios.post(
        "http://localhost:8081/addbooks",
        formData
      );

      if (response.status === 200) {
        alert("Book added successfully!");

        
        const mailData = {
          recipient: formData.recipient,
          subject: `New Book added now: ${formData.title}`, 
          body:  `
         New Book Info:
    
    Title: ${formData.title}
    Author: ${formData.author}
    ISBN: ${formData.isbn}
    Genre: ${formData.genre}
    Publisher: ${formData.publisher}
    Publication Date: ${formData.publicationDate}
    Price: $${formData.price}
    Stock Quantity: ${formData.stockQuantity}
    Language: ${formData.language}
    Edition: ${formData.edition}
    Page Count: ${formData.pageCount}
    Book Format: ${formData.bookFormat}
    Description: ${formData.description}

    For more details, visit: ${formData.isbn}
        `
        };

        
        const emailResponse = await axios.post(
          "http://localhost:8081/email/send",
          mailData
        );

        if (emailResponse.status === 200) {
          alert("Email sent successfully!");
        }
      }
    } catch (error) {
      console.error("There was an error:", error);
      alert("Failed to add book or send email.");
    }
  };

  const clearForm = () => {
    setFormData({
      title: "",
      author: "",
      isbn: "",
      genre: "FICTION",
      publisher: "",
      publicationDate: "",
      price: "",
      costPrice: "",
      stockQuantity: "",
      language: "ENGLISH",
      edition: "",
      pageCount: "",
      bookFormat: "HARDCOVER",
      description: "",
      bookCoverImage: "",
      recipient: "",
    });
  };

  return (
    <div className="flex justify-center items-center bg-white">
      <div className="w-full bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 sticky top-0 bg-white z-10">
          Book Management
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto max-h-[80vh]">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-800">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter book title"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-800">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter author's name"
              required
            />
          </div>

          {/* Recipient */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-800">Recipient Email</label>
            <input
              type="email"
              id="recipient"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter recipient's email"
              required
            />
          </div>

          {/* ISBN */}
          <div>
            <label htmlFor="isbn" className="block mb-1 text-sm font-medium text-gray-800">ISBN</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter ISBN"
              required
            />
          </div>

          {/* Genre (Dropdown) */}
          <div>
            <label htmlFor="genre" className="block mb-1 text-sm font-medium text-gray-800">Genre</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
               <option value="FICTION">Fiction</option>
              <option value="NON_FICTION">Non-Fiction</option>
              <option value="MYSTERY">Mystery</option>
              <option value="FANTASY">Fantasy</option>
              <option value="SCIENCE_FICTION">Science Fiction</option>
              <option value="ROMANCE">Romance</option>
              <option value="THRILLER">Thriller</option>
              <option value="BIOGRAPHY">Biography</option>
              <option value="HISTORY">History</option>
              <option value="CHILDREN">Children</option>
            </select>
          </div>

          {/* Publisher */}
          <div>
            <label htmlFor="publisher" className="block mb-1 text-sm font-medium text-gray-800">Publisher</label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter publisher"
            />
          </div>

          {/* Publication Date */}
          <div>
            <label htmlFor="publicationDate" className="block mb-1 text-sm font-medium text-gray-800">Publication Date</label>
            <input
              type="date"
              id="publicationDate"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter publication date"
            />
          </div>

          {/* Price and Stock Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-800">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <label htmlFor="stockQuantity" className="block mb-1 text-sm font-medium text-gray-800">Stock Quantity</label>
              <input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter stock quantity"
                required
              />
            </div>
          </div>

          {/* Language and Edition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="language" className="block mb-1 text-sm font-medium text-gray-800">Language</label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                 <option value="ENGLISH">English</option>
                <option value="SPANISH">Spanish</option>
                <option value="FRENCH">French</option>
                <option value="GERMAN">German</option>
                <option value="ITALIAN">Italian</option>
                <option value="PORTUGUESE">Portuguese</option>
                <option value="RUSSIAN">Russian</option>
                <option value="CHINESE">Chinese</option>
                <option value="JAPANESE">Japanese</option>
                <option value="ARABIC">Arabic</option>
              </select>
            </div>

            <div>
              <label htmlFor="edition" className="block mb-1 text-sm font-medium text-gray-800">Edition</label>
              <input
                type="text"
                id="edition"
                name="edition"
                value={formData.edition}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter edition"
              />
            </div>
          </div>

          {/* Page Count and Format */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pageCount" className="block mb-1 text-sm font-medium text-gray-800">Page Count</label>
              <input
                type="number"
                id="pageCount"
                name="pageCount"
                value={formData.pageCount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter page count"
              />
            </div>

            <div>
              <label htmlFor="bookFormat" className="block mb-1 text-sm font-medium text-gray-800">Book Format</label>
              <select
                id="bookFormat"
                name="bookFormat"
                value={formData.bookFormat}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="HARDCOVER">Hardcover</option>
                <option value="PAPERBACK">Paperback</option>
                <option value="EBOOK">Ebook</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-800">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter book description"
              rows="4"
            />
          </div>

          {/* Book Cover Image */}
          <div>
            <label htmlFor="bookCoverImage" className="block mb-1 text-sm font-medium text-gray-800">Book Cover Image</label>
            <input
              type="text"
              id="bookCoverImage"
              name="bookCoverImage"
              value={formData.bookCoverImage}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter image URL"
            />
          </div>

          <div className="flex justify-center gap-5 mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="px-6 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition duration-300"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;

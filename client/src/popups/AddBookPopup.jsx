import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../store/slices/bookSlice";
import { toggleAddBookPopup } from "../store/slices/popUpSlice";

const AddBookPopup = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const handleAddBook = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("author", author);
    data.append("price", price);
    data.append("quantity", quantity);
    data.append("description", description);
    dispatch(addBook(data));
  };
  return (
    <>
      <title>Add Book - BookWorm Library</title>
      <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
        <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Add Book</h3>
            <form onSubmit={handleAddBook}>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium">
                  Book Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter book title"
                  className="w-full border-2 border-black rounded-md px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium">
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                  className="w-full border-2 border-black rounded-md px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium">
                  Price(Price for borrowing)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  className="w-full border-2 border-black rounded-md px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  className="w-full border-2 border-black rounded-md px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  className="w-full border-2 border-black rounded-md px-4 py-2"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => dispatch(toggleAddBookPopup())}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
                <button
                  type="submit"
                  onClick={handleAddBook}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBookPopup;

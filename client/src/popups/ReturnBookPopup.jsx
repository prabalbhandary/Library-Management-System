import React from "react";
import { useDispatch } from "react-redux";
import { returnBorrowedBooks } from "../store/slices/borrowSlice";
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";

const ReturnBookPopup = ({ bookId, email }) => {
  const dispatch = useDispatch();
  const handleReturnBook = (e) => {
    e.preventDefault();
    dispatch(returnBorrowedBooks(email, bookId));
    dispatch(toggleReturnBookPopup());
  };
  return (
    <>
      <title>Return Book - BookWorm Library</title>
      <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
        <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Return Book</h3>
            <form onSubmit={handleReturnBook}>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium">Email</label>
                <input
                  type="email"
                  defaultValue={email}
                  placeholder="Enter email"
                  className="w-full border-2 border-black rounded-md px-4 py-2"
                  disabled
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => dispatch(toggleReturnBookPopup())}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Return
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnBookPopup;

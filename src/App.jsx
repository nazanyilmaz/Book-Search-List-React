import "./App.css";
import { useState } from "react";
import BookCard from "./components/BookCard";
import { toast } from "react-toastify";
import EditModal from "./components/EditModal";

function App() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookName) {
      return toast.warning("Please add a book!", { autoClose: 1500 });
    }

    const newBook = {
      id: new Date().getTime(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };
    //console.log(newBook);

    setBooks([...books, newBook]);

    setBookName("");

    toast.success("Book added", { autoClose: 1500 });
  };

  const handleModel = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = (deletingId) => {
    const filtred = books.filter((item) => item.id !== deletingId);

    setBooks(filtred);
    toast.error("Book deleted", { autoClose: 1500 });
  };

  const handleRead = (book) => {
    const updatedBook = { ...book, isRead: !book.isRead };
    const cloneBooks = [...books];

    const index = cloneBooks.findIndex((item) => item.id === book.id);

    cloneBooks.splice(index, 1, updatedBook);

    setBooks(cloneBooks);

    toast.warning("Book updated", { autoClose: 1500 });
  };

  const handleEditBook = () => {
    const index = books.findIndex((book) => book.id === editItem.id);

    const cloneBooks = [...books];

    cloneBooks.splice(index, 1, editItem);

    setBooks(cloneBooks);

    setShowEditModal(false);
  };

  return (
    <div className="body">
      <div className="bg-dark text-light px-5 py-2 fs-5 text-center mb-4 title">
        <span className="worm"></span>Book-Worm <span className="worm"></span>
      </div>
      <div className="container ">
        <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4">
          <input
            onChange={(e) => setBookName(e.target.value)}
            value={bookName}
            type="text"
            className="form-control shadow"
          />
          <button className="btn btn-warning shadow">Add</button>
        </form>
        <div className="d-flex flex-column gap-3 py-5">
          {books.length === 0 && <h4>no items...</h4>}
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              handleModel={handleModel}
              handleRead={handleRead}
              setShowEditModal={setShowEditModal}
              setEditItem={setEditItem}
            />
          ))}
        </div>
      </div>
      {showConfirm && (
        <div className="confirm-modal">
          <div className="modal-inner shadow">
            <h5>Are you sure about deleting?</h5>
            <button
              className="btn btn-warning"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDelete(deleteId);
                setShowConfirm(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          setEditItem={setEditItem}
          editItem={editItem}
          handleEditBook={handleEditBook}
        />
      )}
    </div>
  );
}

export default App;

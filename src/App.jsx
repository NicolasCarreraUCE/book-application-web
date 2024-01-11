import './App.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookTable from './components/BookTable';
import BookForm from './components/BookForm';

function App() {
  const [book, setBook] = useState([])
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <div className="flex justify-between items-center p-4">
              <h1 className="text-2xl font-bold">Books</h1>
              <Link to="/add-book" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                + Book
              </Link>
            </div>
            <BookTable book={book} setBook={setBook}/>
          </>
        } />
        <Route path="/add-book" element={<BookForm book={book} setBook={setBook} />} />
      </Routes>
    </Router>
  );
}

export default App;
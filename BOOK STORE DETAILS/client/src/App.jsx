import React from 'react'
import { Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';

const App = () => {


  return (
    <div>

      <Routes>
        <Route path='/' element={<BookList />} />
        <Route path='/book-form' element={<BookForm />} />
        <Route path='/book-form/:id' element={<BookForm />} />
        <Route path='/book-details/:id' element={<BookDetails />} />
      </Routes>

    </div>
  )
}

export default App
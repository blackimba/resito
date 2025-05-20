import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateRecieptFormPage from './module/CreateReceiptFormPage';
import EditReceiptFormPage from './module/EditReceiptFormPage';
import ReceiptListPage from './module/ReceiptListPage';
import './App.css';

function App() {
  

  return (
    <Router>
      <div className='p-6 max-w-3xl mx-auto'>
        <h1 className='text-2xl font-bold mb-4'>Resito - A Receipt Collection App</h1>
        <Routes>
          <Route path='/' element = {<ReceiptListPage/>}/>
          <Route path='/create' element = {<CreateRecieptFormPage/>} />
          <Route path='/edit/:id' element = {<EditReceiptFormPage/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

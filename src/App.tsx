import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import CreateRecieptFormPage from './module/receipts/CreateReceiptFormPage';
import EditReceiptFormPage from './module/receipts/EditReceiptFormPage';
import ReceiptListPage from './module/receipts/ReceiptListPage';
import DashboardPage from './module/dashboard/DashboardPage';
import CategoryPage from './module/receipts/CategoryPage';
import ReceiptsLayout from './module/layout/ReceiptsLayout';
import SideBar from './components/SideBar';
import './App.css';

function App() {


  return (
    <Router>
      <div className='flex h-screen'>
        <SideBar />
        <main className='flex-1 p-6 bg-gray-50'>
          <h1 className='text-2xl font-bold mb-20'>Resito - A Receipt Collection App</h1>
          <Routes>
            <Route path='/' element={<DashboardPage />} />
            <Route path='/receipts' element={<ReceiptsLayout />} >
              <Route index element={<Navigate to="list" replace/>} />
              <Route path='list' element={<ReceiptListPage/>}/>
              <Route path='create' element={<CreateRecieptFormPage/>}/>
              <Route path='edit/:id' element={<EditReceiptFormPage/>}/>
              <Route path='category' element={<CategoryPage/>}/>
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

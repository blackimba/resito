import React, { useState } from 'react'
import RecieptForm from './module/RecieptForm';
import RecieptList from './module/RecieptList';
import { IReceipt } from './types/Receipt';
import './App.css';

function App() {
  const [receipts, setReceipts] = useState<IReceipt[]>([]);
  const [editingReceipt, setEditingReceipt] = useState<IReceipt | null>(null);

  const handleSaveReceipt = (receipt: IReceipt) => {

    if(editingReceipt) {
      
      let updatedReceipt = receipts.map(r => {
        if(r.id == receipt.id) {
          return receipt;
        }
        return r;
      });
      
      console.log("Updated Receipts: ", updatedReceipt);
      console.log("Original Receipts: ", receipts);
      setReceipts(updatedReceipt);
      setEditingReceipt(null);
    } else {
      setReceipts([...receipts, {...receipt }]);
    }
    
  }

  const handleEditReceipt = (receipt: IReceipt) => {
    setEditingReceipt(receipt);
  }

  const handleDelete = (index: string) => {

    const filteredReceipts = receipts.filter(r => r.id !== index);
    setReceipts(filteredReceipts);
  }

  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Resito - A Receipt Collection App</h1>
      <RecieptForm onSave={handleSaveReceipt} editingReceipt={editingReceipt}/>
      <RecieptList receipts={receipts} onDelete={handleDelete} onEdit={handleEditReceipt} />
    </div>
  )
}

export default App

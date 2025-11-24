import React, { useState } from 'react';
import { format } from 'date-fns';
import { IRecieptListProps } from '../types/Receipt';
import Pagination from './Pagination';



const RecieptList: React.FC<IRecieptListProps> = ({ 
    receipts, 
    onDelete, 
    onEdit,
    currentPage,
    itemsPerPage,
    totalItems,
    onPageChange,
    onItemsPerPageChange
}) => {
    
    return (
        <div>
            <table className='w-full table-auto border-collapse border border-gray-200'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='border p-2'>Date Purchased</th>
                        <th className='border p-2'>Item</th>
                        <th className='border p-2'>Location</th>
                        <th className='border p-2'>Quantity</th>
                        <th className='border p-2'>Unit Price</th>
                        <th className='border p-2'>Total Price</th>
                        <th className='border p-2'>Remark</th>
                        <th className='border p-2'>Discount</th>
                        <th className='border p-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {receipts.map((receipt) => (
                        <tr key={receipt.id} className='text-center'>
                            <td className='border p-2'>{format(receipt.datePurchase, 'dd MMMM yyyy')}</td>
                            <td className='border p-2'>{receipt.item}</td>
                            <td className='border p-2'>{receipt.location}</td>
                            <td className='border p-2'>{receipt.quantity}</td>
                            <td className='border p-2'>{receipt.unitPrice}</td>
                            <td className='border p-2'>{receipt.totalPrice}</td>
                            <td className='border p-2'>{receipt.remark}</td>
                            <td className='border p-2'>{receipt.discountAmount}</td>
                            <td className='border p-2'>
                                <button onClick={() => onEdit(receipt)} className='text-blue-500'>Edit</button>
                                <button onClick={() => onDelete(receipt.id)} className='text-red-500 ml-2'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                onPageChange={onPageChange}
                onItemsPerPageChange={onItemsPerPageChange}
            />
        </div>
    )
}

export default RecieptList;
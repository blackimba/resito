import React from 'react';
import { IPagination } from '../types/Receipt';

const Pagination: React.FC<IPagination> = ({ currentPage, itemsPerPage, totalItems, onPageChange, onItemsPerPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages === 0) return null; // Don't render pagination if there are no items


    return (
        <div className='flex justify-center mt-4 gap-2'>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            >
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                >
                    {index + 1}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            >
                Next
            </button>
            <select
                className='ml-4 border rounded px-2 py-1'
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            >
                {[5, 10, 20, 50].map(n => (
                    <option key={n} value={n}>{n}</option>
                ))}

            </select>
        </div>
    );
}

export default Pagination;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';

import { fetchReceipts, deleteReceipt, setQueryParams } from '../../redux/receiptSlice';

import ReceiptList from '../../components/ReceiptList';
import { IReceipt } from '../../types/Receipt';
import Modal from '../../components/Modal';
import { set } from 'date-fns';
const ReceiptListPage = () => {

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [searchText, setSearchText] = useState('');

    // Modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedReceiptId, setSelectedReceiptId] = useState<string | null>('');

    const dispatch = useDispatch<AppDispatch>();
    const { receipts, loading, error, currentPage, itemsPerPage, totalItems, queryParams } = useSelector((state: RootState) => state.receipts);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchReceipts({
            ...queryParams,
            page: currentPage,
            limit: itemsPerPage
        }));

    }, [dispatch, queryParams, currentPage, itemsPerPage]);

    const handleSearch = () => {
        dispatch(setQueryParams({
            ...queryParams,
            item: searchText,
            page: 1,
            dateFrom: dateFrom,
            dateTo: dateTo
        }));
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    

    const handleDelete = (id: string) => {
        setSelectedReceiptId(id);
        setShowDeleteModal(true);
    }

    const confirmDelete = async () => {
        if (selectedReceiptId) {
            await dispatch(deleteReceipt(selectedReceiptId));
        }
        setShowDeleteModal(false);
        setSelectedReceiptId('');
    }

    const handleEditReceipt = (receipt: IReceipt) => {
        // setEditingReceipt(receipt);
    }

    const handlePageChange = (page: number) => {
        dispatch(setQueryParams({ ...queryParams, page }));
    }

    const handleItemsPerPageChange = (newLimit: number) => {
        dispatch(setQueryParams({ ...queryParams, limit: newLimit, page: 1 }));
    }

    return (
        <div>
            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Confirm Delete"
            >
                <div className='flex justify-end gap-2'>
                    <button
                        className='px-4 py-2 border rounded text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
                        onClick={confirmDelete}
                    >
                        Delete
                    </button>
                </div>
            </Modal>
            <div className='flex flex-wrap gap-4 mb-4 items-end'>
                <div>
                    <label className='block text-sm font-medium mb-1'>Date From</label>
                    <input
                        type='date'
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className='border rounded px-2 py-1'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium mb-1'>Date To</label>
                    <input
                        type='date'
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className='border rounded px-2 py-1'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium mb-1'>Search</label>
                    <input
                        type='text'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className='border rounded px-2 py-1'
                        placeholder='Search by item name'
                    />
                </div>
                <button
                    className='bg-blue-600 text-white font-bold py-2 px-4 rounded'
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            <div className='mb-2 mt-4'>
                <button className='bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={() => navigate('/receipts/create')}>Add New Receipt</button>
            </div>
            <ReceiptList
                receipts={receipts}
                onDelete={handleDelete}
                onEdit={handleEditReceipt}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
            />
        </div>
    );
}

export default ReceiptListPage;
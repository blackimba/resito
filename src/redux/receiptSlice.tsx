import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit';

import { IReceipt, IReceiptQueryParams } from '../types/Receipt';
import * as receiptApi from '../api/receiptApi';

interface ReceiptsState {
    receipts: IReceipt[];
    loading: boolean;
    error: string | null;
    isEditing: boolean;
    currentReceipt: IReceipt | null;
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    queryParams: IReceiptQueryParams;
}

const initialState: ReceiptsState = {
    receipts: [],
    loading: false,
    error: null,
    isEditing: false,
    currentReceipt: null,
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 1,
    queryParams: {
        page: 1,
        limit: 5,
        sortBy: 'datePurchase',
        sortOrder: 'asc',
    },
    
};

export const fetchReceipts = createAsyncThunk(
    'receipts/fetchReceipts',
    async (params: IReceiptQueryParams) => {
        const response = await receiptApi.getReceipts(params);
        return response;
    }
);

export const fetchReceiptById = createAsyncThunk(
    'receipts/fetchReceiptById',
    async (id: string) => {
        const response = await receiptApi.getReceiptById(id);
        return response.data;
    }
);

export const addReceipt = createAsyncThunk(
    'receipts/addReceipt',
    async (receipt: Omit<IReceipt, 'id'>) => {
        const response = await receiptApi.createReceipt(receipt);
        return response.data;
    }
);

export const updateReceipt = createAsyncThunk(
    'receipts/updateReceipt',
    async ({ id, receipt }: { id: string; receipt: Partial<IReceipt> }) => {
        const response = await receiptApi.updateReceipt(id, receipt);
        return response.data;
    }
);

export const partialUpdateReceipt = createAsyncThunk(
    'receipts/partialUpdateReceipt',
    async ({ id, receipt }: { id: string; receipt: Partial<IReceipt> }) => {
        const response = await receiptApi.partialUpdateReceipt(id, receipt);
        return response.data;
    }
);

export const deleteReceipt = createAsyncThunk(
    'receipts/deleteReceipt',
    async (id: string) => {
        await receiptApi.deleteReceipt(id);
        return id;
    }
);

const receiptsSlice = createSlice({
    name: 'receipts',
    initialState,
    reducers: {
        setQueryParams: (state, action: PayloadAction<IReceiptQueryParams>) => {
            state.queryParams = { ...state.queryParams, ...action.payload };

            if (action.payload.page) {
                state.currentPage = action.payload.page;
            }

            if (action.payload.limit) {
                state.itemsPerPage = action.payload.limit;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReceipts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReceipts.fulfilled, (state, action) => {
                console.log("Fetched receipts:", action.payload.data);

                state.loading = false;
                state.receipts = action.payload.data.receipts;
                state.currentPage = action.payload.data.page;
                state.totalPages = action.payload.data.totalPages;
                state.totalItems = action.payload.data.totalItems;
            })
            .addCase(fetchReceipts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch receipts';
            })
            .addCase(fetchReceiptById.fulfilled, (state, action: PayloadAction<IReceipt>) => {
                state.currentReceipt = action.payload;
            })
            .addCase(addReceipt.fulfilled, (state, action: PayloadAction<IReceipt>) => {
                state.receipts.push(action.payload);
            })
            .addCase(updateReceipt.fulfilled, (state, action: PayloadAction<IReceipt>) => {
                const index = state.receipts.findIndex((receipt) => receipt.id === action.payload.id);
                if (index !== -1) {
                    state.receipts[index] = action.payload;
                }
            })
            .addCase(partialUpdateReceipt.fulfilled, (state, action: PayloadAction<IReceipt>) => {
                const index = state.receipts.findIndex((receipt) => receipt.id === action.payload.id);
                if (index !== -1) {
                    state.receipts[index] = { ...state.receipts[index], ...action.payload };
                }
            })
            .addCase(deleteReceipt.fulfilled, (state, action: PayloadAction<string>) => {
                state.receipts = state.receipts.filter((receipt) => receipt.id !== action.payload);
            });
    },
});

export const { setQueryParams } = receiptsSlice.actions;
export default receiptsSlice.reducer;
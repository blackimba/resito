import axios from 'axios';
import { IReceipt, IReceiptQueryParams, IPaginatedReceipts } from '../types/Receipt';

const API_BASE_URL = 'http://localhost:3000/receipts'; // Adjust the URL as needed

export const getReceipts = async (params?: IReceiptQueryParams): Promise<any> => {
    const response = await axios.get<IPaginatedReceipts>(API_BASE_URL, { params });
    return response.data;
}

export const getReceiptById = async (id: string): Promise<any> => {
    const response = await axios.get<IReceipt>(`${API_BASE_URL}/${id}`);
    return response.data;
}

export const createReceipt = async (receipt: Omit<IReceipt, 'id'>): Promise<any> => {
    const response = await axios.post<IReceipt>(API_BASE_URL, receipt);
    return response.data;
}

export const updateReceipt = async (id: string, receipt: Partial<IReceipt>): Promise<any> => {	
    const response = await axios.put<IReceipt>(`${API_BASE_URL}/${id}`, receipt);
    return response.data;
}

export const partialUpdateReceipt = async (id: string, receipt: Partial<IReceipt>): Promise<any> => {	
    const response = await axios.patch<IReceipt>(`${API_BASE_URL}/${id}`, receipt);
    return response.data;
}

export const deleteReceipt = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
}

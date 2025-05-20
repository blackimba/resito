//create interface for receipt
export interface IReceipt {
    id: string,
    datePurchase: Date,
    item: string,
    location: string,
    quantity: number,
    unitPrice: number,
    totalPrice?: number,
    remark: string
    discountAmount: number,
}

export interface IPagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
}

export interface IReceiptQueryParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    item?: string;
    location?: string;
    dateFrom?: string;
    dateTo?: string;
}

export interface IPaginatedReceipts {
    data: IReceipt[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}

export interface IRecieptListProps {
    receipts: IReceipt[];
    onDelete: (id: string) => void;
    onEdit: (receipt: IReceipt) => void;
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
}
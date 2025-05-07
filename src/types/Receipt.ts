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
}
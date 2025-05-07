import * as yup from 'yup';

export const receiptSchema = yup.object().shape({
    id: yup.string().required('ID is required'),
    datePurchase: yup.date().required('Date is required'),
    item: yup.string().required('Item is required'),
    location: yup.string().required('Location is required'),
    quantity: yup
        .number()
        .required('Quantity is required')
        .positive('Quantity must be a positive number')
        .integer('Quantity must be an integer'),
    unitPrice: yup
        .number()
        .required('Unit Price is required')
        .positive('Unit Price must be a positive number'),
    discountAmount: yup
        .number()
        .min(0, 'Discount amount must be at least 0')
        .default(0),
    remark: yup.string().required('Remark is required'),
    // totalPrice: yup
    //     .number()
    //     .required('Total Price is required')
    //     .positive('Total Price must be a positive number'),


});
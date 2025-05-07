import React, { useState, useEffect, } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuid } from 'uuid';
import { useForm, Controller, useWatch, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IReceipt } from '../types/Receipt';
import { receiptSchema } from '../validation/receiptSchema';


interface RecieptFormProps {
    onSave: (receipt: IReceipt) => void;
    editingReceipt?: IReceipt | null;
}


const RecieptForm: React.FC<RecieptFormProps> = ({ onSave, editingReceipt }) => {
    const initialForm: IReceipt = {
        id: uuid(),
        datePurchase: new Date(),
        item: '',
        location: '',
        quantity: 0,
        unitPrice: 0,
        totalPrice: 0,
        remark: '',
        discountAmount: 0,
    }

    type ReceiptFormData = IReceipt
    // type ReceiptFormData = Omit<IReceipt, 'id'>;
    const resolver: Resolver<ReceiptFormData> = yupResolver(receiptSchema);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm<ReceiptFormData>({
        resolver: resolver,
        defaultValues: initialForm,
    })

    // Watch the specific fields to dynamically calculate the total price

    const quantity = useWatch({ control, name: 'quantity' });
    const unitPrice = useWatch({ control, name: 'unitPrice' });
    const discountAmount = useWatch({ control, name: 'discountAmount' });

    useEffect(() => {
        if (editingReceipt) {
            Object.keys(editingReceipt).forEach((key) => {
                setValue(key as keyof ReceiptFormData, editingReceipt[key as keyof ReceiptFormData]);
            });
        }
    }, [editingReceipt, setValue])

    useEffect(() => {
        const calculateTotalPrice = unitPrice * quantity - discountAmount;
        setValue('totalPrice', calculateTotalPrice > 0 ? calculateTotalPrice : 0);
    }, [quantity, unitPrice, discountAmount, setValue]);


    const handleSubmitReceipt = (data: any) => {
        onSave(data);
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitReceipt)} className='space-y-2'>
            <div>
                <div>
                    <label className='block'>Receipt ID</label>
                    <input {...register('id')} className='border rounded p-2 w-full' readOnly />
                </div>
                <div>
                    <label className='block'>Date Purchased</label>
                    <Controller 
                        name='datePurchase'
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                dateFormat='yyyy/MM/dd'
                                className='border rounded p-2 w-full'
                            />
                        )}
                    />
                    {errors.datePurchase && <p className='text-red-500'>{errors.datePurchase.message}</p>}
                </div>
                <div>
                    <label className='block'>Location</label>
                    <input {...register('location')} className='border rounded p-2 w-full'/>
                    {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
                </div>
                <div>
                    <label className='block'>Item</label>
                    <input {...register('item')} className='border rounded p-2 w-full'/>
                    {errors.item && <p className='text-red-500'>{errors.item.message}</p>}
                </div>
                <div>
                    <label className='block'>Quantity</label>
                    <input type="number" {...register('quantity')} className='border rounded p-2 w-full' />
                    {errors.quantity && <p className='text-red-500'>{errors.quantity.message}</p>}
                </div>
                <div>
                    <label className='block'>Unit Price</label>
                    <input type='number' {...register('unitPrice')} className='border rounded p-2 w-full'/>
                    {errors.unitPrice && <p className='text-red-500'>{errors.unitPrice.message}</p>}
                </div>
                <div>
                    <label className='block'>Discount Amount</label>
                    <input type="number" {...register('discountAmount')} className='border rounded p-2 w-full'/>
                    {errors.discountAmount && <p className='text-red-500'>{errors.discountAmount.message}</p>}
                </div>
                <div>
                    <label className='block'>Total Price</label>
                    <input type='number' {...register('totalPrice')} className='border rounded p-2 w-full' readOnly />
                </div>
                <div>
                    <label className='block'>Remark</label>
                    <input {...register('remark')} className='border rounded p-2 w-full' />
                    {errors.remark && <p className='text-red-500'>{errors.remark.message}</p>}
                </div>
                <div className='col-span-full'>
                    <button type='submit' className='mt-4 w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'>
                        {editingReceipt ? 'Update Receipt' : 'Add Receipt'}
                    </button>
                </div>
            </div>
        </form>
    )

}

export default RecieptForm;
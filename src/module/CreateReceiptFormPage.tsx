import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import ReceiptForm from "../components/RecieptForm";
import { IReceipt } from "../types/Receipt";
import { addReceipt } from "../redux/receiptSlice";
import { AppDispatch } from "../store/store";
import { date } from "yup";


const CreateReceiptFormPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();


    const handleSaveReceipt = async (receipt: IReceipt) => {
      const payload = {
        datePurchase: receipt.datePurchase,
        item: receipt.item,
        location: receipt.location,
        quantity: receipt.quantity,
        unitPrice: receipt.unitPrice,
        totalPrice: receipt.totalPrice,
        remark: receipt.remark,
        discountAmount: receipt.discountAmount,
      }

      await dispatch(addReceipt(payload));
      navigate("/");
    }

    return (
        <div>
            <ReceiptForm onSave={handleSaveReceipt} receipt={null} />
        </div>
    );
}

export default CreateReceiptFormPage;
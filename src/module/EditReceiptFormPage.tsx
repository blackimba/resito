import React, {useState} from "react";
import { useNavigation } from "react-router-dom";

import ReceiptForm from "../components/RecieptForm";
import { IReceipt } from "../types/Receipt";

const EditReceiptFormPage = () => {
    const navigation = useNavigation();

    const [receipts, setReceipts] = useState<IReceipt[]>([]);
    const [editingReceipt, setEditingReceipt] = useState<IReceipt | null>(null);

    const handleSaveReceipt = (receipt: IReceipt) => {
    
        if(editingReceipt) {
          
          let updatedReceipt = receipts.map(r => {
            if(r.id == receipt.id) {
              return receipt;
            }
            return r;
          });
          
          console.log("Updated Receipts: ", updatedReceipt);
          console.log("Original Receipts: ", receipts);
          setReceipts(updatedReceipt);
          setEditingReceipt(null);
        } else {
          setReceipts([...receipts, {...receipt }]);
        }
        
      }

    return (
        <div>
            <ReceiptForm onSave={handleSaveReceipt} receipt={null} />
        </div>
    );
}

export default EditReceiptFormPage;


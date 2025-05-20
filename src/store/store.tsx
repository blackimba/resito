import { configureStore } from "@reduxjs/toolkit";
import receiptsReducer from "../redux/receiptSlice"

const store = configureStore({
    reducer: {
        // Add your reducers here
        receipts: receiptsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
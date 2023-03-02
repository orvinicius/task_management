import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import taskReducer from "./slices/taskSlice";

import storeSynchronize from 'redux-localstore'



export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        task: taskReducer
    },
});

storeSynchronize(store)

import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "./loaderReducer";
import { errorReducer } from "./errorReducer";
import { authReducer } from "./authReducer";
import { blogReducer } from "./blogReducer";

//======= configure store =========//
const store = configureStore({
    reducer:{
        errorReducer,
        loadingReducer,
        authReducer,
        blogReducer,
    }
})

export default store;
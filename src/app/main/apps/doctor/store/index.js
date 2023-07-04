import { combineReducers } from "@reduxjs/toolkit";
import product from "./doctorSlice";
import products from "./doctorsSlice";

const reducer = combineReducers({
    products,
    product,
});

export default reducer;

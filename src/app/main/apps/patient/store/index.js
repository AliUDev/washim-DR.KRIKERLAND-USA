import { combineReducers } from "@reduxjs/toolkit";
import product from "./patientSlice";
import products from "./patientsSlice";

const reducer = combineReducers({
    products,
    product,
});

export default reducer;

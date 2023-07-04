import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";

export const getProduct = createAsyncThunk(
    "eCommerceApp/product/getProduct",
    async (params) => {
        const response = await axios.get(
            `${process.env.REACT_APP_WASHIM_BACKEND_URL}/api/patient`,
            {
                params,
            }
        );

        const data = await response.data;
        return data === undefined ? null : data;
    }
);

export const removeProduct = createAsyncThunk(
    "eCommerceApp/product/removeProduct",
    async (val, { dispatch, getState }) => {
        const { uuid } = getState().eCommerceApp.product;
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.post(
            `${process.env.REACT_APP_WASHIM_BACKEND_URL}/api/patient/delete`,
            {
                uuid,
                userId: user.uuid,
            }
        );
        const data = await response;
        return uuid;
    }
);

export const saveProduct = createAsyncThunk(
    "eCommerceApp/product/saveProduct",
    async (productData, { dispatch, getState }) => {
        const { product } = getState().eCommerceApp;
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.post(
            `${process.env.REACT_APP_WASHIM_BACKEND_URL}/api/patient/create`,
            {
                ...product,
                ...productData,
                user_id: user.uuid,
            }
        );
        const data = await response.data;
        return data;
    }
);

const patientSlice = createSlice({
    name: "eCommerceApp/product",
    initialState: null,
    reducers: {
        resetProduct: () => null,
        newProduct: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    id: FuseUtils.generateGUID(),
                    first_name: "",
                    middle_name: "",
                    last_name: "",
                    date_of_birth: "",
                    email: "",
                    ssn: "",
                    gender: "Male",
                    medical_insurance_type: "Medicaid",
                    group_number: "",
                    member_id: "",
                    mmis_number: "",
                    primary_care_name: "",
                    primary_care_clinic: "",
                    primary_care_number: "",
                    rx_grp: "",
                    rx_bin: "",
                    rx_pcn: "",
                    payer_id: "",
                    street_1: "",
                    health_plan_number: "",
                    street_2: "",
                    city: "",
                    state: "",
                    fax: "",
                    zip: "",
                    phone_1: "",
                    phone_2: "",
                    phone_3: "",
                    phone_4: "",
                    phone_5: "",
                    patient_active: "yes",
                    covid_vaccinated: "no",
                    covid_vaccinated_booster_shot: "no",
                    tags: [],
                    handle: "",
                    description: "",
                    categories: [],
                    images: [],
                    priceTaxExcl: 0,
                    priceTaxIncl: 0,
                    taxRate: 0,
                    comparedPrice: 0,
                    quantity: 0,
                    sku: "",
                    width: "",
                    height: "",
                    depth: "",
                    weight: "",
                    extraShippingFee: 0,
                    active: true,
                },
            }),
        },
    },
    extraReducers: {
        [getProduct.fulfilled]: (state, action) => action.payload,
        [saveProduct.fulfilled]: (state, action) => action.payload,
        [removeProduct.fulfilled]: (state, action) => null,
    },
});

export const { newProduct, resetProduct } = patientSlice.actions;

export default patientSlice.reducer;

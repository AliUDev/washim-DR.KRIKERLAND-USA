import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

export const getProducts = createAsyncThunk(
    "eCommerceApp/products/getProducts",
    async () => {
        const response = await axios.post(
            `${process.env.REACT_APP_WASHIM_BACKEND_URL}/api/doctors`,
            {
                uuid: user.uuid,
            }
        );

        const data = await response.data;
        return data;
    }
);

export const removeProducts = createAsyncThunk(
    "eCommerceApp/products/removeProducts",
    async (productIds, { dispatch, getState }) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.post(
            `${process.env.REACT_APP_WASHIM_BACKEND_URL}/api/doctor/bulkDelete`,
            {
                doctorIds: productIds,
                userId: user.uuid,
            }
        );
        const data = await response;
        return productIds;
    }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } =
    productsAdapter.getSelectors((state) => state.eCommerceApp.products);

const doctorsSlice = createSlice({
    name: "eCommerceApp/products",
    initialState: productsAdapter.getInitialState({
        searchText: "",
    }),
    reducers: {
        setProductsSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: (event) => ({ payload: event.target.value || "" }),
        },
    },
    extraReducers: {
        [getProducts.fulfilled]: productsAdapter.setAll,
        [removeProducts.fulfilled]: (state, action) =>
            productsAdapter.removeMany(state, action.payload),
    },
});

export const { setProductsSearchText } = doctorsSlice.actions;

export default doctorsSlice.reducer;

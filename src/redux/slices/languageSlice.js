import { createSlice } from "@reduxjs/toolkit";
import { getLanguages } from "../actions/translateActions";

const initialState = {
     isLoading:false,
     isError:false,
     languages:[],
}

const languageSlice = createSlice({
    name:"language",
    initialState,
    extraReducers:(builder) => {
        builder.addCase(getLanguages.pending,(state) => {
            state.isLoading = true;
        });

        builder.addCase(getLanguages.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(getLanguages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoading = false;
            state.languages = action.payload;
        });
    },
});

export default languageSlice.reducer;
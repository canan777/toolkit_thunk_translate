import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./slices/languageSlice";
import translateSlice from "./slices/translateSlice";

export default configureStore({
    reducer: { languageSlice, translateSlice },
});
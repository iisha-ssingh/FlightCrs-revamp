import {combineReducers} from "@reduxjs/toolkit";
import {searchReducer} from "../pages/search";

export const rootReducer = combineReducers({
    searchReducer,
});

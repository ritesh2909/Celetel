import { combineReducers } from "redux";
import auth from "./auth";
import dark from "./darkMode";
import entriesReducer from "./entries";

export default combineReducers({ auth, dark, entries: entriesReducer });

import { createStore } from "redux";
import { reducer } from "./leaves";

export const store = createStore(reducer);

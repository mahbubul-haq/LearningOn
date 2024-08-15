import { combineReducers } from "redux";

import authReducer from "./authSlice";
import learningPageReducer from "./learningPageSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    course: learningPageReducer
})

export default rootReducer;
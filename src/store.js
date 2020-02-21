import { createStore, combineReducers } from "redux";
import questionsReducer from "./reducers/questionsReducer";


function configureStore(state = {
    questions: "",
    
}) {
    return createStore(questionsReducer, {});
}
export default configureStore;
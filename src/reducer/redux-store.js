import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import diary_reducer from "./diary_reducer";
import {reducer as formReducer } from 'redux-form'
import objective_reducer from "./objective_reducer";
import label_reducer from "./label_reducer";
import header_reducer from "./header_reducer";
import auth_reducer from "./auth-reducer";


let reducers = combineReducers({
    diaryPage: diary_reducer,
    objectivePage: objective_reducer,
    labelPage: label_reducer,
    headerBlock: header_reducer,
    authPage: auth_reducer,
    form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store;
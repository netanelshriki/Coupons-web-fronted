import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { EmployeesReducer } from "./EmployeesSatate";


// Single Reducer
//const store = createStore(catsReducer);


// For getting data
//const xys = store.getState().cats;

//Multiple catsReducer
const reducers = combineReducers({EmployeeState: EmployeesReducer,authState: authReducer});
const store = createStore(reducers)

// For getting data
//const xyz = store.getState().catState.cats;

export default store;
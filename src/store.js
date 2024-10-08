
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { combineReducers } from 'redux';
import deseadosReducer from './reducers/deseadosReducer';

const rootReducer = combineReducers({
    deseados: deseadosReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

import { combineReducers } from 'redux'
import CounterVM from './counter/CounterVM'
import LoaderVM from './loader/LoaderVM'
import ErrorVM from './error/ErrorVM'
//import ErrorReducer from './error_reducer'
import {GLOBAL_UNDO,GLOBAL_REDO} from '../actions/action_creators'
import undoable, { includeAction } from 'redux-undo'
import { routerReducer } from 'react-router-redux'

//const CounterReducer_old = undoable(CounterReducerNoUndoRedo, { limit: 10, undoType: GLOBAL_UNDO, redoType: GLOBAL_REDO });
//const CounterReducer = undoable(CounterReducerNoUndoRedo, { limit: 10});
//const CounterReducer = CounterReducerNoUndoRedo;
const RootReducer = combineReducers({
    Counter: CounterVM.Reducer,
    Loader : LoaderVM.Reducer,
    Error : ErrorVM.Reducer,
    routing: routerReducer
});

export default RootReducer;

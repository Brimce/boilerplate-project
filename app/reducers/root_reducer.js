import { combineReducers } from 'redux'
import CounterReducerNoUndoRedo from './counter_reducer'
import MainReducer from './main_reducer'
import ErrorReducer from './error_reducer'
import {GLOBAL_UNDO,GLOBAL_REDO} from '../actions/action_creators'
import undoable, { includeAction } from 'redux-undo'
import { routerReducer } from 'react-router-redux'

const CounterReducer = undoable(CounterReducerNoUndoRedo, { limit: 10, undoType: GLOBAL_UNDO, redoType: GLOBAL_REDO });
//const CounterReducer = undoable(CounterReducerNoUndoRedo, { limit: 10});
//const CounterReducer = CounterReducerNoUndoRedo;
const rootReducer = combineReducers({
    CounterReducer,
    MainReducer,
    ErrorReducer,
    routing: routerReducer
});

export default rootReducer;

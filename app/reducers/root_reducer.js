import { combineReducers } from 'redux'
import counter from './counter_reducer'

const rootReducer = combineReducers({
    counter
});

export default rootReducer
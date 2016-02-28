import { SET_COUNTER, INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/action_creators'

export default function counter(state = {count:0}, action) {
    switch (action.type) {
        case SET_COUNTER:
            return {...state, count: action.payload };
        case INCREMENT_COUNTER:
            return {...state, count: state.count + 1 };
        case DECREMENT_COUNTER:
            return {...state, count: state.count - 1 };
        default:
            return state;
    }
}
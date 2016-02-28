import * as ActionCreators from '../actions/action_creators';

export default (state = {isLoading:false}, action) => {
switch (action.type) {
    case ActionCreators.SHOW_LOADING:
        return {isLoading : true};
    case ActionCreators.HIDE_LOADING:
        return {isLoading : false };
    default:
        return state;
}
}
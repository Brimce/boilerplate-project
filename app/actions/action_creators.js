import Request from 'axios'

export const GLOBAL_UNDO = 'GLOBAL_UNDO';
export function undo() {
  return {
    type: GLOBAL_UNDO
  }
}

export const GLOBAL_REDO = 'GLOBAL_REDO';
export function redo() {
    return {
        type: GLOBAL_REDO
    }
}


export const SET_COUNTER = 'SET_COUNTER';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export function set(value) {
  return {
    type: SET_COUNTER,
    payload: value
  }
}

export function increment() {
    return {
        type: INCREMENT_COUNTER,
        error :  { errorMessage: 'Le serveur ne repond pas.', retryAction: ()=>decrement()}
  }
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  }
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
      const { count } = getState();

    if (count % 2 === 0) {
        return;
    }

    dispatch(increment())
  }
}

export function incrementAsync(delay = 3000) {
    return dispatch => {
        dispatch(showLoading());
        setTimeout(() => {
          dispatch(hideLoading());
          dispatch(increment());
      }, delay);
  }
}

const BACKEND_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';
export const GET_TODOS = 'GET_TODOS';

export function getTodos() {
    return {
        type: GET_TODOS,
        promise: request.get(BACKEND_URL)
    }
}

export const SHOW_LOADING = 'SHOW_LOADING';
export function showLoading() {
    return {
        type: SHOW_LOADING
    }
}

export const HIDE_LOADING = 'HIDE_LOADING';
export function hideLoading() {
    return {
        type: HIDE_LOADING
    }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export function resetErrorMessage() {
    return {
        type: RESET_ERROR_MESSAGE
    }
}

export function retryAndResetErrorMessage() {
    /// <summary>
    /// renvoie une fonction qui dispatch retryAction et qui reset le message d'erreur 
    /// </summary>
    /// <param name="retryAction" type="type"></param>
    /// <returns type=""></returns>
    return (dispatch, getState) =>{        
        const {ErrorReducer} = getState();
        
        dispatch(resetErrorMessage());
        
        if(!ErrorReducer || !ErrorReducer.retryAction)
            return;

        dispatch(ErrorReducer.retryAction());
    }
}
import Request from 'axios'

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
    type: INCREMENT_COUNTER
  }
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  }
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
      const { counter } = getState();

    if (counter % 2 === 0) {
        return;
    }

    dispatch(increment())
  }
}

export function incrementAsync(delay = 1000) {
  return dispatch => {
      setTimeout(() => {
          dispatch(increment());
      }, delay);
  }
}

const BACKEND_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';

export function getTodos() {
    return {
        type: 'GET_TODOS',
        promise: request.get(BACKEND_URL)
    }
}
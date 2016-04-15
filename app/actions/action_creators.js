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

const BACKEND_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';
export const GET_TODOS = 'GET_TODOS';

export function getTodos() {
    return {
        type: GET_TODOS,
        promise: request.get(BACKEND_URL)
    }
}

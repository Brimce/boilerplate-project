import AppService from '../AppService'
const namespace = 'module_counter_';
const DefaultState = {
    count: 0
}

export default class CounterVM {
    //ACTIONS
    static get SET_COUNTER() {
        return namespace + 'SET_COUNTER';
    }
    static set(value) {
        return {
            type: CounterVM.SET_COUNTER,
            payload: value
        }
    }

    static get INCREMENT_COUNTER() {
        return namespace + 'INCREMENT_COUNTER';
    }
    static increment() {
        return {
            type: CounterVM.INCREMENT_COUNTER
        }
    }

    static get DECREMENT_COUNTER() {
        return namespace + 'DECREMENT_COUNTER';
    }
    static decrement() {
        return {
            type: CounterVM.DECREMENT_COUNTER
        }
    }

    static incrementIfOdd() {
        return (dispatch, getState) => {
            const {
                Counter
            } = getState();

            if (Counter.count % 2 === 0) {
                //error: {
                //    errorMessage: 'Le serveur ne repond pas.',
                //    retryAction: () => CounterVM.decrement()
                //}
                dispatch( AppService.ShowError('pas pair'))
                return
            }

            dispatch(CounterVM.increment())
        }
    }

    static incrementAsync(delay = 3000) {
        return dispatch => {
            dispatch(AppService.ShowLoading());
            setTimeout(() => {
                dispatch(AppService.HideLoading());
                dispatch(CounterVM.increment());
            }, delay);
        }
    }

    static Reducer(state = DefaultState, action) {
        switch (action.type) {
            case CounterVM.SET_COUNTER:
                return {...state,
                    count: action.payload
                };
            case CounterVM.INCREMENT_COUNTER:
                return {...state,
                    count: state.count + 4
                };
            case CounterVM.DECREMENT_COUNTER:
                return {...state,
                    count: state.count - 1
                };
            default:
                return state;
        }
    }
}

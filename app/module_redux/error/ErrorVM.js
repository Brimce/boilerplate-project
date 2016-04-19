const namespace = 'module_error_';
const DefaultState = null;

export default class ErrorVM {

    static get RESET_ERROR_MESSAGE() {
        return namespace + 'RESET_ERROR_MESSAGE';
    }

    static resetErrorMessage() {
        return {
            type: ErrorVM.RESET_ERROR_MESSAGE
        }
    }

    static get SHOW_ERROR_MESSAGE() {
        return namespace + 'SHOW_ERROR_MESSAGE';
    }

    static showError(message, retryAction) {
        if(retryAction)
        return {
            type: ErrorVM.SHOW_ERROR_MESSAGE,
            error: {
                errorMessage: message,
                retryAction: retryAction
            }
        }

        return {
            type: ErrorVM.SHOW_ERROR_MESSAGE,
            error: {
                errorMessage: message
            }
        }

    }

    static retryAndResetErrorMessage() {
        /// <summary>
        /// renvoie une fonction qui dispatch retryAction et qui reset le message d'erreur
        /// </summary>
        /// <param name="retryAction" type="type"></param>
        /// <returns type=""></returns>
        return (dispatch, getState) => {
            const {
                ErrorReducer
            } = getState();

            dispatch(ErrorVM.resetErrorMessage());

            if (!ErrorReducer || !ErrorReducer.retryAction)
                return;

            dispatch(ErrorReducer.retryAction());
        }
    }

    static Reducer(state = DefaultState, action) {
        const {
            type,
            error
        } = action;
        console.log(`error reducer : ${error}`);
        if (type === ErrorVM.RESET_ERROR_MESSAGE)
            return null;

        if (error)
            return action.error;

        return state;
    }
}

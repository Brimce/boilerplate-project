export default function errorMiddleware() {
    return next => action => {
        const {retryAction } = action;

            if (!retryAction) return next(action);

            dispatch(retryAction());
    }
}
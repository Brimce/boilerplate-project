const namespace = 'module_loader_';
const DefaultState = {
    isLoading: false
};

export default class LoaderVM {
    
    static get SHOW_LOADING() {
        return namespace + 'SHOW_LOADING';
    }
    static showLoading() {
        return {
            type: LoaderVM.SHOW_LOADING
        }
    }

    static get HIDE_LOADING() {
        return namespace + 'HIDE_LOADING';
    }
    static hideLoading() {
        return {
            type: LoaderVM.HIDE_LOADING
        }
    }

    static Reducer(state = DefaultState, action) {
        switch (action.type) {
            case LoaderVM.SHOW_LOADING:
                return {
                    isLoading: true
                };
            case LoaderVM.HIDE_LOADING:
                return {
                    isLoading: false
                };
            default:
                return state;
        }
    }
}

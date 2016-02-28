import { RESET_ERROR_MESSAGE} from '../actions/action_creators'

export default (state = null, action) => {
    
    const {type, error} = action;
        
        if (type === RESET_ERROR_MESSAGE)
            return null;
        
        if (error)
            return action.error;
        
        return state;
    }
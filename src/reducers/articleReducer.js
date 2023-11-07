import { SET_LOADING_STATUS, GET_ARTICLES } from "../actions/actionType";

export const initstate = {
    articles: [],
    loading: false,
}

const articleReducer = (state= initstate, action)=>{
    switch(action.type){
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
            }
        case SET_LOADING_STATUS:
            return{
                ...state,
                loading: action.state,
                
            }
        default:
            return state;
    }
}

export default articleReducer;
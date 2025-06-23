import { SET_LOADING_STATUS, GET_ARTICLES, SET_PROGRESS } from "../actions/actionType";

export const initstate = {
    articles: [],
    loading: false,
    progress:0
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
        case SET_PROGRESS:
            return{
                ...state,
                progress:action.payload
            }
        default:
            return state;
    }
}

export default articleReducer;
import {LOGIN,LOGOUT} from './constants'

const reducer = (state={authToken:localStorage.getItem('token')},action) => {
    switch(action.type){
        case LOGIN:
            localStorage.setItem('token',action?.data.data)
            return {...state,authToken: action?.data.data}
        case LOGOUT:
            localStorage.clear()
            return {...state,authToken: null}
        default:
            return state
    }
}

export default reducer
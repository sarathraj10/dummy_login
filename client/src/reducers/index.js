import {combineReducers} from 'redux'
import auth from '../components/Auth/reducer'
import error from '../components/Toster/reducer'

export default combineReducers({
    auth,
    error
})
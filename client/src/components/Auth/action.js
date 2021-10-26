import * as api from '../../api'
import {LOGIN} from './constants'

function showToaster(msg,dispatch){
    dispatch({type:'SHOW_ERR',payload:msg})
    setTimeout(()=>{
        dispatch({type:'HIDE_ERR',payload:msg})
    },4000)
}

export const signIn = (formData,history) => async(dispatch) => {
    try{
        const {data} = await api.signIn(formData)
        if(!data.success){
            showToaster(data.message,dispatch)
            return
        }
        dispatch({type:LOGIN,data})
        history.push('/')
    }catch(e){
        showToaster(e.message,dispatch)
    }
}

export const signUp = (formData,history) => async(dispatch) => {
    try{
        const {data} = await api.signUp(formData)
        if(!data.success){
            showToaster(data.message,dispatch)
            return
        }
        history.push('/')
    }catch(e){
        showToaster(e.message,dispatch)
    }
}
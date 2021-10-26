const reducer = (state = {showError : false,message:''},action) => {
    switch(action.type){
        case 'SHOW_ERR':
            return {showError : true,message:action.payload}
        case 'HIDE_ERR':
            return {showError : false,message:''}
        default:
            return state
    }
}

export default reducer
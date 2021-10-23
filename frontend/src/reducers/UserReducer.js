const defaultState = {
    token: ''
}

const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SET_TOKEN":
            return {
                token: action.payload
                
            }
        case "CLEAR_TOKEN":
            return {
                token: ''
            }
        default: return state
    }
}

export default userReducer
export const setToken = token => {
    return (dispatch) => {
        dispatch({
            type:'SET_TOKEN',
            payload: token
        })
    }
}

export const clearToken = () => {
    return (dispatch) => {
        dispatch({
            type:'CLEAR_TOKEN',
        })
    }
}
const inMemoryJWTManager = () => {
    let jwtToken = null;
    let message = ''

    const getToken = () => jwtToken;

    const setToken = (token) => {
        jwtToken = token;
        return true;
    };

    const removeToken = () => {
        jwtToken = null;
        return true;
    }
    
    const getMessage = () => message

    const setMessage = (msg) => {
        message = msg;
        return true;
    }
    
    return {
        removeToken,
        getToken,
        setToken,
        setMessage,
        getMessage,
    }
};

export default inMemoryJWTManager();
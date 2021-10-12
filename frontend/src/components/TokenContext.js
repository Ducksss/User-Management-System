 import React, { useState } from 'react'
 
const TokenContext = React.createContext()
 
const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [message, setmessage] = useState('')
 
    return (
        <TokenContext.Provider value={{ token, setToken, message, setmessage }}>
            {children}
        </TokenContext.Provider>
    )
}
 
export { TokenContext, TokenProvider } 
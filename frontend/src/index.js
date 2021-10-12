import React, {useState, useEffect, useCallback, useContext} from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import Modal from "react-modal";
import axios from "axios";
import config from "Config";

import { TokenProvider, TokenContext } from './components/TokenContext';

Modal.setAppElement("#root");

ReactDOM.render(
  <TokenProvider>
    <Index />
  </TokenProvider>,
  document.getElementById("root")
);

function Index() {
  const [isLoading, setisLoading] = useState(true)
  const {token, setToken, setmessage} = useContext(TokenContext)

  const verifyUser = useCallback(() => {
    axios.get(`${config.baseUrl}/u/user/refresh-token`, {withCredentials: true})
    .then(response => {
        if(response.status == 200) {
            setToken(response.data) 
            axios.defaults.headers.common = { 'Authorization': `bearer ${response.data}` }
            setTimeout(verifyUser, 2 * 60 * 1000) //reresh every 3 minutes
        } else {
            setToken(false)
        }
    })
    .catch(error => {
      setmessage(error.response.data.message)
    })
    .finally(()=> setisLoading(false))
    // call refreshToken every 3 minutes to renew the authentication token.
}, [setToken])

useEffect(() => {
    verifyUser()
}, [])

  return(
    <>
      {isLoading ? <Loader/> : <Routes/>}
    </>
  )
}

function Loader() {
  return(
    <div className='loaderContainer'>
      <div className="loadingio-spinner-ripple-ii6oghkbxnr"><div className="ldio-0ykxk211rqx">
      <div></div><div></div>
      </div></div>
    </div >
  )
}
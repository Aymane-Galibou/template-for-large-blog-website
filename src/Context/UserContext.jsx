import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export let UserContext=createContext(0)


export default function UserContextProvider(props) {

  
    const [User, setUser] = useState([]);
    const [validatesucces,setvalidatesucces]=useState(null);
    const [rapport, setrapport] = useState([])


  return <>
 <UserContext.Provider value={{User,setUser,validatesucces,setvalidatesucces,rapport,setrapport}}>{props.children}</UserContext.Provider>
    </>
  
}

import React, { useState } from 'react'
import { createContext } from 'react'

export let RapportContext=createContext(0)

export default function RapportContextProvider(props) {

    const [rapport,setrapport]=useState([])




  return <>
        <RapportContext.Provider value={{rapport,setrapport}} >{props.children}</RapportContext.Provider>
  </>
}

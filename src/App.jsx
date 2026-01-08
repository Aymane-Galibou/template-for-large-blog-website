import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Income from './components/Income/Income'
import Expense from './components/Expense/Expense';
import Projects from './components/Projects/Projects';
import Question from './components/Question/Question';
import Rapport from './components/Rapport/Rapport';
import Fonctionnaires from './components/Fonctionnaires/Fonctionnaires';
import Private from './components/Private/Private';
import Notfound from './components/Notfound/notfound';
import UserContextProvider from './Context/UserContext'
import Loginprivate from './components/loginprivate/loginprivate'
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter'
import RapportContextProvider from './Context/RapportContext'








let rooting=createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:'income',element:<Income/>},
    {path:'expense',element:<Expense/>},
    {path:'projects',element:<Projects/>},
    {path:'questions',element:<Question/>},
    {path:'rapport',element:<Rapport/>},
    {path:'fonctionnaires',element:<Fonctionnaires/>},
    {path:'loginpage',element:<Loginprivate/>},
    {path:'private',element:<ProtectedRouter> <Private/> </ProtectedRouter>}, 
    {path:'*',element:<Notfound/>},]}])







function App() {

  return <>
  <RapportContextProvider>
  <UserContextProvider>
    <RouterProvider router={rooting}></RouterProvider>
    </UserContextProvider>
  </RapportContextProvider>
    </>
  
}

export default App

import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Home from './routes/home/Home.jsx'
import Nav from './routes/nav/navigation.jsx'
import SignIn from './routes/sign-in/SignIn.jsx'
import Shop from './routes/shop/shop.component.jsx'
import Checkout from './routes/checkout/checkout.jsx'
import { checkUserSession } from './store/user/user.action.js'


function App() {
  const dispatch =useDispatch()

  useEffect(()=>{
    dispatch(checkUserSession())
},[]);

  return (
    <Routes>
      <Route path='/' element={<Nav />}>
        <Route index element={<Home />} />
        <Route path='/shop/*' element={<Shop />} />
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
      </Route>
    </Routes>
  );
}

export default App;

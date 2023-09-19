import React from 'react'
import Directory from '../../Components/directory/directoryComponent.jsx'
import {Outlet} from 'react-router-dom'

function Home() {
return (
  <>
  <Directory/>
  <Outlet/>
  </>
  );
}

export default Home
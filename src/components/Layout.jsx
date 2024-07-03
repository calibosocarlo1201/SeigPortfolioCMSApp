import React from 'react'
import { useLocation } from 'react-router-dom'
import Breadcrumb from './Breadcrumb';
import NavigationBar from './NavigationBar';

const Layout = ({children}) => {

    const location = useLocation();
    const isLoginPage = location.pathname === '/login'

  return (
    <div className='w-full flex'>
        {!isLoginPage && <NavigationBar />}
        <main className={`${isLoginPage ? 'w-full' : 'w-1/4 grow py-12 px-14'}`}>
            {!isLoginPage && <Breadcrumb />}
            {children}
        </main>
    </div>
  )
}

export default Layout
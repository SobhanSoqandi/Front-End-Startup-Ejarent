import React from 'react'
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function LandingLayout() {
    return (

        <div  className="relative min-h-screen pb-[90px]" >
            <div >
                <Header />
            </div>

            <div >
                <Outlet />
            </div>

            <div  className=" fixed bottom-0 left-0 w-full " >
                <Footer />
            </div>
        </div>

    )
}

export default LandingLayout;
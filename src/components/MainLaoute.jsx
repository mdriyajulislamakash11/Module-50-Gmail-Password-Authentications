import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const MainLaoute = () => {
    return (
        <div>
            <Navbar />

            <Outlet />

            
        </div>
    );
};

export default MainLaoute;
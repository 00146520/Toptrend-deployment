import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavBurger } from './Nav_burguer';

import logo1 from '../assets/svgs/logo1.svg';
import userIcon from '../assets/svgs/UserIcon.svg'
import { logout } from '../services/LoginService';

export const Header = () =>{

    
    return(
        <>
            {/* Parte del logo e inicio de sesion */}

            <nav className='flex flex-row relative justify-end w-full h-fit min-h-[13vh] md:min-h-[15vh] px-2 sm:px-4 py-2'>
                <NavBurger/>
                    <Link className='w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[95%]' to= '/'>
                        <img src={logo1} alt="logo toptrend" className='aspect-auto h-full' />
                </Link>
                <div className='flex flex-row items-center justify-end'>
                    <Link to="/login" className='bg-buttonSesion rounded-2xl py-4 px-2 sm:px-6 hover:bg-secondary'><span className='text-white'>Inicia sesión</span> </Link>
                    <img src={userIcon} alt="user icon" className='hidden md:flex pl-4 ' />
                </div>
            </nav>

        </>
    )
}
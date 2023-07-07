import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { HiMenu } from 'react-icons/hi';
import boleto1 from '../assets/svgs/boleto 1.svg';
import dashboard from '../assets/svgs/tablero 1.svg';
import event from '../assets/svgs/Eventos.svg';
import escaner from '../assets/svgs/escaner-de-codigo-de-barras 1.svg';
import moderador from '../assets/svgs/moderador 1.svg';
import administrar from '../assets/svgs/administrador-de-contrasenas 1.svg';
import perfil from '../assets/svgs/user.svg';
import logaut from '../assets/svgs/logaut.svg';
import { Link, useNavigate } from 'react-router-dom';
import NavELement from './NavElement';
import {FaTheaterMasks} from 'react-icons/fa'
import { logout } from '../services/LoginService';
import Swal from 'sweetalert2';




export const NavBurger = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const onClickLogout = () => {
        Swal.fire({
            title: 'Cerrar sesión',
            text: '¿Deseas cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                navigate('/');
            } else if (result.isDenied) {
                return;
            }
        })
    }
    return(
        
        <Menu as="div">
          <Menu.Button
            className="absolute top-2 left-2 flex items-center justify-center w-8 h-8 rounded-md bg-white-100 dark:bg-white-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <HiMenu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </Menu.Button>
        {isOpen && (
          <div className="absolute z-10 left-0 w-48 px-3 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg">
            
            
            <div className='border-b-2 border-black'>
              
              <NavELement
                title="Mis ticket" icon={boleto1} alt="boleto_icon" link="/mytickets"/>
              
              <NavELement
                title="Mis eventos" icon={FaTheaterMasks} alt="eventIcon" link="/myevents"/>
              
              <NavELement
                title="Dashboard" icon={dashboard} alt="tablero_icon" link="/dashboard"/>
                
               <NavELement
                title="Eventos" icon={event} alt="event_icon" link="/events"/>

              <NavELement
                title="Escaner" icon={escaner} alt="escaner_icon" link="/validationmain"/>
              <NavELement
                title="Moderar" icon={moderador} alt="moderador_icon" link="/moderator"/>
              <NavELement
                title="Administrar" icon={administrar} alt="administrador_icon" link="/adminmain"/>
            
              <NavELement
                title="Perfil" icon={perfil} alt="perfil_icon" link="/profile"/>
            </div>

            
              <button className="bg-red-800 text-white flex flex-row hover:bg-red-400  px-7 mt-2 rounded-full items-center " onClick={onClickLogout} >
                
                <img src={logaut} alt="cerrar_sesion" className="mx-0 h-4 w-5  object-center rounded-md" />
                <span className="text-white ">Cerrar Sesion</span>

              </button>
            
         </div>
        )}
      </Menu>
    );
  
}

import React, { useState, useCallback }  from 'react';
import RolUserscards from '../components/Users/RolUserscards';
import { Header } from '../components/Header';
import PaginationBtn from '../components/PaginationBtn';
import BuscarIcon from '../assets/svgs/buscarIcon.svg'
import StateUserscards from '../components/Users/StateUserscards';
import Popup from 'reactjs-popup';
import PastEventCard from '../components/Events/PastEventCard';
import SearchBar from '../components/SearchBar';


function AdminMain() {
    
  return (
    <>
    <Header />
    <section className='bg-white pt-10'>
        <div className='ml-2 relative md:text-xl lg:text-2xl'>
            <p>Usuarios activos:</p>
            
        
        </div>
    </section>
    {/*Usuarios activos*/}
    <div className='bg-secondary py-4 items-center md:flex md:items-center md:justify-center '>
    <RolUserscards/>
    </div>
    <section className='bg-footerColor'>
        </section>

    <section className='bg-white pt-10'>
    <div className='ml-2 relative md:text-xl  lg:text-2xl '>
            <p>Usuarios desactivados:</p>
            
        
        </div>
    </section>

    {/*Usuarios desactivados*/}
    <div className='bg-secondary py-4 items-center md:flex md:items-center md:justify-center '>
    <StateUserscards/>
    </div>
    <section className='bg-footerColor'>
        </section>

   
    </>
  )
}

export default AdminMain;
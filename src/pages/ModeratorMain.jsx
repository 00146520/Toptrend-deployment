import React, { useState, useCallback }  from 'react';
import Userscard from '../components/Users/Userscard';
import { Header } from '../components/Header';
import PaginationBtn from '../components/PaginationBtn';
import BuscarIcon from '../assets/svgs/buscarIcon.svg'
import DisallowedUsers from '../components/Users/DisallowedUsers';
import SearchBar from '../components/SearchBar';


function ModeratorMain() {
  return (
    <>
    <Header />
    <section className='bg-white pt-10'>
                
    </section>
    {/*Usuarios activos*/}
    <p>Usuarios activos</p>
    <div className='bg-secondary py-4 items-center md:flex md:items-center md:justify-center '>
    <Userscard/>
    </div>
    <section className='bg-footerColor'>
        </section>

    <section className='bg-white pt-10'>
      <p>Usuarios desactivados</p>
    </section>

    {/*Usuarios desactivados*/}
    <div className='bg-secondary py-4 items-center md:flex md:items-center md:justify-center '>
    <DisallowedUsers/>
    </div>
    <section className='bg-footerColor'>
     </section>
    </>
  )
}

export default ModeratorMain;
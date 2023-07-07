import React, { useState, useCallback }  from 'react';
import Userscard from '../components/Users/Userscard';
import { Header } from '../components/Header';
import PaginationBtn from '../components/PaginationBtn';
import BuscarIcon from '../assets/svgs/buscarIcon.svg'
import DisallowedUsers from '../components/Users/DisallowedUsers';

function ModeratorMain_admin() {
  return (
    <>
    <Header />
    <section className='bg-white pt-10'>
        <div className='ml-2 relative md:text-xl lg:pl-40 lg:text-2xl'>
            <p>Usuarios activos:</p>
            <form className='flex justify-center py-5 '>
                    <div className='relative'>
                        <input 
                            type="text" 
                            placeholder="Busca un usuario"
                            className='border-solid border rounded-full border-black text-center pr-4 pt-2 pb-2'
                         />  
                         <img 
                                src={BuscarIcon} 
                                alt="Icono de buscar" 
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4'
                            />  
                    </div>        
            </form>
        
        </div>
    </section>
    {/*Usuarios activos*/}
    <div className='bg-secondary py-4 items-center '>
    <Userscard/>
    </div>
    <section className='bg-footerColor'>
    <div className='flex justify-center p-4'> <PaginationBtn/> </div>
    </section>

    <section className='bg-white pt-10'>
    <div className='ml-2 relative md:text-xl lg:pl-40 lg:text-2xl'>
            <p>Usuarios desactivados:</p>
            <form className='flex justify-center py-5 '>
                    <div className='relative'>
                        
                         <img 
                                src={BuscarIcon} 
                                alt="Icono de buscar" 
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4'
                            />    
                    </div>        
            </form>
        
        </div>
    </section>

    {/*Usuarios desactivados*/}
    <div className='bg-secondary py-4 items-center '>
    <DisallowedUsers/>
    </div>
    <section className='bg-footerColor'>
    
    </section>
    </>
  )
}

export default ModeratorMain_admin;
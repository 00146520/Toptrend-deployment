import React from 'react'
import { Header } from '../components/Header';
import BuscarIcon from '../assets/svgs/buscarIcon.svg';
import ticketCard from '../assets/svgs/ticketCard.svg';
import PaginationBtn from '../components/PaginationBtn';
import SearchBar from '../components/SearchBar';
import TicketsVigentes from '../components/Tickets/TicketsVigentes';

const MyTickets = () => {

    return (
        <>
            <section>
                <Header/>
            </section>
            {/* SECCION PARA LA BARRA DE BUSQUEDA DE TICKETS */}
            <section className='bg-white pt-10'>
                
            </section>

            {/* Seccion para las tarjetas de los tickets */}
            <section className=' bg-darkblue pb-10 md:grid md:grid-cols-2 lg:grid-cols-3 '>
            <div className = 'pt-8' >
                <div className='flex justify-center pb-6'>
                <TicketsVigentes/>
                </div>
            </div>
          
            </section>

            {/* Seccion para la paginacion */}
            

        </>
    )
}

export default MyTickets
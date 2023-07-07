import React from 'react'
import { Header } from '../components/Header'
import BuscarIcon from '../assets/svgs/buscarIcon.svg'
import PaginationBtn from '../components/PaginationBtn'

import newCard from '../assets/svgs/newcarevent.svg'
import cheemscard from '../assets/svgs/newcheems.svg'
import SearchBar from '../components/SearchBar'
import EventCard from '../components/Events/EventCard'
import PastEventCard from '../components/Events/PastEventCard'


const Events = () => {

    return (
        <>
            <section>
                <Header/>
            </section>
            {/* SECCION PARA LA BARRA DE BUSQUEDA */}
            <section className='bg-white pt-10'>
                
            </section>

            {/* SECCION PARA MOSTRAR LAS TARJETAS DE LOS EVENTOS */}
            <section className=' bg-darkblue pb-10'>
            <div className = 'pt-8 pb-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:mx-10 md:space-x-4' >
                
                <div className='flex justify-center pb-6 '>
                    <EventCard
                        /* props */
                        title = '¿Quieres ser tu propio jefe?'
                        date= '16/5/23'
                        time='19:39'
                        subcontent = 'Stand up comedy'
                        duration = '120 min.'
                    />
                </div>
                <div className='flex justify-center pb-6 '>
                    <EventCard
                        /* props */
                        title = '¿Quieres ser tu propio jefe?'
                        date= '16/5/23'
                        time='19:39'
                        subcontent = 'Stand up comedy'
                        duration = '120 min.'
                    />
                </div>
                <div className='flex justify-center pb-6 '>
                    <EventCard
                        /* props */
                        title = '¿Quieres ser tu propio jefe?'
                        date= '16/5/23'
                        time='19:39'
                        subcontent = 'Stand up comedy'
                        duration = '120 min.'
                    />
                </div>
                
                
            </div>
            </section>

           

            {/* Seccion para eventos pasados */}
            <section className='bg-white pt-10'>
                <p>Eventos pasados</p>
                
            </section>

            {/* Seccion para ver las tarjetas de los eventos pasados */}
            <section className=' bg-darkblue pb-10'>
            <div className = 'pt-8 pb-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:mx-10 md:space-x-4' >
                
                <div className='flex justify-center pb-6 '>
                    <PastEventCard
                        /* props */
                        title = '¿Quieres ser tu propio jefe?'
                        date= '16/5/23'
                        time='19:39'
                        subcontent = 'Stand up comedy'
                        duration = '120 min.'
                    />
                </div>
                <div className='flex justify-center pb-6 '>
                    <PastEventCard
                        /* props */
                        title = '¿Quieres ser tu propio jefe?'
                        date= '16/5/23'
                        time='19:39'
                        subcontent = 'Stand up comedy'
                        duration = '120 min.'
                    />
                </div>
                <div className='flex justify-center pb-6 '>
                    <PastEventCard
                        /* props */
                        title = '¿Quieres ser tu propio jefe?'
                        date= '16/5/23'
                        time='19:39'
                        subcontent = 'Stand up comedy'
                        duration = '120 min.'
                    />
                </div>
                
            </div>
            </section>

           
            
        </>
    )
}
export default Events

import React from 'react'
import { Link } from 'react-router-dom';
import { Header } from '../components/Header'
import SearchBar from '../components/SearchBar'
import PastEventCard from '../components/Events/PastEventCard'
import EditEventCard from '../components/Events/EditEventCard'
import PaginationBtn from '../components/PaginationBtn'

const MyEvents = () => {
  return (
    <>
        <section>
          <Header/>
        </section>
         {/* Barra de busqueda para los eventos */}
    <section className='bg-white pt-10'>

            <Link to='/neweventform' className='my-10 mx-5 md:flex md:flex-row justify-center' >
                <span className='bg-ourgreen text-white m-10 py-3 px-3 rounded-lg hover:bg-green-400  '>CREAR EVENTOS</span>
            </Link>

    </section>
    {/* Seccion para ver los eventos y poder editarlos */}
    <section className=' bg-darkblue pb-10'>
            <div className = 'pt-8 pb-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:mx-10 md:space-x-4' >
                
                <div className='flex justify-center pb-6 '>
                    <EditEventCard
                        /* props */
                        title = '¿Quieres ser tu propio jefe?'
                        date= '16/5/23'
                        time='19:39'
                        subcontent = 'Stand up comedy'
                        duration = '120 min.'
                    />
                </div>
                <div className='flex justify-center pb-6 '>
                    <EditEventCard
                        /* props */
                        title = '¿Quieres ser tu propio jefe?'
                        date= '16/5/23'
                        time='19:39'
                        subcontent = 'Stand up comedy'
                        duration = '120 min.'
                    />
                </div>
                <div className='flex justify-center pb-6 '>
                    <EditEventCard
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
            {/* Seccion para la paginacion */}
           
    </>
  )
}

export default MyEvents

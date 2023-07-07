import React from 'react';
import Cheems from '../../assets/svgs/Cheems.svg';

const PastEventCard = (props) => {

    return (
        <>

            <section className='bg-ticketColor py-5 w-[80%]  md:w-full rounded-lg grid grid-cols-2'>
                <div className='flex items-center justify-start'>
                    <img src={Cheems} alt="cheems foto" className='w-[60%] md:w-[60%] ml-4' />
                </div>
                {/* Para ver la informacion del evento */}
                <div className=''>
                    <p className='text-sm md:pr-10 font-bold my-2'>{props.title} </p>
                    <div className='grid grid-cols-2'>
                    <p className='text-sm md:pr-10 font-bold'>Fecha:</p>
                    <p className='text-sm md:pr-10 font-bold'>Hora:</p>
                    <p className='text-sm md:pr-10 bg-white w-14 md:w-16 md:pl-1 rounded-md space-x-2 mr-5 text-center'>{props.date} </p>
                    <p className='text-sm md:pr-10 bg-white w-14 md:w-16 md:pl-4 rounded-md space-x-2 mr-5 text-center'>{props.time} </p>
                </div>
                    <p className='text-sm pr-1 my-2'>{props.subcontent}</p>
                    <p className='text-sm pr-1 font-bold'>Duración: <span className='font-thin'>{props.duration}</span></p>
                    
                </div>
            </section>
        </>
    );
}

export default PastEventCard;

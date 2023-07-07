import React from "react";
import BuscarIcon from '../assets/svgs/buscarIcon.svg'

const SearchBar = (props)=>{
    
    return <>
        <div className='bg-white pt-10 w-full relative text-sm md:text-xl lg:text-2xl'>
            <p className='pl-4 sm:pl-20  lg:pl-28'>
                {props.title}
            </p>
            <form className='flex justify-center py-5 '>
                <div className='relative w-3/4 sm:w-2/3'>
                    <input 
                        type="text" 
                        placeholder={props.placeholder}
                        className='w-full border-solid border rounded-full border-black p-2 pr-10 md:pr-16'
                    />  
                    <img 
                        src={BuscarIcon} 
                        alt="Icono de buscar" 
                        className='absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 w-6 hover:w-8 md:w-9 md:right-4 md:hover:w-10 aspect-square bg-green'
                        //onClick={console.log("Look at mee")}
                    />  
                </div>        
            </form>
        
        </div>
    </>
}

export default SearchBar
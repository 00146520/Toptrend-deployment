import React, { useState, useCallback } from 'react'
import disallowedUser from '../../../assets/svgs/disallowedUser.svg'



const DisallowedUser = (props) => {

  


  return (
    <div className="bg-white shadow-md rounded-lg p-2 flex items-center justify-between mt-4 ">
      <div >
        <p className="text-sm font-bold break-words md:text-lg ">Correo electronico:</p>
        <p className="text-sm break-words md:text-lg">{props.email}</p>
        <p className="text-sm font-bold break-words md:text-lg">Nombre de usuario:</p>
        <h2 className="text-gray-600 md:text-lg">{props.username}</h2>
      </div>
      <div className='ml-auto'>
      <img 
      src={ disallowedUser }
      className='ml-auto w-11/12 md:w-36'
      />
      </div>
    </div>
  )
}

export default DisallowedUser
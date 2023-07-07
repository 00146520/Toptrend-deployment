import React from 'react';
import { Link } from 'react-router-dom';


const RolUsercard = (props) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-2 flex items-center justify-between mt-4 md:w-96">
      <div>
        <p className="text-sm font-bold break-words md:text-lg">Correo electrónico:</p>
        <p className="text-sm break-words md:text-lg">{props.email}</p>
        <p className="text-sm font-bold break-words md:text-lg">Nombre de usuario:</p>
        <h2 className="text-gray-600 md:text-lg">{props.username}</h2>
      </div>
      <div className='ml-auto md:ml-auto'>
        <Link
          to={`/rolform?email=${props.email}&username=${props.username}&rol=${props.rol}`}
          className="bg-rolbutton text-white px-4 py-2 rounded-lg"
        >
          Cambiar rol
        </Link>
      </div>
    </div>
  );
}

export default RolUsercard;

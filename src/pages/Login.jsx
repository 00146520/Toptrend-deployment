import React, { useRef, useState } from 'react'
import logo from '../assets/imgs/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import GoogleLoginbtn from '../components/GoogleLoginbtn';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from '../services/LoginService';


function Login(){
  const identifier = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate(); //llamando al hook para poder hacer redireccionamiento


    async function onSubmit(e) {
      e.preventDefault();

      const inputIdentifier = identifier.current.value;
      const inputPassword = password.current.value;

      if (!inputIdentifier || !inputPassword)
            return toast('Llena las casillas con tus datos', { type: 'warning' });

      try {
          const response = await signIn(inputIdentifier,inputPassword);
          
          if(response.status === 200) {
              localStorage.setItem('token', response.data.token);
              navigate('/events');
            }
      } catch (error) {
          const { response } = error
          
          if(response.status === 404) toast('Usuario no encontrado', { type: 'error' });
          else if(response.status === 401) toast('Contraseña incorrecta', { type: 'error' });
          else if(response.status === 403) toast('Servicio denegado', { type: 'error' });
          else if(response.status === 500) toast('Error del servidor f', { type: 'warning' });
      }
    }

return (
    <div className="flex flex-col items-center">
      <div className="w-full h-full flex justify-left items-center m-0 p-0">
        <Link to="/">
        <button className="float-left sm:h-10 w-10 ">
          <img src='/back-svgrepo-com.svg' className='w-auto h-auto'/>
      </button>
        </Link>
      </div>
    <div className="flex justify-center font-sans">
      
    <form className="px-8 pt-6 pb-8 mb-4 font-sans" onSubmit={onSubmit}>

      
        <Link to='/'>
        <div className='flex justify-center mb-4'>
            <img className='w-1/2 h-1/2 shadow-md rounded md:w-2/6 ' src={logo}/>
        </div>
        </Link>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2 md:text-3xl" htmlFor="username">
            Inicie Sesión !
          </label>
        </div>
        <div className="mb-4 md:mb-16 md:h-16">
          <label className="block text-gray-700 font-bold mb-2 md:text-xl" htmlFor="username">
            Ingresa tu usuario
          </label>
          <input
                        className="shadow appearance-none border rounded w-full md:h-full md: py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="identifier"
                        type="text"
                        placeholder="Identificador"
                        ref={identifier}
                      />
        </div>
    
        <div className="mb-6 md:mb-16 md:h-16">
          <label className="block text-gray-700 font-bold mb-2 md:text-xl" htmlFor="password">
            Ingresa tu contraseña
          </label>
          <input
                        className="shadow appearance-none border rounded w-full md:h-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="**********"
                        ref={password}
                      />
        </div>
        <div className="flex justify-center mb-4 md:mb-2">
          <button
            className="border border-black-600 rounded-md px-4 py-2 md:text-2xl"
            type="submit"
          >
            Inicie Sesión 
          </button>
        </div>
        <ToastContainer/>
      </form>
    </div>
      <div className='md:flex md:flex-row md:space-x-4'>
        <Link to="https://www.google.com" className="text-black-600 md:text-2xl"> Tambien puedes con:</Link>
        <GoogleLoginbtn/>
      </div>
    </div>
    
);

}
export default Login;

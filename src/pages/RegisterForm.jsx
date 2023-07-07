import React, { useState, useCallback } from 'react';
import logo from '../assets/imgs/logo.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Registration() {
  //agregamos el estado para poder ir registrando lo que el usuario nos mande
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const BaseURL = 'https://apievens-v2-production.up.railway.app'
  const handleUsernameChange = (event) => {
      setUsername(event.target.value);
  };
  
  const handleEmailChange = (event) => {
      setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
      setPassword(event.target.value);
  };
  


  const handleRegister = async (event) => {
    event.preventDefault();
    console.log('username:', username);
      console.log('email:', email);
      console.log('password:', password);
      // Verificar las validaciones de la contraseña
      const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;

      if (!passwordRegex.test(password)) {
          toast.error('La contraseña no cumple con los requisitos.');
          toast.error('La contraseña debe tener al menos una letra minuscula, mayuscula y un caracter especial (@#$%^&+=)');
          return;
      }
      try {
          const response = await axios.post(`${BaseURL}/auth/signup`, {
              username,
              email,
              password,
          }, {
              headers: {
                  'Content-Type': 'application/json'
          }
          });
          toast.success('Usuario registrado correctamente!');
      } catch (error) {

          if (error.response) {
              const statusCode = error.response.status;
              if (statusCode === 409) {
                  toast.error('El usuario ya existe. Por favor, elige otro nombre de usuario u otro correo.');
              } else if (statusCode === 400) {
                  toast.error('Error al registrar. Por favor, asegúrate de llenar todos los campos correctamente.');
              } else {
                  toast.error('Error al registrar. Por favor, intenta nuevamente.');
              }
              } else {
                  toast.error('Error al conectar con el servidor. Por favor, intenta nuevamente más tarde.');
              }
          }

        
      }

  return (
    <div className="flex flex-col items-center">
      <div class="w-full h-full flex justify-left items-center m-0 p-0">
        <Link to='/'>
          <button className="float-left sm:h-10 w-10 ">
          <img src='/back-svgrepo-com.svg' class='w-auto h-auto'/>
          </button>
        </Link>
      </div>
    <div className="flex justify-center font-sans">
      
      <form className=" px-8 pt-6 pb-8 mb-4  font-sans " onSubmit={handleRegister}>
      
        <Link to='/'>
          <div className='flex justify-center mb-4'>
              <img class='w-1/2 h-1/2 shadow-md rounded md:w-2/6 ' src={logo}/>
          </div>
        </Link>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2 md:text-3xl" htmlFor="username">
            Regístrate!
          </label>
        </div>
        <div className="mb-4 md:mb-16 md:h-16">
          <label className="block text-gray-700 font-bold mb-2 md:text-xl" htmlFor="username">
            Ingresa tu usuario
          </label>
          <input
  className="shadow appearance-none border rounded w-full md:h-full md: py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  id="username"
  type="text"
  placeholder="Nombre de usuario"
  value={username}
  onChange={handleUsernameChange}
/>

        </div>
        <div className="mb-4 md:mb-16 md:h-16">
          <label className="block text-gray-700 font-bold mb-2 md:text-xl" htmlFor="email">
            Ingresa tu correo
          </label>
          <input
            className="shadow appearance-none border rounded w-full md:h-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={handleEmailChange}
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
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex justify-center mb-4 md:mb-2">
          <button
            className="border border-black-600 rounded-md px-4 py-2 md:text-2xl"
            type="submit"
          >
            Registrarse
          </button>
        </div>
        <ToastContainer/>
      </form>
    </div>
    <div className='md:flex md:flex-row md:space-x-4'>
    <p className="text-center md:text-2xl">Ya tienes cuenta?, </p>
    <Link to='/login' className="text-blue-600 md:text-2xl"> Inicia sesión</Link>
    </div>
    <hr className="border-gray-400 my-4 w-full "/>
    <p className="text-center md:text-2xl">También puedes con:</p>
      
      
      
    </div>
  );
}

export default Registration;
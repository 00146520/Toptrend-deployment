import React, { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom';
import { Popup } from 'reactjs-popup';

const RolForm = () => {

  const options = [
    { value: 'option1', label: 'Moderador' },
    { value: 'option2', label: 'Analista' },
    { value: 'option3', label: 'Validador' },
  ];


  const location = useLocation();
    const { email, username, rol } = queryString.parse(location.search);
  const [rols, setRols] = useState([{ value: '' }]);
 

  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleFormSubmit = useCallback(() => {
    // Lógica de envío del formulario
    // ...
  
    // Ejemplo de éxito
    const envioExitoso = true; // Reemplaza esto con tu lógica real de éxito del envío
  
    if (envioExitoso) {
      setShowSuccessPopup(true);
      setPopupMessage('¡Formulario enviado con éxito!');
    } else {
      setShowErrorPopup(true);
      setPopupMessage('Ocurrió un error al enviar el formulario.');
    }
  }, []);
  
  

  const handleConfirmationPopup = useCallback((event) => {
    if (event) {
      event.preventDefault();
    }
    setShowConfirmationPopup(true);
  }, []);
  
  

  const handleConfirmSubmit = useCallback(() => {
    setShowConfirmationPopup(false);
    handleFormSubmit();
  }, [handleFormSubmit]);

  const handleFinalSubmit = useCallback(() => {
    setShowSuccessPopup(false);
  }, []);

  const handleCancelSubmit = useCallback(() => {
    setShowConfirmationPopup(false);
  }, []);

  const handleChangeRol = useCallback((index, event) => {
    const values = [...rols];
    values[index].value = event.target.value;
    setRols(values);
  }, [rols]);

  const handleAddInputRol = useCallback(() => {
    const values = [...rols];
    values.push({ value: '' });
    setRols(values);
  }, [rols]);

  const handleRemoveInputRol = useCallback((index) => {
    const values = [...rols];
    values.splice(index, 1);
    setRols(values);
  }, [rols]);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center m-auto bg-secondary">
        <form onSubmit={handleConfirmationPopup}>
          <div className="mx-auto bg-white p-8 border shadow-md rounded-lg mt-8 mb-24 md:flex">
            <div className="sm:w-2 md:w-1/2 md:pr-4">
              <div className="mb-4">
                <label htmlFor="username" className="text-sm font-bold md:text-lg">
                  Username:
                </label>
                <p id="username" className="sm:text-sm md:text-lg">
                  {username}
                </p>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-sm font-bold md:text-lg">
                  Email:
                </label>
                <p id="email" className="sm:text-sm md:text-lg break-words mr-4">
                  {email}
                </p>
              </div>
            </div>
            <div className="">
              <div className="flex flex-col space-y-2 my-8">
                <label htmlFor="rols" className="block text-black text-md font-bold mb-2 md:text-xl">
                  Rol/es:
                </label>
                {rols.map((input, index) => (
                  <div key={index}>
                    <select id="select" className="py-2 px-2 bg-white border  text-black md:w-11/12 w-9/12" placeholder={rol}>
                {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
                    <button
                      type="button"
                      onClick={() => handleRemoveInputRol(index)}
                      className="bg-buttonFormulary py-2 px-4 text-white bg-secondary "
                    >
                      -
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={handleAddInputRol}
                  className="bg-buttonFormulary rounded-3xl py-2 px-4 text-white  bg-secondary "
                >
                  Agregar
                </button>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2">
                  Cambiar
                </button>
                <Link to="/adminmain" className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Cancelar
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Popup open={showConfirmationPopup} onClose={() => setShowConfirmationPopup(false)}>
        
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="p-4 bg-white flex flex-col items-center justify-center">
      <h3 className="text-xl font-bold mb-4">Rol</h3>
      <div className="bg-gray-500 mt-2 mb-4 w-full h-0.5" />
      <p>¿Quiere cambiar el rol?</p>
      <div className="flex justify-end mt-4">
        <button className="bg-white text-blue-500 px-4 py-2 rounded-lg mr-2" onClick={handleCancelSubmit}>
          Cancelar
        </button>
        <button className="bg-white text-blue-500 px-4 py-2 rounded-lg" onClick={handleConfirmSubmit}>
          Ok
        </button>
      </div>
    </div>
  </div>
      </Popup>

      <Popup open={showSuccessPopup} onClose={() => setShowSuccessPopup(false)}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className=" bg-white flex flex-col items-center justify-center w-64">
          <h3 className="text-xl font-bold mb-4">Rol</h3>
          <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5 '/>
          <p>Hecho!</p>
          <div className="flex justify-center mt-4 w-full">
            <button className="bg-white text-blue-500 px-4 py-2 rounded-lg" onClick={handleFinalSubmit}>
              Ok
            </button>
          </div>
        </div>
        </div>
      </Popup>

      <Popup open={showErrorPopup} onClose={() => setShowErrorPopup(false)}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className=" bg-white flex flex-col items-center justify-center w-64">
          <h3 className="text-xl font-bold mb-4">Rol</h3>
          <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5 '/>
          <p>Error!</p>
          <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5 '/>
          <div className='flex justify-start w-full'>
          <p>Mensaje:</p>
          </div>
          <p>{popupMessage}</p>
          <div className="flex justify-center mt-4 w-full">
            <button className="bg-white text-blue-500 px-4 py-2 rounded-lg" >
              Ok
            </button>
          </div>
        </div>
        </div>
      </Popup>
    </>
  );
};

export default RolForm;

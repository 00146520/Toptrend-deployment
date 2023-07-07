import React, { useState, useCallback } from 'react'
import Popup from 'reactjs-popup'

const Usercard = (props) => {
  const [showDisallowUserPopup, setShowDisallowUserPopup] = useState(false);

  const handleConfirmationDisallowUserPopup = useCallback((event) => {
    event.preventDefault();
    setShowDisallowUserPopup(true);
  }, []);
  

    const handleConfirmDisallowUserSubmit = useCallback(() => {
        setShowDisallowUserPopup(false);
    });

    const handleCancelDisallowUserSubmit = useCallback(() => {
      setShowDisallowUserPopup(false);
    });

    const handleFinalDisallowUser = useCallback(() => {
      setShowDisallowUserPopup(false);
    });

  return (
    <div className="bg-white shadow-md rounded-lg p-2 flex items-center justify-between mt-4 md:w-96">
      <div >
        <p className="text-sm font-bold break-words md:text-lg">Correo electronico:</p>
        <p className="text-sm break-words md:text-lg">{props.email}</p>
        <p className="text-sm font-bold break-words md:text-lg">Nombre de usuario:</p>
        <h2 className="text-gray-600 md:text-lg">{props.username}</h2>
      </div>
      <div className='ml-auto md:ml-auto'>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg " onClick={handleConfirmationDisallowUserPopup}>
        Desactivar
      </button>
      {showDisallowUserPopup && (
        <>
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
        <Popup
          open={true}
          position="center center"
          onClose={handleCancelDisallowUserSubmit}
        >
          <div className="p-4 bg-white flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold mb-4">Desactivar</h3>
            <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5' />
            <div className='flex justify-center items-center w-full flex-col'>
              <p className="text-center">Usuario:</p>
              <div className='flex justify-center items-center my-2'>
                <h1>{props.username}</h1>
              </div>
            </div>
            <p>¿Quieres desactivarlo?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-white text-blue-500 px-4 py-2 rounded-lg mr-2" onClick={handleCancelDisallowUserSubmit}>
                Cancelar
              </button>
              <button className="bg-white text-blue-500 px-4 py-2 rounded-lg" onClick={handleFinalDisallowUser}>
                Ok
              </button>
            </div>
          </div>
        </Popup>
      </>
      )}
      </div>
    </div>
  )
}

export default Usercard
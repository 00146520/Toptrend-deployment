import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from '../components/Header';
import jsQR from 'jsqr';
import Popup from 'reactjs-popup';

const ValidationMain = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSuccessPopup = useCallback((event)=>{
    if (event) {
      event.preventDefault();
    }
    setShowSuccessPopup(true);
  }, []);
  
  const handleSuccessValidation = useCallback(() => {
    setShowSuccessPopup(false);
  }, []);

  const handleFailureValidation = useCallback(() => {
    setShowSuccessPopup(false);
  }, []);

  const handleCancelValidation = useCallback(()=>{
    setShowSuccessPopup(false);
  }, [])
  


  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = { video: { facingMode: 'environment' } };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    }
  }, []);

  const handleScan = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      console.log('QR code detected:', code.data);
      setScannedData(code.data); // Almacena el resultado del escaneo en el estado
    } else {
      console.log('No QR code detected');
      setScannedData('No se detectó ningún código QR'); // Actualiza el estado si no se detecta ningún código QR
    }
  };

  return (
    <>
      <Header />
      <div className="lg:grid lg:grid-cols-2 lg:gap-4 lg:items-center">
      <div className='flex justify-center'>
        <video className='lg:w-96'
          ref={videoRef}
          width="80%"
          height="80%"
          style={{ transform: 'scaleX(-1)' }}
        ></video>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <div>
      <p className='mt-2 underline md:text-lg md:ml-8 md:mt-8'>Codigo:</p>
      <div className='bg-white mt-4 w-auto h-auto items-center flex justify-center md:text-lg md:h-20'>
      {scannedData && <p>{scannedData}</p>} 
      </div>
      <div className='mt-2 flex justify-center items-center'>
      <button onClick={handleScan}
      className='bg-buttonSesion  text-white font-bold py-2 px-4 rounded-full md:text-lg md:mt-8'
      >Escanear</button>
      {showSuccessPopup && (
        <Popup
        open={true}
        position="center center"
        onClose={handleCancelValidation}>
           <div className="p-4 bg-white flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold mb-4">Validacion</h3>
          <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5 '/>
          <p>Mensaje de cualquier vaina</p>
          <div className="flex justify-end mt-4">
            <button className="bg-white text-blue-500 px-4 py-2 rounded-lg" onClick={handleSuccessValidation}>
              Ok
            </button>
          </div>
        </div>
        </Popup>
      )}
      </div>
      </div>
      </div>    
    </>
  );
};

export default ValidationMain;

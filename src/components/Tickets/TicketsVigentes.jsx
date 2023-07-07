import React, { useState, useCallback, useEffect } from 'react';
import { Popup } from 'reactjs-popup';
import QRCode from 'qrcode.react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const TicketsVigentes = (props) => {

    const [showBuyTicketPopup, setShowBuyTicketPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showFailurePopup, setShowFailurePopup] = useState(false);
    const [showQRPopup, setShowQRPopup] = useState(false);
    const [qrData, setQRData] = useState('');
    const [transferValue, setTransferValue] = useState('');
    const [tickets, setTickets] = useState([]);
    const [popupMessage, setPopupMessage] = useState('');
    
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate()




    useEffect(() => {
      console.log(tickets);
      const fetchTickets = async () => {
        try {
          const userToken = localStorage.getItem('token');
          const BaseUrl = 'https://apievens-v2-production.up.railway.app';
          const config = {
            headers: {
              'Authorization': `Bearer ${userToken}`,
            },
            params: {
              title:props.search,
              page: currentPage,
              size: 4,
              
            }
          };
    
          const response = await axios.get(`${BaseUrl}/ticket/get`, config);
          const newTickets = response.data.content;
    
          // Filtrar los tickets duplicados
          const filteredTickets = newTickets.filter((newTicket) => {
            return !tickets.some((existingTicket) => existingTicket.code === newTicket.code);
          });
    
          // Reemplazar los tickets existentes con los nuevos datos filtrados
          setTickets((prevTickets) => [...filteredTickets]);
    
          setTotalPages(response.data.total_pages);
        } catch (error) {
          console.error(error);
          // Manejo de errores de solicitud
        }
      };
    
      fetchTickets();
    }, [currentPage]);
     // Cambia el arreglo de dependencias a []
    
     const goToPage = (page) => {
      if (page >= 0 && page < totalPages) {
        setCurrentPage(page);
      }
    };
    



    

    const handleConfirmationQRTicketPopup = useCallback(() => {
      setShowQRPopup(true);
      setQRData('ABC123'); // Aquí debes establecer la secuencia de letras y números adecuada
    }, []);
    

    const handleConfirmationTransferTicketPopup = useCallback(() => {
      setShowBuyTicketPopup(true);
    }, []);
  
 
  
    const handleCloseQRTicketPopup = useCallback(() => {
      setShowQRPopup(false);
    }, []);

    const handleCancelBuyTicketSubmit = useCallback(() => {
      setShowBuyTicketPopup(false);
    }, []);
  
  
  
  
   
  
  
  
    const handleFinalBuyTicket = useCallback(async (event) => {
      event.preventDefault();
      setShowBuyTicketPopup(false);
      
      
      const BaseUrl = 'https://apievens-v2-production.up.railway.app';
      const userToken = localStorage.getItem('token');


      const userDestination = '44c5fc80-f8f9-4f33-9919-6f88a09118ae';
      // Aquí deberías agregar la lógica para verificar si la compra fue exitosa o no.
       // Cambiar por la lógica real
  
      const ticketID = '5c193df7-77d5-4f3c-b1a4-29898f1bc59f'
      const formTransfer = {
        newOwnerCode : userDestination,
        ticketCode: ticketID
      }

      const config = {
        headers: { 
            'Authorization': `Bearer ${userToken}`,
        }
    };

    try {
      console.log(formTransfer);
      const responseTransfer = await axios.post(`${BaseUrl}/ticket/sendTransfer`, formTransfer, config);
      
      if (responseTransfer.data ) {
        // La solicitud se realizó con éxito
        setShowSuccessPopup(false);
        setShowFailurePopup(true); // Asegúrate de establecer false para el popup de fallo
        setPopupMessage('Ocurrió un error al enviar el formulario.');
      } else {
        // La solicitud no se realizó con éxito
        setShowSuccessPopup(true); // Asegúrate de establecer false para el popup de éxito
        setShowFailurePopup(false);
        console.log(responseTransfer.data)
        setPopupMessage('¡Formulario enviado con éxito!');
      }
    } catch (error) {
      // Error al realizar la solicitud
      console.log(error);
      setShowSuccessPopup(true); // Asegúrate de establecer false para el popup de éxito
      setShowFailurePopup(false);
      setPopupMessage('Ocurrió un error al enviar el formulario.');
    }
    
    
    
    }, [transferValue]);
  
    const handleCloseFinalBuyTicket = useCallback((event) => {
      event.preventDefault();
  
      // Aquí deberías agregar la lógica para verificar si la compra fue exitosa o no.
  // Cambiar por la lógica real
  
        setShowSuccessPopup(false);
  
        setShowFailurePopup(false);
      
    });
  

  return (
    <>
      <section className='flex flex-row flex-wrap w-full'>
        <div className='bg-ticketColor text-center mx-5'>
        

        {tickets.length > 0 ? (
  tickets.map((ticket, index) => (
    <div key={`${ticket.code}-${index}`}>
       <p className='text-2xl py-5'>{ticket.eventTitle}</p>
       
        <hr className='hr-custom pb-5' />
        
        <section className='grid grid-cols-2 justify-items-center items-center'>
        <label>Fecha:</label>
          <label>Hora:</label>
          {/* label para fecha */}
          <label className="placeholder:text-center shadow appearance-none border rounded w-auto py-2 px-3  mb-5 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline">
          <p>{ticket.eventDate}</p>
          </label>
          {/* Input para HORA */}
          <label className="placeholder:text-center shadow appearance-none border rounded w-auto py-2 px-3 mb-5 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline">
          <p>{ticket.eventTime}</p>
          </label>
          <label>Localidad: </label>
          <label>Precio $: </label>
          
          <label className="placeholder:text-center shadow appearance-none border rounded w-1/2 py-2 px-3 mb-5 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline">
          <p>{ticket.location}</p>
          </label>
          <label className="placeholder:text-center shadow appearance-none border rounded w-1/2 py-2 px-3 mb-5 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline">
          <p>{ticket.price}</p>
          </label>
         <div className='text-white'>
          <button
            className="my-5 border border-black-600 rounded-md px-4 py-2 md:text-2xl bg-ourgreen hover:bg-green-600 ml-5"
            type="button" onClick={handleConfirmationQRTicketPopup}>
            Generar QR
          </button>
          </div>
          {/* el segundo boton */}
          <div className='text-white'> 
          <button
            className="border border-black-600 rounded-md px-4 py-2 md:text-2xl bg-ourpurple hover:bg-purple-800"
            type="button"
            onClick={handleConfirmationTransferTicketPopup}>
            Transferir
          </button>
          </div>
        </section>
      
      <div className='bg-darkblue w-full h-10'/>
      
      
      {/* Mostrar más detalles del ticket según tus necesidades */}
    </div>
  ))
) : (
  <p>No hay tickets disponibles.</p>
)}




       

        <section className='grid grid-cols-2 justify-items-center items-center'>
          <div className='text-white'>
          
          {showBuyTicketPopup && (
  <>
    <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
    <Popup
      open={true}
      position="center center"
      onClose={handleCancelBuyTicketSubmit}
    >
      <div className="p-4 bg-white flex flex-col items-center justify-center rounded-md">
        <h3 className="text-xl font-bold mb-4">Transferir</h3>
        <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5' />
        <div className='flex justify-center items-center w-full flex-col'>
          <p className="text-center">Evento:</p>
          <div className='flex justify-center items-center my-2'>
            <h1>Titulo del evento</h1>
          </div>

        </div>
        <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5' />
        <form onSubmit={handleFinalBuyTicket}>
          
          <div className="my-2">
          <p>Escriba el correo electronico o usuario al que se le transferira el ticket</p>
            <div className='my-4 '>
            <input id='DestinationUser'
            type='text' className='border border-gray-400 rounded w-full h-10' 
            placeholder='Ejem. test@test.com'
            value={transferValue}
            onChange={(event) => setTransferValue(event.target.value)}
            />
    
            </div>
          </div>

          <div className='flex  justify-center my-4'>
            <button type="submit" className='mr-8 bg-white text-blue-500 rounded w-20 h-9'>
              OK
            </button>
            <button type='button' onClick={handleCancelBuyTicketSubmit} className='bg-white rounded w-20 h-9 text-blue-500'>
              Cancelar
            </button>
          </div>
        </form> 
      </div>
    </Popup>
   
  </>
)}{showSuccessPopup && (
  <>
    <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
    <Popup
      open={true}
      position="center center"
      onClose={() => setShowSuccessPopup(false)}
    >
      <div className="p-4 bg-white flex flex-col items-center justify-center w-56 rounded-md">
        <h3 className="text-xl font-bold mb-4">Transferir</h3>
        <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5 '/>
        <p>Hecho!</p>
        <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5 '/>
        <button className="bg-white text-blue-500 px-4 py-2 rounded-lg" onClick={handleCloseFinalBuyTicket} >
              Ok
        </button>
      </div>
    </Popup>
  </>
)}
{showFailurePopup && (
  <>
    <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
    <Popup
      open={true}
      position="center center"
      onClose={() => setShowFailurePopup(false)}
    >
      <div className=" bg-white flex flex-col items-center justify-center w-64 rounded-md">
          <h3 className="text-xl font-bold mb-4">Transferir</h3>
          <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5 '/>
          <p>Error!</p>
          <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5 '/>
          <div className='flex justify-start w-full'>
          <p>Mensaje:</p>
          </div>
          <p>{popupMessage}</p>
          <div className="flex justify-center mt-4 w-full">
            <button className="bg-white text-blue-500 px-4 py-2 rounded-lg" onClick={handleCloseFinalBuyTicket}>
              Ok
            </button>
          </div>
        </div>
    </Popup>
  </>
)}
{showQRPopup && (
  <>
    <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
    <Popup
      open={true}
      position="center center"
      onClose={() => setShowQRPopup(false)}
    >
      <div className=" bg-white flex flex-col items-center justify-center w-64 rounded-md">
          <h3 className="text-xl font-bold mb-4">Codigo QR</h3>
          <p>Titulo del evento</p>
          <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5 '/>
          <QRCode value={qrData} />
          <div className="flex justify-center mt-4 w-full">
            <button className="bg-white text-blue-500 px-4 py-2 rounded-lg" onClick={handleCloseQRTicketPopup}>
              Ok
            </button>
          </div>
        </div>
    </Popup>
  </>
)}

 {/* Paginación */}
 <div className='space-x-2 py-3'>
          {Array.from({ length: totalPages }, (_, index) => index ).map((page) => (
            <button key={page} onClick={() => goToPage(page)} className='bg-secondary px-4 rounded-xl space-x-2'>
              {page+1}
            </button>
          ))}
        </div>
          </div>
        </section>
        </div>
      </section>
    </>
  );
}

export default TicketsVigentes;

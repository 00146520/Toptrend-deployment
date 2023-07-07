import React, { useState, useCallback } from 'react';
import Cheems from '../../assets/svgs/Cheems.svg';
import SearchIcon from '../../assets/svgs/SearchIcon.svg'
import { Link } from 'react-router-dom';
import { Popup } from 'reactjs-popup';
import axios from 'axios';



const CustomDropdown = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    onSelect(option.value); // Pasa el valor seleccionado como parámetro
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="mb-4 md:mb-16 md:h-16">
      <div className="md:flex md:flex-row md:space-x-4">
        <label className="block text-black text-md  mb-2 md:text-xl" htmlFor="category">
          Localidad:
        </label>
      </div>
      <div className="relative">
        <button type="button" className="appearance-none border rounded bg-buttonFormulary py-2 px-4 w-full text-left text-black" onClick={toggleDropdown}>
          {selectedOption ? selectedOption.label : 'Seleccionar localidad'}
        </button>
        {isDropdownOpen && (
          <ul className="absolute bg-white border rounded w-full mt-1">
            {options.map((option) => (
              <li key={option.value} className="cursor-pointer py-2 px-4 hover:bg-gray-200" onClick={() => handleOptionSelect(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedOption && selectedOption.price && (
          <span className="text-sm text-gray-500">Precio: ${selectedOption.price}</span>
      )}
    </div>
  );
};


const EventCard = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const options = [
    { label: 'Opción 1', value: '63f865ca-a75c-4477-b1fe-286f1d54be96', price: 20 },
    { label: 'Opción 2', value: 'opcion2', price: 2.0 },
    { label: 'Opción 3', value: 'opcion3', price: 2.5 },
    // Agregar más opciones de categoría aquí
  ];

  const [showBuyTicketPopup, setShowBuyTicketPopup] = useState(false);
  const [number, setNumber] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailurePopup, setShowFailurePopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleConfirmationBuyTicketPopup = useCallback(() => {
    setShowBuyTicketPopup(true);
  }, []);



  const handleCancelBuyTicketSubmit = useCallback(() => {
    setShowBuyTicketPopup(false);
  }, []);


  const incrementNumber = () => {
    const newNumber = number + 1;
    setNumber(newNumber);
    calculateTotal(newNumber);
  };
  
  const decrementNumber = () => {
    if (number > 0) {
      const newNumber = number - 1;
      setNumber(newNumber);
      calculateTotal(newNumber);
    }
  };
  
  const calculateTotal = (newNumber) => {
    const selectedOption = options.find((option) => option.value === selectedCategory);
    const totalPrice = selectedOption.price * newNumber;
    setTotalPrice(totalPrice);
  };


  const handleConfirmBuyTicketSubmit = useCallback((event) => {
    event.preventDefault();
    setShowBuyTicketPopup(false);
  
    const selectedOption = options.find((option) => option.value === selectedCategory);
    const totalPrice = selectedOption.price * number;
    setTotalPrice(totalPrice);
  }, [number, selectedCategory, options]);



  const handleFinalBuyTicket = useCallback(async(event) => {
    event.preventDefault();
    setShowBuyTicketPopup(false);
    
  
    const inputFieldValue = event.target.elements['category'].value; 
    const numberFieldValue = event.target.elements['ticketQuantity'].value;
    const totalValue = document.getElementById('total').innerText;

    const ticketQuantity = parseInt(numberFieldValue, 10); // Cantidad de tickets
    const BaseUrl = 'https://apievens-v2-production.up.railway.app';
    const userToken = localStorage.getItem('token');

    const data = {
      locationCode: inputFieldValue,
      ticketQuantity: ticketQuantity,
    };

    const config = {
      headers: { 
          'Authorization': `Bearer ${userToken}`,
      }
  };
  try {
    console.log(data)
    const response = await axios.post(`${BaseUrl}/ticket/${inputFieldValue}`, data, config);
    
    if (response) {
      // La solicitud se realizó con éxito
      setShowSuccessPopup(true);
      setPopupMessage('¡Formulario enviado con éxito!');
    }else {
      // La solicitud no se realizó con éxito
      setShowFailurePopup(true);
      setPopupMessage('Ocurrió un error al enviar el formulario.');
    }
  } catch (error) {
      // Error al realizar la solicitud
      setShowFailurePopup(true);
      setPopupMessage('Ocurrió un error al enviar el formulario.');
    }
      

  
   
  }, []);

  const handleCloseFinalBuyTicket = useCallback((event) => {
    event.preventDefault();

    // Aquí deberías agregar la lógica para verificar si la compra fue exitosa o no.
// Cambiar por la lógica real

      setShowSuccessPopup(false);

      setShowFailurePopup(false);
    
  });

  

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
          <div className='md:flex md:flex-row space-x-5'>
            <button className='bg-buttonSesion text-white py-2 px-2 rounded-lg mt-5 hover:bg-amber-700'
              type='submit' onClick={handleConfirmationBuyTicketPopup}
            >Comprar</button>
           {showBuyTicketPopup && (
  <>
    <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
    <Popup
      open={true}
      position="center center"
      onClose={handleCancelBuyTicketSubmit}
    >
      <div className="p-4 bg-white flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold mb-4">Comprar</h3>
        <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5' />
        <div className='flex justify-center items-center w-full flex-col'>
          <p className="text-center">Evento:</p>
          <div className='flex justify-center items-center my-2'>
            <h1>{props.title}</h1>
          </div>

        </div>
        <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5' />
        <form onSubmit={handleFinalBuyTicket}>
          <CustomDropdown className="button" options={options} onSelect={setSelectedCategory} />
          <input
            type="hidden"
            name="category"
            value={selectedCategory}
          />
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <button type="button" onClick={decrementNumber} className="border border-gray-400 rounded px-2 py-1">
                -
              </button>
              <input type="text"
              name='number'
               value={number} readOnly className="border border-gray-400 rounded px-2 py-1 w-10 flex " />
              <button type="button" onClick={incrementNumber} className="border border-gray-400 rounded px-2 py-1">
                +
              </button>
            </div>
            <div>
              <input type="hidden" name="ticketQuantity" value={number} />
              <span 
              id = 'total'
              className="ml-2">Total: {totalPrice.toFixed(2)}</span>
              <span>$</span>
            </div>
          </div>

          <div className='flex  justify-center my-4'>
            <button type="submit" className='mr-8 bg-green-400 rounded w-20 h-9'>
              comprar
            </button>
            <button type='button' onClick={handleCancelBuyTicketSubmit} className='bg-red-400 rounded w-20 h-9'>
              cancelar
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
        <h3 className="text-xl font-bold mb-4">Comprar</h3>
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
          <h3 className="text-xl font-bold mb-4">Comprar</h3>
          <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5 '/>
          <p>Error!</p>
          <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5 '/>
          <div className='flex justify-start w-full'>
          <p>Mensaje:</p>
          </div>
          <p>Alguna vaina aca</p>
          <div className="flex justify-center mt-4 w-full">
            <button className="bg-white text-blue-500 px-4 py-2 rounded-lg" onClick={handleCloseFinalBuyTicket}>
              Ok
            </button>
          </div>
        </div>
    </Popup>
  </>
)}
            <Link to='/eventinfo'>
              <img src={SearchIcon} alt="iconSearch" className='w-[30%] md:w-[20%] bg-ourpurple rounded-md lg:rounded-xl lg:h-14 lg:w-10  mt-5' />
            </Link>

          </div>
        </div>
      </section>
    </>
  );
}

export default EventCard;

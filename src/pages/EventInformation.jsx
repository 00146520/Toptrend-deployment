import React, { useState, useCallback } from 'react';
import { Header } from '../components/Header';
import Cheems from '../assets/svgs/Cheems.svg';
import { Popup } from 'reactjs-popup';


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

const EventInformation = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const options = [
      { label: 'Opción 1', value: 'opcion1', price: 1.5 },
      { label: 'Opción 2', value: 'opcion2', price: 2.0 },
      { label: 'Opción 3', value: 'opcion3', price: 2.5 },
      // Agregar más opciones de categoría aquí
    ];
  
    const [showBuyTicketPopup, setShowBuyTicketPopup] = useState(false);
    const [number, setNumber] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showFailurePopup, setShowFailurePopup] = useState(false);
  
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
  
  
  
    const handleFinalBuyTicket = useCallback((event) => {
      event.preventDefault();
      setShowBuyTicketPopup(false);

      const inputFieldValue = event.target.elements['category'].value; 
      const numberFieldValue = event.target.elements['ticketQuantity'].value;
      const totalValue = document.getElementById('total').innerText;
  
      console.log('Valor del campo de entrada:', inputFieldValue);
      console.log('cantidad:', numberFieldValue);
      console.log('Total:', totalValue);
  
  
      // Aquí deberías agregar la lógica para verificar si la compra fue exitosa o no.
      const isPurchaseSuccessful = true; // Cambiar por la lógica real
  
      if (isPurchaseSuccessful) {
        setShowSuccessPopup(true);
      } else {
        setShowFailurePopup(true);
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
            <section>
                <Header/>
            </section>

            <section className='bg-darkblue'>
                <div className='flex flex-col items-center md:grid md:grid-cols-2 text-white '>
                    <img src={Cheems} alt="cheems" className='w-[50%] md:ml-28 mt-10 md:mt-0'/>
                <div className='md: w-[50%] text-center mt-5 '>
                <h3 className='mt-4 font-bold text-2xl'>Titulo del evento:</h3>
                    <p className='mt-2 bg-white text-black rounded-md py-1 px-1'>¿Quieres ser tu propio jefe?</p>
                    <h3 className='mt-4 font-bold text-2xl'>Hora: </h3>
                    <p className='mt-2 bg-white text-black rounded-md py-1 px-1'>19:30</p>
                    <h3 className='mt-4 font-bold text-2xl'>Fecha del evento: </h3>
                    <p className='mt-2 bg-white text-black rounded-md py-1 px-1'>15/12/23</p>
                    <h3 className='mt-4 font-bold text-2xl'>Categoria: </h3>
                    <p className='mt-2 bg-white text-black rounded-md py-1 px-1'>Stand up comedy</p>
                    <h3 className='mt-4 font-bold text-2xl'>Patrocinadores: </h3>
                    <p className='mt-2 bg-white text-black rounded-md py-1 px-1'>barcita, kotlinzz</p>
                    <h3 className='mt-4 font-bold text-2xl'>Involucrados: </h3>
                    <p className='mt-2 bg-white text-black rounded-md py-1 px-1'>Mesi, ehh mesi, duglas</p>
                    <h3 className='mt-4 font-bold text-2xl'>Localidades:</h3>
                <div className='flex flex-col items-center md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3'>
                    <button className='bg-white  text-black rounded-md py-3 w-[70%] mb-5 md:w-full ' >GENERAL <br /> <span>Disponible</span> <br /> <span>10$</span></button>
                    <button className='bg-white text-black rounded-md py-3 w-[70%] mb-5 md:w-full'>Platinum <br /> <span>Agotado</span> <br /> <span>15$</span></button>
                    <button className='bg-white text-black rounded-md py-3 w-[70%]  mb-5 md:w-full' >VIP <br /> <span>Disponible</span> <br /> <span>25$</span></button>
                    <div>
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
            <h1>Titulo de la vaina</h1>
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
              <input 
              name='number'
              type="text" value={number} readOnly className="border border-gray-400 rounded px-2 py-1 w-10 flex " />
              <button type="button" onClick={incrementNumber} className="border border-gray-400 rounded px-2 py-1">
                +
              </button>
            </div>
            <div>
              <input type="hidden" name="ticketQuantity" value={number} />
              <span id = 'total' className="ml-2">Total: {totalPrice.toFixed(2)}</span>
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
          <h3 className="text-xl font-bold mb-4">Rol</h3>
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
                    </div>
                </div>
                </div>
                </div>
            </section>
        </>
    )
}

export default EventInformation
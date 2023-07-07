import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header } from '../components/Header';
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
        <label className="block text-white text-md font-bold mb-2 md:text-xl" htmlFor="category">
          Categoría del evento:
        </label>
      </div>
      <div className="relative">
        <button type='button'
          className="appearance-none border rounded bg-buttonFormulary py-2 px-4 w-full text-left text-white" 
          onClick={toggleDropdown}
        >
          {selectedOption ? selectedOption.label : 'Seleccionar categoría'}
        </button>
        {isDropdownOpen && (
          <ul className="absolute bg-white border rounded w-full mt-1">
            {options.map((option) => (
              <li
                key={option.value}
                className="cursor-pointer py-2 px-4 hover:bg-gray-200"
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

function NewEventForm() {
  
 
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  

  const options = [
    { label: 'Opción 1', value: 'opcion1' },
    { label: 'Opción 2', value: 'opcion2' },
    { label: 'Opción 3', value: 'opcion3' },
    // Agregar más opciones de categoría aquí
  ];


  const [inputs, setInputs] = useState([{ value: '' }]);
  const [sponsors, setSponsors] = useState([{ value: '' }]);
  const [localizations, setLocalizations] = useState([]);
  const [files, setFiles] = useState([]);

  

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  const fileList = files.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const handleChangeInvolved = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
  };
  
  
  const handleAddInputInvolved = () => {
    setInputs([...inputs, { value: '' }]);
  };
  

  const handleRemoveInputInvolved = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };
  

  const handleChangeSponsor = (index, event) => {
    const newSponsors = [...sponsors];
    newSponsors[index].value = event.target.value;
    setSponsors(newSponsors);
  };
  
  const handleAddInputSponsor = () => {
    setSponsors([...sponsors, { value: '' }]);
  };
  
  const handleRemoveInputSponsor = (index) => {
    const newSponsors = sponsors.filter((_, i) => i !== index);
    setSponsors(newSponsors);
  };
  
  

  const handleChangeLocalization = (index, key, event) => {
    const newLocalizations = [...localizations];
    newLocalizations[index][key] = event.target.value;
    setLocalizations(newLocalizations);
  };
  

  const handleAddInputLocalization = () => {
    setLocalizations([...localizations, { name: '', price: '', capacity: '' }]);
  };
  

  const handleRemoveInputLocalization = (index) => {
    const newLocalizations = localizations.filter((_, i) => i !== index);
    setLocalizations(newLocalizations);
  };

 

  const [selectedCategory, setSelectedCategory] = useState('');


  const handleFormSubmit = useCallback(async (event) => {
    event.preventDefault();
   
    const envioExitoso = true; // Reemplaza esto con tu lógica real de éxito del envío
     
  const selectedName = document.getElementById("eventname").value;
  const selectedDate = document.getElementById("eventdate").value;
  const selectedHour = document.getElementById("eventtime").value+":00"; //sera esto?
  const inputValues = inputs.map((input) => {return{name: input.value}});
  const sponsorsValues= sponsors.map((sponsor) => {return{name: sponsor.value}});
  const eventDuration = document.getElementById("duration").value;
 
  const BaseUrl = 'https://apievens-v2-production.up.railway.app';
  const userToken = localStorage.getItem('token');
  //const selectedCategory = event.target.elements.category.value;
  
  const localizationsData = [];
  localizations.forEach((localization, index) => {
  const name = localization.name || 'Nombre vacío';
  const price = localization.price || 'Precio vacío';
  const maxCapacity = localization.capacity || 'Capacidad vacía';
  const Newlocalization = {
    name,
    price,
    maxCapacity,
  };
  // Agrega el objeto de localizationData a la variable localizationsData
  localizationsData.push(Newlocalization);
});

const codeCategory = 'e2e2d781-5731-46c4-97bb-90a7833fae36'

const bytes = atob("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
const formData = {
  title: selectedName,
  img: "despuesvemos bien",
  duration: eventDuration, //agrega esta mierda
  date: selectedDate,
  time: selectedHour,
  categoryCode: codeCategory,
  involveds: inputValues,
  sponsors: sponsorsValues,
  locations: localizationsData,
};

const config = {
      headers: { 
          'Authorization': `Bearer ${userToken}`,
      }
  };

try {
  console.log(formData)
  const response = await axios.post(`${BaseUrl}/event/save`, formData, config);
  
  if (response) {
    // La solicitud se realizó con éxito
    setShowSuccessPopup(true);
    setPopupMessage('¡Formulario enviado con éxito!');
  }else {
    // La solicitud no se realizó con éxito
    setShowErrorPopup(true);
    setPopupMessage('Ocurrió un error al enviar el formulario.');
  }
} catch (error) {
    // Error al realizar la solicitud
    setShowErrorPopup(true);
    setPopupMessage('Ocurrió un error al enviar el formulario.');
  }
    
  }, [inputs, sponsors, localizations]);




  const handleConfirmationPopup = useCallback((event) => {
  event.preventDefault();

  setShowConfirmationPopup(true);
}, []);

  
  

  const handleConfirmSubmit = useCallback((event) => {
    
    
    setShowConfirmationPopup(false);
    handleFormSubmit(event);
  }, [handleFormSubmit]);

  const handleCloseSubmit = useCallback(()=>{
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  });

  const handleCancelSubmit = useCallback(() => {
    setShowConfirmationPopup(false);
  }, []);


  return (
    <>
   <Header/>
   <div className="flex justify-center font-sans w-full h-full mx-0 bg-secondary ">
      <form onSubmit={handleConfirmationPopup} className='mt-8'>
        <div className="mx-auto w-full max-w-4xl px-8 md:mt-10">
          <div className="mb-4 md:mb-24 md:h-16">
            <div className='md:flex md:flex-row md:space-x-4'>
                <label className="block text-white text-md font-bold mb-2 md:text-xl" htmlFor="username">
                Nombre del evento:
                </label>
            </div>
            <div>
                <label className="block text-white text-sm mb-2 md:text-xl" htmlFor="username">
                Esto se mostrará en la pestaña de eventos principalmente
                </label>
            </div>
          <input
            className="shadow appearance-none  rounded w-full md:h-full md: py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-secondary border"
            id="eventname"
            type="text"
            placeholder="Nombre del evento"
          />
        </div>

    
        <div className="mb-4 md:mb-24 md:h-16 ">
            <div className='md:flex md:flex-row md:space-x-4'>
                <label className="block text-white text-md font-bold mb-2 md:text-xl" >
                Indique fecha y hora para mostrarlo a los usuarios
                </label>
            </div>
            <div>
                <label className="block text-white text-sm mb-2 md:text-xl" htmlFor="date">
                Fecha:
                </label>
            </div>
          <input
            className="shadow appearance-none  rounded w-full md:h-full md: py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-secondary border"
            id="eventdate"
            type="date"
          />
        </div>


        <div className="mb-4 md:mb-16 md:h-16 ">
            <div className='md:flex md:flex-row md:space-x-4'>
                <label className="block text-white text-md font-bold mb-2 md:text-xl" htmlFor="time">
                Hora:
                </label>
            </div>
          <input
            className="shadow appearance-none  rounded w-full md:h-full md: py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-secondary border"
            id="eventtime"
            type="time"
          />
        </div>

        <div className="mb-4 md:mb-16 md:h-16 ">
            <div className='md:flex md:flex-row md:space-x-4'>
                <label className="block text-white text-md font-bold mb-2 md:text-xl" htmlFor="time">
                Duracion puesto en minutos:
                </label>
            </div>
          <input
            className="shadow appearance-none  rounded w-full md:h-full md: py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-secondary border"
            id="duration"
            type="number"
          />
        </div>

        <CustomDropdown className="button" options={options} onSelect={setSelectedCategory} />


        <input
  type="hidden"
  name="category"
  value={selectedCategory}
/>
        
        <div className="mb-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="involved" className="block text-white text-md font-bold mb-2 md:text-xl">
              Involucrados:
            </label>
            {inputs.map((input, index) => (
                <div key={index}>
                  <input
                    className="py-2 px-2 bg-secondary border text-white md:w-11/12 w-54"
                    type="text"
                    value={input.value}
                    onChange={(event) => handleChangeInvolved(index, event)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveInputInvolved(index)}
                    className="bg-buttonFormulary py-2 px-4 text-black bg-white"
                  >
                    -
                  </button>
                </div>
              ))}

            <button
              type="button"
              onClick={handleAddInputInvolved}
              className="bg-buttonFormulary rounded-3xl py-2 px-4 text-black mt-4 bg-white"
            >
              Agregar
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="sponsors" className="block text-white text-md font-bold mb-2 md:text-xl">
              Patrocinadores:
            </label>
              {sponsors.map((sponsor, index) => (
                <div key={index}>
                  <input
                    className="py-2 px-2 bg-secondary border text-white md:w-11/12 w-54"
                    type="text"
                    value={sponsor.value}
                    onChange={(event) => handleChangeSponsor(index, event)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveInputSponsor(index)}
                    className="bg-buttonFormulary py-2 px-4 text-black bg-white"
                  >
                    -
                  </button>
                </div>
              ))}

            <button
              type="button"
              onClick={handleAddInputSponsor}
              className="bg-buttonFormulary rounded-3xl py-2 px-4 text-black mt-4 bg-white"
            >
              Agregar
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="localizations" className="block text-white text-md font-bold mb-2 md:text-xl">
              Localizaciones:
            </label>
            {localizations.map((localization, index) => (
  <div key={index}>
    <input
      className="py-2 px-2 bg-secondary border text-white md:w-11/12 w-54"
      type="text"
      value={localization.name}
      onChange={(event) => handleChangeLocalization(index, "name", event)}
      placeholder="Nombre de la localización"
    />
    <input
      className="py-2 px-2 bg-secondary border text-white md:w-11/12 w-54"
      type="number"
      value={localization.price}
      onChange={(event) => handleChangeLocalization(index, "price", event)}
      placeholder="Precio"
    />
    <input
      className="py-2 px-2 bg-secondary border text-white md:w-11/12 w-54"
      type="number"
      value={localization.capacity}
      onChange={(event) => handleChangeLocalization(index, "capacity", event)}
      placeholder="Capacidad"
    />
    <button
      type="button"
      onClick={() => handleRemoveInputLocalization(index)}
      className="bg-buttonFormulary py-2 px-4 text-black bg-white"
    >
      -
    </button>
  </div>
))}

            <button
              type="button"
              onClick={handleAddInputLocalization}
              className="bg-buttonFormulary rounded-3xl py-2 px-4 text-black mt-4 bg-white"
            >
              Agregar
            </button>
          </div>
        </div>

      
     
      <div className='mb-4 md:mb-10 md:h-16  '>
        <div>
                <label className="block text-white text-md font-bold mb-2 md:text-xl" htmlFor="username">
                Imagen del evento:
                </label>
            </div>
            <div>
                <label className="block text-white text-sm mb-2 md:text-xl" htmlFor="username">
                Esto se mostrará en la pestaña de eventos principalmente
                </label>
            </div>
      </div>
      <div className="flex flex-col items-center justify-center">
      <div className='mb-4 w-64 md:w-96 shadow appearance-none border rounded h-20 flex items-center justify-center text-gray-700 focus:outline-none focus:shadow-outline cursor-pointer bg-white' {...getRootProps()}>
      <input id='eventImage' {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta la imagen aquí</p>
      ):(
        <p>Sube una imagen</p>
      )}
      </div>
      <ul>{fileList}</ul>
      </div>
      


      <div className="flex justify-between mt-8 md:mx-28 md:mb-10 mb-8">
      <button type="submit" className="bg-green-500 rounded-full py-2 px-8 text-white md:w-40">
              Crear
            </button>
            <button type="button" className="bg-red-500 rounded-full py-2 px-5 text-white md:w-40">
              Cancelar
            </button>
       </div>


      </div>
    </form>
    </div>

    <Popup open={showConfirmationPopup} onClose={() => setShowConfirmationPopup(false)}>
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="p-4 bg-white flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold mb-4">Evento</h3>
          <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5 '/>
          <p>¿Quiere crear el nuevo evento?</p>
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
          <h3 className="text-xl font-bold mb-4">Evento</h3>
          <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5 '/>
          <p>Hecho!</p>
          <div className="flex justify-center mt-4 w-full">
            <button className="bg-white text-blue-500 px-4 py-2 rounded-lg" onClick={handleCloseSubmit}>
              Ok
            </button>
          </div>
        </div>
      </div>
      </Popup>

      <Popup open={showErrorPopup} onClose={() => setShowErrorPopup(false)}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className=" bg-white flex flex-col items-center justify-center w-64">
          <h3 className="text-xl font-bold mb-4">Evento</h3>
          <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5 '/>
          <p>Error!</p>
          <div className='bg-gray-500 mt-2 mb-4 w-full h-0.5 '/>
          <div className='flex justify-start w-full'>
          <p>Mensaje:</p>
          </div>
          <p>{popupMessage}</p>
          <div className="flex justify-center mt-4 w-full">
            <button className="bg-white text-blue-500 px-4 py-2 rounded-lg" onClick={handleCloseSubmit}>
              Ok
            </button>
          </div>
        </div>
      </div>
      </Popup>


    </>
  );
}



export default NewEventForm;


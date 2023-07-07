import { React, useState } from "react";
import { Header } from "../components/Header";
import SearchBar from "../components/SearchBar";
import SavIcon from "../assets/svgs/save-icon.svg"
import IndicatorElement from "../components/IndicatorElement";
import okIcon from "../assets/svgs/ok-icon.svg"
import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"]
import graph1 from "../assets/svgs/Group 34.svg";
import graph2 from "../assets/svgs/Group 31.svg";

const placeholderEvent = {
    name: "La trakalosa de monterrey",
    sells: "2512",
    assistance: "90%",
    indv: "75%",
    groups: "35%",
    locations: ["A", "B","C","D","E", "F"],
    locationsPopularity:  [0, 10, 5, 2, 20, 30],
    hours: ["8:00","8:15","8:30","8:45","9:00"],
    arrivals:  [0, 10, 5, 2, 20, 30]
    
}

const AdminDashboard = ()=>{

    let event = placeholderEvent;
    const [ showSavedMsj, setSavedMsj ] = useState(false);
    
    let dataPopularity = {
        labels: event.locations,
        datasets: [
          {
            label: "Localidades mas populares",
            backgroundColor: "rgb(0, 0, 255)",
            data: event.locationsPopularity
          },
        ]
      };
    let  dataArrivals= {
        labels: event.hours,
        datasets: [
          {
            label: "Tickets canjeados por hora",
            backgroundColor: "rgb(100, 50, 200)",
            borderColor: "rgb(100, 50, 200)",
            data: event.arrivals
          },
        ]
      };



    return <>
        <Header/>
        

        <div className="ml-2 mt-4 text-sm sm:px-10 md:text-base lg:text-lg">
            <p>Evento: </p>
            <p className="ml-12 mb-12 text-lg lg:text-2xl">{event.name}</p>
        </div>

        <section className="p-2 grid grid-cols-1 justify-center gap-y-2 gap-x-20 grid-flow-row
                            sm:grid-cols-2 sm:px-10 sm:gap-y-4
                            lg:grid-cols-4 lg:gap-x-7">
            <div className="bg-white order-1 w-full h-fit flex justify-center items-center mx-auto sm:w-4/5 lg:w-full sm:col-span-2">
                {/*<img className="w-full" src={graph1} alt="" /> */}
                <Bar data={dataPopularity}/>
            </div>
            <div className="bg-white order-1 w-full h-fit flex justify-center items-center mx-auto sm:w-4/5 lg:w-full sm:col-span-2">
                {/*<img className="w-full" src={graph2} alt="" />*/}
                <Line data={dataArrivals} />
            </div>


            <IndicatorElement title="Tickets vendidos: "
                value={event.sells}
                className="-order-1 lg:order-2"
                color="bg-green-600"/>
            <IndicatorElement title="Porcentaje de asistencia: "
                value={event.assistance}
                className="order-1 sm:-order-1 lg:order-2"
                color="bg-blue-700"/>
            <IndicatorElement title="Porcentaje de grupos de personas: "
                value={event.groups}
                className="order-2"
                color="bg-blue-700"/>
            <IndicatorElement title="Porcentaje de personas individuales: "
                value={event.indv}
                className="order-2"
                color="bg-blue-700"/>

            <button className="rounded-xl w-72 mx-auto order-3 bg-palePurple hover:bg-rolbutton text-white flex flex-row justify-evenly items-center p-5 my-5 sm:col-span-2 lg:col-span-4"
                onClick={ () => { setSavedMsj(true) }}> 
                <img src={SavIcon} alt="save_pdf"/>
                <p>Generar PDF</p>
            </button>
        </section>

        {showSavedMsj && <div className="fixed top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2  w-80 bg-white text-center border-2 border-stone-400 rounded-xl">
            <div className="p-6">PDF</div>
            <div className="border-y-2 border-y-stone-400 flex flex-row justify-center items-center h-28">
                <img src={okIcon} alt="pdf saved" />
                <p className="ml-4">Hecho!</p></div>
            <button className="p-6 cursor-pointer text-indigo-700 hover:text-blue-300" onClick={ () => { setSavedMsj(false) }}>Ok</button>
        </div>}

    </>}

export default AdminDashboard;



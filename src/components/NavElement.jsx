import React from "react";
import { Link } from "react-router-dom";

const NavELement = (props) => {
    return <>
         <Link to={props.link} className="flex flex-row items-center bg-white px-4 py-2 text-sm text-gray-900 hover:bg-gray-100">
        {typeof props.icon === 'string' ? ( //se hace esto para poder trabajar tanto con iconos y con imagenes
          <img src={props.icon} alt={props.alt} className="mx-4 h-7 w-7 object-cover object-center rounded-md" />
        ) : (
          <props.icon className="mx-4 h-7 w-7 " />
        )}
        <p>{props.title}</p>
      </Link>
    </>
}

export default NavELement;
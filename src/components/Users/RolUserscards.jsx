import React, { useState, useCallback }  from 'react';
import RolUsercard from './User/RolUsercard';

const RolUserscards = () => {
    const [userscards, setUserscard] = useState([
        {
            id: 1,
            email: "Example@example.com",
            username: "LuisM_365",
            rol: "Moderador"
        },
        { 
            id: 2,
            email: "Example2@example.com",
            username: "KanyeSouth-6",
            rol: "Validador"
        },
        {
            id: 3,
            email: "Example3@example.com",
            username: "ChepeJose/12",
            rol: "Analista"
        }
    ]);

  return (
    <div>
        <div className="">
            {userscards.map( (usercard) =>{
                return (
                    <RolUsercard 
                     key={usercard.id}
                     email={usercard.email} 
                     username= {usercard.username}
                     rol={usercard.rol}/>
                );
            })}
        </div>
    </div>
  )
}

export default RolUserscards;
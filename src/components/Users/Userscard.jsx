import React, { useState, useCallback }  from 'react';
import Usercard from './User/Usercard';

const Userscard = () => {
    const [userscards, setUserscard] = useState([
        {
            id: 1,
            email: "Example@example.com",
            username: "LuisM_365"
            
        },
        { 
            id: 2,
            email: "Example2@example.com",
            username: "KanyeSouth-6"
        },
        {
            id: 3,
            email: "Example3@example.com",
            username: "ChepeJose/12"
        }
    ]);

  return (
    <div>
        <div className="">
            {userscards.map( (usercard) =>{
                return (
                    <Usercard 
                     key={usercard.id}
                     email={usercard.email} 
                     username= {usercard.username}/>
                );
            })}
        </div>
    </div>
  )
}

export default Userscard;
import React, { useState, useCallback }  from 'react';
import StateUsercard from './User/StateUsercard';

const StateUserscards = () => {
    const [userscards, setUserscard] = useState([
        {
            id: 1,
            email: "Example4@example.com",
            username: "Revoltoso_365"
        }
    ]);

  return (
    <div>
        <div className="">
            {userscards.map( (usercard) =>{
                return (
                    <StateUsercard 
                     key={usercard.id}
                     email={usercard.email} 
                     username= {usercard.username}/>
                );
            })}
        </div>
    </div>
  )
}

export default StateUserscards;
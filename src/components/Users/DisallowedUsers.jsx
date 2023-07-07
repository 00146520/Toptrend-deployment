import React, { useState, useCallback }  from 'react';
import DisallowedUser from './User/DisallowedUser';

const DisallowedUsers = () => {
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
                    <DisallowedUser
                     key={usercard.id}
                     email={usercard.email} 
                     username= {usercard.username}/>
                );
            })}
        </div>
    </div>
  )
}

export default DisallowedUsers;
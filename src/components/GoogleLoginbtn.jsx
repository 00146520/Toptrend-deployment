import React, { useEffect } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';


const GoogleLoginbtn = () => {
  function handleCallbackResponse(response){
    console.log('encoded jwt id token: ' + response.credential);
    let userObject = jwtDecode(response.credential);
    console.log(userObject);
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '463211010397-gm067m5s2l02qi6jn6gr4lmv1nnc757v.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );

    return () => {
      google.accounts.id.disableAutoSelect();
    };
  }, []);
    return (
        <>

          <div id='signInDiv'>
          </div>
        </>
    )
}

export default GoogleLoginbtn
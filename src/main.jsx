import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { BrowserRouter as Router, Route} from 'react-router-dom';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(

    <GoogleOAuthProvider clientId='463211010397-gm067m5s2l02qi6jn6gr4lmv1nnc757v.apps.googleusercontent.com'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </GoogleOAuthProvider>
  
)

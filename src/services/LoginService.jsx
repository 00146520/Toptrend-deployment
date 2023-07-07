import axios from "axios";
const BaseURL = 'https://apievens-v2-production.up.railway.app'

export const signIn = async (identifier, password) => {
    const response = await axios.post(`${BaseURL}/auth/login`, { identifier, password});
    return response;
};

export const Auth = async (token) => {
    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };
    
    const authResponse = await axios.get(`${BaseURL}/auth/login`,config);
    return authResponse.data;
};


export const logout =  () => {
    localStorage.removeItem('token');
};
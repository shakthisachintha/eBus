import client from './client';

const login = (email, password) => client.post('/auth', { email, password });
const forgetpassword = (email) => client.post('/auth/forgetpassword', { email });
const verify = (code) => client.post('/auth/forgetpassword/verify', { code });
const resetpassword = (userInfo) => client.post('/auth/resetpassword/:id', userInfo );

export default {
    login,
    forgetpassword,
    verify,
    resetpassword
}
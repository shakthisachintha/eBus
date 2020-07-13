import client from './client';

const login = (email, password) => client.post('/auth', { email, password });
const forgetpassword = (email) => client.post('/auth/forgetpassword', { email });
const verify = (code,email) => client.post('/auth/forgetpassword/verify', { code, email });
const resetpassword = (id, newpassword, confirmpassword) => client.post('/auth/resetpassword', {id, newpassword, confirmpassword } );

export default {
    login,
    forgetpassword,
    verify,
    resetpassword
}
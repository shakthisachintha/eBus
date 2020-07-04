import { create } from 'apisauce';

const apiClient = create({
    baseURL: 'http://192.168.1.5:3000/api',
    headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjViNTJkMTdiMDhhNDhiOGJmNDlkMiIsImlhdCI6MTU5MzE2MTAwNX0.0TFhlbMgPKPHBvJaBFSPFV8DzZ_8Cgbl-wiqKNg5uGo',
    },
});

export default apiClient;
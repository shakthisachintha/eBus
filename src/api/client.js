import { create } from 'apisauce';
import authStorage from '../auth/storage';

const apiClient = create({
    baseURL: 'http://192.168.56.1:3000/api',
});

apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = await authStorage.getToken();
    if (!authToken) return;
    request.headers['x-auth-token'] = authToken;
})

export default apiClient;
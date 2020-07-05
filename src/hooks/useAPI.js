import { useState } from 'react';

export default useAPI = (apiFunction) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const request = async (...args) => {
        setLoading(true);
        const response = await apiFunction(...args);
        setLoading(false);
        if (!response.ok) return setError(true);
        setError(false);
        setData(response.data);
    }

    return { data, loading, error, request }
}


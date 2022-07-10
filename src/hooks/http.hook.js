import { useCallback, useState } from "react";

const useHttp = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const request = useCallback(async (url, method='GET', body=null, headers = {'Content-Type': 'application/json'}) => {
        setLoading(true);

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();    
            setLoading(false);  
            return data; 
        } catch(e) {
            setLoading(false);
            setError(e.massage);
            throw e;
        }

    }, []);

    const clearError = useCallback(() => {
        setError(null);
    },[]);

    return {loading, error, request, clearError};
}

export default useHttp;
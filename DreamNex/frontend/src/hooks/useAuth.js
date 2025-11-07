import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

const useAuth = () => {
    const { setUser, setIsAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get('/auth/check');
                setUser(response.data.user);
                setIsAuthenticated(true);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [setUser, setIsAuthenticated]);

    const login = async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        setUser(response.data.user);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
        setIsAuthenticated(false);
    };

    return { loading, login, logout };
};

export default useAuth;
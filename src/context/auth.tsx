// Libs
import React, { createContext, useEffect } from 'react';
import api from '../api/api';

interface AuthContextData {
    signed: boolean;
    handleLogin(user: string, password: string): number;
    token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = React.useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        }
    }, []);
    function handleLogin(user: string, password: string) {
        api.post('/usuarios/signin', {
            user: user,
            password: password
        }).then((res) => {
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                setToken(res.data.token);
            }
            else {
                return res.status
            }
        })
        return 500
    }
    return (
        <AuthContext.Provider value={{ signed: Boolean(token), handleLogin, token }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;
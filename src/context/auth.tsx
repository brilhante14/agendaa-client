// Libs
import React, { createContext, useEffect } from 'react';
import api from '../api/api';

interface AuthContextData {
    signed: boolean;
    handleLogin(user: string, password: string): Promise<number>;
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
    async function handleLogin(user: string, password: string) {
        let status = 200;
        await api.post('/usuarios/signin', {
            userName: user,
            password: password
        }).then((res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.result));
            setToken(res.data.token);
            return 200
        }).catch((res) => {
            status = res.status;
        })
        return status
    }
    return (
        <AuthContext.Provider value={{ signed: Boolean(token), handleLogin, token }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;
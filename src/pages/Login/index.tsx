import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../assets/svg/login.svg';

import { Auth } from '../../components/Auth';
import { Button } from '../../components/Button';
import { TextButton } from '../../components/TextButton';
import { TextInput } from '../../components/TextInput';
import AuthContext from '../../context/auth';

import './styles.css';

interface AuthInfos {
    auth: string;
    password: string;
}

export function Login() {
    const [authInfo, setAuthInfo] = React.useState({ auth: '', password: '' } as AuthInfos);
    const [error, setError] = React.useState('');
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    function handleValue(value: string, key: string) {
        setAuthInfo({ ...authInfo, [key]: value });
    }

    async function handleLogin() {
        const status = await context.handleLogin(authInfo.auth, authInfo.password);
        if (status !== 200 && status !== 500) {
            setError('Usuário ou senha inválidos');
            setAuthInfo({ auth: '', password: '' });
        }
    }
    return (
        <Auth title={"Login"} image={Image} formSide={'left'} children={
            <div className='loginContainer'>
                <div className='loginSeparator' />
                {
                    error &&
                    <div className='loginErrorText'>{error}</div>
                }
                <div className='loginSeparator' />
                <TextInput title={"Email ou Usuário:"} placeholder={"Digite seu email ou usuário"} onChange={(e: any) => { handleValue(e.target.value, 'auth') }} value={authInfo.auth} />
                <div className='loginSeparator' />
                <TextInput title={"Senha:"} placeholder={"Digite sua senha"} onChange={(e: any) => { handleValue(e.target.value, 'password') }} value={authInfo.password} isSecure />
                <div style={{ alignSelf: 'flex-end', marginTop: 10 }}>
                    <TextButton onClick={() => { navigate('/forgotPassword') }} title={"Esqueceu a senha?"} />
                </div>
                <div className='loginSeparator' />
                <Button title={"Entrar"} onClick={handleLogin} size={{ width: 400, height: 50 }} />
                <div className='loginRegisterContainer'>
                    Ainda não possui uma conta? <TextButton onClick={() => { navigate('/register') }} title={"Registre-se"} />
                </div>
            </div>
        } />
    );
}
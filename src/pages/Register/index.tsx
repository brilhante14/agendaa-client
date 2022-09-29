import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

import Image from '../../assets/svg/register.svg';

import { Auth } from '../../components/Auth';
import { Button } from '../../components/Button';
import { TextButton } from '../../components/TextButton';
import { TextInput } from '../../components/TextInput';

import './styles.css';

interface AuthInfos {
    name: string;
    username: string;
    email: string;
    password: string;
}

export function Register() {
    const [authInfo, setAuthInfo] = React.useState({ name: '', username: '', email: '', password: '' } as AuthInfos);
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    function handleValue(value: string, key: string) {
        setAuthInfo({ ...authInfo, [key]: value });
    }
    function handleRegister() {
        if (!authInfo.name || !authInfo.username || !authInfo.email || !authInfo.password || !confirmPassword) {
            setError('Preencha todos os campos para continuar');
            return;
        }
        if (authInfo.password !== confirmPassword) {
            setError('As senhas não conferem');
            return;
        }
        api.post('/usuarios/signup', {
            userName: authInfo.username,
            email: authInfo.email,
            password: authInfo.password,
            nome: authInfo.name
        }).then((res) => {
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                navigate('/home');
            }
        }).catch((res) => {
            setError(res.response.data.message);
        })
    }
    return (
        <Auth title={"Registre-se"} image={Image} formSide={'right'} children={
            <div className='registerContainer'>
                <div className='registerSeparator' />
                {
                    error &&
                    <div className='registerErrorText'>{error}</div>
                }
                <div className='registerSeparator' />
                <TextInput title={"Nome completo:"} placeholder={"Digite seu nome completo"} onChange={(e: any) => { handleValue(e.target.value, 'name') }} value={authInfo.name} />
                <div className='registerSeparator' />
                <TextInput title={"Usuário:"} placeholder={"Digite seu usuário"} onChange={(e: any) => { handleValue(e.target.value, 'username') }} value={authInfo.username} />
                <div className='registerSeparator' />
                <TextInput title={"Email:"} placeholder={"Digite seu email"} onChange={(e: any) => { handleValue(e.target.value, 'email') }} value={authInfo.email} />
                <div className='registerSeparator' />
                <TextInput title={"Senha:"} placeholder={"Digite sua senha"} onChange={(e: any) => { handleValue(e.target.value, 'password') }} value={authInfo.password} isSecure />
                <div className='registerSeparator' />
                <TextInput title={"Confirme sua senha:"} placeholder={"Repita sua senha"} onChange={(e: any) => { setConfirmPassword(e.target.value) }} value={confirmPassword} isSecure />
                <div className='registerSeparator' />
                <Button title={"Registrar"} onClick={handleRegister} size={{ width: 400, height: 50 }} />
                <div className='registerLoginContainer'>
                    Já possui uma conta? <TextButton onClick={() => { navigate('/login') }} title={"Login"} />
                </div>
            </div>
        } />
    );
}
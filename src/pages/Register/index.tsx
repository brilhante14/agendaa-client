// Libs
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

// Assets
import Image from '../../assets/svg/register.svg';

// Components
import { Auth } from '../../components/Auth';
import { Button } from '../../components/Button';
import { TextButton } from '../../components/TextButton';
import { TextInput } from '../../components/TextInput';

// Styles
import {
    Container,
    Separator,
    RegisterContainer,
    ErrorText
} from './styles';

interface AuthInfos {
    name: string;
    username: string;
    email: string;
    password: string;
}

// Renderer
export function Register() {
    const [authInfo, setAuthInfo] = React.useState({ name: '', username: '', email: '', password: '' } as AuthInfos);
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    function handleValue(value: string, key: string) {
        setAuthInfo({ ...authInfo, [key]: value });
    }
    function handleRegister() {
        api.post('/usuarios/signup', {
            user: authInfo.username,
            nome: authInfo.name,
            email: authInfo.email,
            password: authInfo.password
        }).then((res) => {
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                // TODO: Enviar para home
                navigate('/turmas');
            }
        }).catch(() => {
            setError('Usuário já existe!');
        })
    }
    return (
        <Auth title={"Registre-se"} image={Image} formSide={'right'} children={
            <Container>
                <Separator />
                {
                    error &&
                    <ErrorText>{error}</ErrorText>
                }
                <Separator />
                <TextInput title={"Nome completo:"} placeholder={"Digite seu nome completo"} onChange={(e: any) => { handleValue(e.target.value, 'name') }} value={authInfo.name} />
                <Separator />
                <TextInput title={"Usuário:"} placeholder={"Digite seu usuário"} onChange={(e: any) => { handleValue(e.target.value, 'username') }} value={authInfo.username} />
                <Separator />
                <TextInput title={"Email:"} placeholder={"Digite seu email"} onChange={(e: any) => { handleValue(e.target.value, 'email') }} value={authInfo.email} />
                <Separator />
                <TextInput title={"Senha:"} placeholder={"Digite sua senha"} onChange={(e: any) => { handleValue(e.target.value, 'password') }} value={authInfo.password} isSecure />
                <Separator />
                <TextInput title={"Confirme sua senha:"} placeholder={"Repita sua senha"} onChange={(e: any) => { setConfirmPassword(e.target.value) }} value={confirmPassword} isSecure />
                <Separator />
                <Button title={"Registrar"} onClick={handleRegister} size={{ width: 400, height: 50 }} />
                <RegisterContainer>
                    Já possui uma conta? <TextButton onClick={() => { navigate('/login') }} title={"Login"} />
                </RegisterContainer>
            </Container>
        } />
    );
}
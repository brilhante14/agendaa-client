// Libs
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    RegisterContainer
} from './styles';

interface AuthInfos {
    name: string;
    username: string;
    email: string;
    password: string;
}

// Renderer
export function Register() {
    const [authInfo, setAuthInfo] = React.useState({} as AuthInfos);
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const navigate = useNavigate();
    function handleValue(value: string, key: string) {
        setAuthInfo({ ...authInfo, [key]: value });
    }
    return (
        <Auth title={"Registre-se"} image={Image} formSide={'right'} children={
            <Container>
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
                <Button title={"Registrar"} onClick={() => { }} size={{ width: 500, height: 50 }} />
                <RegisterContainer>
                    Já possui uma conta? <TextButton onClick={() => { navigate('/login') }} title={"Login"} />
                </RegisterContainer>
            </Container>
        } />
    );
}
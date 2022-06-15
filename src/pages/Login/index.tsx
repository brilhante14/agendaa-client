// Libs
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Assets
import Image from '../../assets/svg/login.svg';

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

// Types
interface AuthInfos {
    auth: string;
    password: string;
}

// Renderer
export function Login() {
    const [authInfo, setAuthInfo] = React.useState({} as AuthInfos);
    const navigate = useNavigate();
    function handleValue(value: string, key: string) {
        setAuthInfo({ ...authInfo, [key]: value });
    }
    return (
        <Auth title={"Login"} image={Image} formSide={'left'} children={
            <Container>
                <Separator />
                <TextInput title={"Email ou Usuário:"} placeholder={"Digite seu email ou usuário"} onChange={(e: any) => { handleValue(e.target.value, 'auth') }} value={authInfo.auth} />
                <Separator />
                <TextInput title={"Senha:"} placeholder={"Digite sua senha"} onChange={(e: any) => { handleValue(e.target.value, 'password') }} value={authInfo.password} isSecure />
                <div style={{ alignSelf: 'flex-end', marginTop: 10 }}>
                    <TextButton onClick={() => { navigate('/forgotPassword') }} title={"Esqueceu a senha?"} />
                </div>
                <Separator />
                <Button title={"Entrar"} onClick={() => { }} size={{ width: 500, height: 50 }} />
                <RegisterContainer>
                    Ainda não possui uma conta? <TextButton onClick={() => { navigate('/register') }} title={"Registre-se"} />
                </RegisterContainer>
            </Container>
        } />
    );
}
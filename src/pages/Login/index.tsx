// Libs
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Assets
import Image from '../../assets/svg/login.svg';

// Components
import { Auth } from '../../components/Auth';
import { Button } from '../../components/Button';
import { TextButton } from '../../components/TextButton';
import { TextInput } from '../../components/TextInput';
import AuthContext from '../../context/auth';

// Styles
import {
    Container,
    Separator,
    RegisterContainer,
    ErrorText
} from './styles';

// Types
interface AuthInfos {
    auth: string;
    password: string;
}

// Renderer
export function Login() {
    const [authInfo, setAuthInfo] = React.useState({ auth: '', password: '' } as AuthInfos);
    const [error, setError] = React.useState('');
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    function handleValue(value: string, key: string) {
        setAuthInfo({ ...authInfo, [key]: value });
    }

    function handleLogin() {
        const status = context.handleLogin(authInfo.auth, authInfo.password);
        if (status !== 200) {
            setError('Usuário ou senha inválidos');
            setAuthInfo({ auth: '', password: '' });
        }
    }
    return (
        <Auth title={"Login"} image={Image} formSide={'left'} children={
            <Container>
                <Separator />
                {
                    error &&
                    <ErrorText>{error}</ErrorText>
                }
                <Separator />
                <TextInput title={"Email ou Usuário:"} placeholder={"Digite seu email ou usuário"} onChange={(e: any) => { handleValue(e.target.value, 'auth') }} value={authInfo.auth} />
                <Separator />
                <TextInput title={"Senha:"} placeholder={"Digite sua senha"} onChange={(e: any) => { handleValue(e.target.value, 'password') }} value={authInfo.password} isSecure />
                <div style={{ alignSelf: 'flex-end', marginTop: 10 }}>
                    <TextButton onClick={() => { navigate('/forgotPassword') }} title={"Esqueceu a senha?"} />
                </div>
                <Separator />
                <Button title={"Entrar"} onClick={handleLogin} size={{ width: 400, height: 50 }} />
                <RegisterContainer>
                    Ainda não possui uma conta? <TextButton onClick={() => { navigate('/register') }} title={"Registre-se"} />
                </RegisterContainer>
            </Container>
        } />
    );
}
// Libs
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Assets
import Image from '../../assets/svg/resetPassword.svg';

// Components
import { Auth } from '../../components/Auth';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

// Styles
import {
    Container,
    Separator,
} from './styles';

// Renderer
export function ForgotPassword() {
    const [authInfo, setAuthInfo] = React.useState('');
    const navigate = useNavigate();
    return (
        <Auth title={"Recuperação de senha"} image={Image} formSide={'left'} children={
            <Container>
                <Separator />
                <TextInput title={"Email ou Usuário:"} placeholder={"Digite seu email ou usuário"} onChange={(e: any) => { setAuthInfo(e.target.value) }} value={authInfo} />
                <Separator />
                <Button title={"Recuperar senha"} onClick={() => { navigate('/login') }} size={{ width: 400, height: 50 }} />
            </Container>
        } />
    );
}
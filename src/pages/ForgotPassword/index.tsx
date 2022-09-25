import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../assets/svg/resetPassword.svg';

import { Auth } from '../../components/Auth';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

import './styles.css';

export function ForgotPassword() {
    const [authInfo, setAuthInfo] = React.useState('');
    const navigate = useNavigate();
    return (
        <Auth title={"Recuperação de senha"} image={Image} formSide={'left'} children={
            <div className='forgotPasswordContainer'>
                <div className='forgotPasswordSeparator' />
                <TextInput title={"Email ou Usuário:"} placeholder={"Digite seu email ou usuário"} onChange={(e: any) => { setAuthInfo(e.target.value) }} value={authInfo} />
                <div className='forgotPasswordSeparator' />
                <Button title={"Recuperar senha"} onClick={() => { navigate('/login') }} size={{ width: 400, height: 50 }} />
            </div>
        } />
    );
}
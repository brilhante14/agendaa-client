import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

import Image from '../../assets/svg/pencilBackground.svg';
// import Image from '../../assets/svg/resetPassword.svg';

import { Auth } from '../../components/Auth';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

import './styles.css';

interface ResetInfos {
    userId: number,
    resetToken: string
}

export function ForgotPassword() {
    const [authInfo, setAuthInfo] = React.useState('');
    const [emailFinded, setEmailFinded] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [resetValues, setResetValues] = React.useState({} as ResetInfos);
    const navigate = useNavigate();
    function handleEmail() {
        api.post('/usuarios/requestReset', {
            email: authInfo
        }).then((res) => {
            if (res.status === 200) {
                setEmailFinded(true);
                setResetValues({ userId: res.data.userId, resetToken: res.data.resetToken });
            }
            else {
                alert("Email não cadastrado no sistema!");
            }
        })
    }
    function resetPassword() {
        if (password !== confirmPassword) {
            alert("As senhas não conferem!");
            return;
        }
        api.post('/usuarios/resetPassword', {
            ...resetValues,
            newPassword: password
        }).then((res) => {
            if (res.status === 200) {
                alert("Senha alterada");
                navigate('/login');
            }
            else {
                alert("Email não cadastrado no sistema!");
            }
        })
    }
    return (
        <Auth title={"Recuperação de senha"} image={Image} formSide={'left'} children={
            !emailFinded ?
                <div className='forgotPasswordContainer'>
                    <div className='forgotPasswordSeparator' />
                    <TextInput title={"Email ou Usuário:"} placeholder={"Digite seu email ou usuário"} onChange={(e: any) => { setAuthInfo(e.target.value) }} value={authInfo} />
                    <div className='forgotPasswordSeparator' />
                    <Button title={"Recuperar senha"} onClick={handleEmail} size={{ width: 400, height: 50 }} />
                </div>
                :
                <div className='forgotPasswordContainer'>
                    <div className='forgotPasswordSeparator' />
                    <TextInput title={"Nova senha:"} placeholder={"Nova senha"} onChange={(e: any) => { setPassword(e.target.value) }} value={password} isSecure />
                    <div className='forgotPasswordSeparator' />
                    <TextInput title={"Confirme a nova senha:"} placeholder={"Confirmação"} onChange={(e: any) => { setConfirmPassword(e.target.value) }} value={confirmPassword} isSecure />
                    <div className='forgotPasswordSeparator' />
                    <Button title={"Alterar senha"} onClick={resetPassword} size={{ width: 400, height: 50 }} />
                </div>
        } />
    );
}
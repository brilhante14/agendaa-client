// Styles
import {
    Container,
    Separator,
    ButtonContainer
} from './styles';
import Modal from "..";
import { TextInput } from '../../TextInput';
import { Button } from '../../Button';
import React from 'react';
import api from '../../../api/api';

interface props {
    isOpen: boolean;
    id?: string;
}

// Renderer
export function ModalMaterial({ isOpen, id }: props) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");
    function handleCreate() {
        const storage = localStorage.getItem('user');
        if (storage) {
            const user = JSON.parse(storage);
            api.post(`/materiais/${id}`, {
                nome: name,
                link: link,
                userId: user._id
            })
        }
    }
    return (
        <Modal isOpen={isOpen}>
            <Container>
                <TextInput onChange={(e: any) => { setName(e.target.value) }} placeholder={"Ex.: Anotações"} title={"Nome do material"} value={name} />
                <Separator />
                <TextInput onChange={(e: any) => { setLink(e.target.value) }} placeholder={"Ex.: google.com"} title={"Link do material"} value={link} />
                <Separator />
                <Separator />
                <ButtonContainer>
                    <Button onClick={handleCreate} size={{ width: 165, height: 39 }} title={"Cadastrar material"} />
                </ButtonContainer>
            </Container>
        </Modal>
    );
}
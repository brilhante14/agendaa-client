// Libs
import React from 'react';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Styles
import {
    Container,
    SliderContainer,
    Title,
    Separator,
    DaysContainer,
    Day,
    Days,
    DateContainer,
    DateSelector,
    ButtonContainer
} from './styles';
import Modal from "..";
import { TextInput } from '../../TextInput';
import { Button } from '../../Button';

interface props {
    isOpen: boolean;
}

// Renderer
export function Material({ isOpen }: props) {
    return (
        <Modal isOpen={isOpen}>
            <Container>
                <TextInput onChange={() => { }} placeholder={"Ex.: Anotações"} title={"Nome do material"} />
                <Separator />
                <TextInput onChange={() => { }} placeholder={"Ex.: google.com"} title={"Link do material"} />
                <Separator />
                <Separator />
                <ButtonContainer>
                    <Button onClick={() => { }} size={{ width: 165, height: 39 }} title={"Cadastrar material"} />
                </ButtonContainer>
            </Container>
        </Modal>
    );
}
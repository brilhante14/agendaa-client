// Libs
import React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Styles
import {
    Container,
    Separator,
    DateContainer,
    DateSelector,
    ButtonContainer
} from './styles';
import Modal from "..";
import { TextInput } from '../../TextInput';
import { Button } from '../../Button';

interface props {
    isOpen: boolean;
    handleOpen: (status: boolean) => void;
}

// Renderer
export function Activities({ isOpen, handleOpen }: props) {
    const [endDate, setEndDate] = React.useState<Date | null>(null);
    return (
        <Modal isOpen={isOpen} handleOpen={handleOpen}>
            <Container>
                <TextInput onChange={() => { }} placeholder={"Ex.: Lista de exercícios"} title={"Nome da atividade"} />
                <Separator />
                <TextInput onChange={() => { }} placeholder={"Ex.: Revisão para prova 01"} title={"Descrição"} />
                <Separator />
                <Separator />
                <DateContainer>
                    <DateSelector>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Prazo"
                                value={endDate}
                                onChange={(newValue) => {
                                    setEndDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} sx={{
                                    width: 200
                                }} />}
                            />
                        </LocalizationProvider>
                    </DateSelector>
                </DateContainer>
                <Separator />
                <ButtonContainer>
                    <Button onClick={() => { }} size={{ width: 138, height: 39 }} title={"Criar atividade"} />
                </ButtonContainer>
            </Container>
        </Modal>
    );
}
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

const allDays = [
    {
        initial: 'S',
        name: 'Segunda',
        active: false
    },
    {
        initial: 'T',
        name: 'Terça',
        active: false
    },
    {
        initial: 'Q',
        name: 'Quarta',
        active: false
    },
    {
        initial: 'Q',
        name: 'Quinta',
        active: false
    },
    {
        initial: 'S',
        name: 'Sexta',
        active: false
    },
    {
        initial: 'S',
        name: 'Sábado',
        active: false
    },
    {
        initial: 'D',
        name: 'Domingo',
        active: false
    }]
// Renderer
export function ClassModal({ isOpen }: props) {
    const [days, setDays] = React.useState(allDays);
    const [startDate, setStartDate] = React.useState<Date | null>(null);
    const [endDate, setEndDate] = React.useState<Date | null>(null);
    return (
        <Modal isOpen={isOpen}>
            <Container>
                <TextInput onChange={() => { }} placeholder={"Ex.: Matématica discreta"} title={"Nome da turma:"} />
                <Separator />
                <SliderContainer>
                    <Title>
                        Faltas Permitidas
                    </Title>
                    <Slider
                        size="small"
                        defaultValue={5}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        min={0}
                        max={20}
                        sx={{
                            color: '#5616AA'
                        }}
                    />
                </SliderContainer>
                <DaysContainer>
                    <Title>
                        Dias de aula
                    </Title>
                    <Separator />
                    <Days>
                        {
                            days.map((day, index) => {
                                return (
                                    <Day key={index} selected={day.active} onClick={
                                        () => {
                                            const newDays = [...days];
                                            newDays[index].active = !newDays[index].active;
                                            setDays(newDays);

                                        }
                                    }>
                                        {day.initial}
                                    </Day>
                                )
                            }
                            )
                        }
                    </Days>
                </DaysContainer>
                <Separator />
                <DateContainer>
                    <DateSelector>
                        <Separator />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Início da turma"
                                value={startDate}
                                onChange={(newValue) => {
                                    setStartDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} sx={{
                                    width: 200,
                                }}
                                />}
                            />
                        </LocalizationProvider>
                    </DateSelector>
                    <DateSelector>
                        <Separator />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Fim da turma"
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
                    <Button onClick={() => { }} size={{ width: 117, height: 39 }} title={"Criar turma"} />
                </ButtonContainer>
            </Container>
        </Modal>
    );
}
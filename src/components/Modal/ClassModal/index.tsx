// Libs
import React from 'react';
import Slider from '@mui/material/Slider';
// Styles
import {
    Container,
    SliderContainer,
    Title,
    Separator,
    ButtonContainer,
} from './styles';
import Modal from "..";
import { TextInput } from '../../TextInput';
import { Button } from '../../Button';
import { DateComponent } from '../../DateComponent';
import { allDays } from '../../../utils/date';
import api from '../../../api/api';

interface props {
    isOpen: boolean;
    handleOpen: (status: boolean) => void;
}

// Renderer
export function ClassModal({ isOpen, handleOpen }: props) {
    const [days, setDays] = React.useState(allDays);
    const [startDate, setStartDate] = React.useState<Date | null>(null);
    const [endDate, setEndDate] = React.useState<Date | null>(null);
    const [nome, setNome] = React.useState('');
    const [faltas, setFaltas] = React.useState<any>(0);
    const storage = localStorage.getItem('user');
    const user = storage ? JSON.parse(storage) : {};
    function handleCreate() {
        const daysApi = days.map(day => {
            return day.active
        })
        api.post('/turmas', {
            nome: nome,
            professor: user._id,
            participantes: [],
            comments: [],
            cronograma: daysApi,
            inicio: startDate,
            fim: endDate,
            faltasPermitidas: faltas
        })
        alert('Turma criada com sucesso!')
        handleOpen(false)
        window.location.reload()
    }
    const handleChange = (event: Event, newValue: number | number[]) => {
        setFaltas(newValue as number[]);
    };
    return (
        <Modal handleOpen={handleOpen}>
            <Container>
                <TextInput onChange={(e: any) => { setNome(e.target.value) }} placeholder={"Ex.: Matématica discreta"} title={"Nome da turma:"} />
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
                        value={faltas}
                        onChange={handleChange}
                    />
                </SliderContainer>
                <DateComponent days={days} startDate={startDate} endDate={endDate} handleDays={setDays} handleStartDate={setStartDate} handleEndDate={setEndDate} />
                <Separator />
                <ButtonContainer>
                    <Button onClick={handleCreate} size={{ width: 117, height: 39 }} title={"Criar turma"} />
                </ButtonContainer>
            </Container>
        </Modal>
    );
}
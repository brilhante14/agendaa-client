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

interface props {
    isOpen: boolean;
}

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
                <DateComponent days={days} startDate={startDate} endDate={endDate} handleDays={setDays} handleStartDate={setStartDate} handleEndDate={setEndDate} />
                <Separator />
                <ButtonContainer>
                    <Button onClick={() => { }} size={{ width: 117, height: 39 }} title={"Criar turma"} />
                </ButtonContainer>
            </Container>
        </Modal>
    );
}
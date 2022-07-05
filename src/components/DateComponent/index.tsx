// Libs
import React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Styles
import {
    Title,
    Separator,
    DaysContainer,
    Day,
    Days,
    DateContainer,
    DateSelector,
} from './styles';
import { DaysProps } from '../../utils/date';


interface Props {
    days: DaysProps;
    startDate: Date | null;
    endDate: Date | null;
    handleDays: React.Dispatch<React.SetStateAction<{
        initial: string;
        name: string;
        active: boolean;
    }[]>>
    handleStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
    handleEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

// Renderer
export function DateComponent({ days, startDate, endDate, handleDays, handleStartDate, handleEndDate }: Props) {
    return (
        <>
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
                                        console.log("a", newDays)
                                        newDays[index].active = !newDays[index].active;
                                        console.log("d", newDays)
                                        handleDays(newDays);
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
                                handleStartDate(newValue)
                            }}
                            inputFormat="dd/MM/yyyy"
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
                                handleEndDate(newValue);
                            }}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => <TextField {...params} sx={{
                                width: 200
                            }} />}
                        />
                    </LocalizationProvider>
                </DateSelector>
            </DateContainer>
        </>
    );
}
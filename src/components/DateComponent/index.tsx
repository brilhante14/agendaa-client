// Libs
import React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Styles
import { DaysProps } from '../../utils/date';
import './styles.css';

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

export function DateComponent({ days, startDate, endDate, handleDays, handleStartDate, handleEndDate }: Props) {
    return (
        <>
            <div className="dateComponentDaysContainer">
                <p className='dateComponentTitle'>
                    Dias de aula
                </p>
                <div className='dateComponentSeparator' />
                <div className='dateComponentDays'>
                    {
                        days.map((day, index) => {
                            return (
                            <button key={index} className={`dateComponentDay ${day.active ? "dateComponentDayActive" : ""}`} onClick={
                                    () => {
                                        const newDays = [...days];
                                        newDays[index].active = !newDays[index].active;
                                        handleDays(newDays);
                                    }
                                }>
                                    {day.initial}
                                </button>
                            )
                        }
                        )
                    }
                </div>
            </div>
            <div className='dateComponentSeparator' />
            <div className='dateComponentDateContainer'>
                <div className='dateComponentDDateSelector'>
                    <div className='dateComponentSeparator' />
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
                </div>
                <div className='dateComponentDDateSelector'>
                    <div className='dateComponentSeparator' />
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
                </div>
            </div>
        </>
    );
}
// Libs
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Styles
import './styles.css';
import Modal from "..";
import { TextInput } from '../../TextInput';
import { Button } from '../../Button';
import api from '../../../api/api';
import { useParams } from 'react-router-dom';

interface props {
    isOpen: boolean;
    handleOpen: (status: boolean) => void;
    isEdit?: boolean;
    activityID?: string;
}

// Renderer
export function Activities({ isOpen, handleOpen, isEdit, activityID }: props) {
    const [endDate, setEndDate] = React.useState<Date | null>(null);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const storage = localStorage.getItem('user');
    const user = storage ? JSON.parse(storage) : {};
    const { id } = useParams();
    function handleCreateActivity() {
        api.post(`/atividades/${id}`, {
            nome: name,
            descricao: description,
            prazo: endDate,
            creator: user._id
        })
        alert('Atividade criada com sucesso!');
        window.location.assign(`http://localhost:3000/home/${id}`);
        handleOpen(false);
    }
    function handleEditActivity() {
        api.patch(`/atividades/${activityID}`, {
            nome: name,
            descricao: description,
            prazo: endDate,
        })
        alert('Atividade editada com sucesso!');
        window.location.assign(`http://localhost:3000/home/${id}`);
        handleOpen(false);
    }
    function handleDeleteActivity() {
        if (window.confirm('Tem certeza que deseja excluir esta atividade?')) {
            api.delete(`/atividades/${activityID}`)
            alert('Atividade deletada com sucesso!');
            window.location.assign(`http://localhost:3000/home/${id}`);
            handleOpen(false);
        }
    }
    useEffect(() => {
        if (isEdit) {
            api.get(`/atividades/getById/${activityID}`).then(res => {
                setName(res.data.nome)
                setDescription(res.data.descricao)
                setEndDate(res.data.prazo)
            })
        }
    }, [activityID, isEdit])
    return (
        <Modal handleOpen={handleOpen}>
            <div className='activitiesContainer'>
                <TextInput onChange={(e: any) => { setName(e.target.value) }} placeholder={"Ex.: Lista de exercícios"} title={"Nome da atividade"} value={name} />
                <div className='activitiesSeparator' />
                <TextInput onChange={(e: any) => { setDescription(e.target.value) }} placeholder={"Ex.: Revisão para prova 01"} title={"Descrição"} value={description} />
                <div className='activitiesSeparator' />
                <div className='activitiesSeparator' />
                <div className='activitiesDateContainer'>
                    <div className='activitiesDateSelector'>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Prazo"
                                value={endDate}
                                onChange={(newValue: any) => {
                                    setEndDate(newValue);
                                }}
                                renderInput={(params: any) => <TextField {...params} sx={{
                                    width: 200
                                }} />}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className='activitiesSeparator' />
                <div className='activitiesButtonContainer'>
                    {
                        user.role === "professor" && <Button onClick={handleDeleteActivity} size={{ width: 150, height: 39 }} title={"Remover Atividade"} backgroundColor={"#FB6262"} />
                    }
                    <div style={{ width: 20 }} />
                    <Button onClick={isEdit ? handleEditActivity : handleCreateActivity} size={{ width: 138, height: 39 }} title={isEdit ? "Editar atividade" : "Criar atividade"} />
                </div>
            </div>
        </Modal>
    );
}
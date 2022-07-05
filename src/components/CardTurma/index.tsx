import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import "./index.css";
interface Props {
    turma: {
        _id: string,
        professor: string,
        nome: string,
        participantes: Array<string>,
    }
}

const CardTurma: React.FC<Props> = ({ turma }) => {
    const [professor, setProfessor] = useState("");
    const navigate = useNavigate();
    async function fetchProfessor(id: string) {
        const response = api(`/usuarios/getById/${id}`)
        return response;
    }
    function handleClass() {
        const storage = localStorage.getItem("user");
        if (storage) {
            const user = JSON.parse(storage)
            api.post(`/turmas/${turma._id}/joinClass`, {
                userId: String(user._id)
            }).then((res) => {
                navigate('/home/')
            })
        }
    }
    useEffect(() => {
        fetchProfessor(turma.professor)
            .then((response) => { setProfessor(response.data.nome); })
    }, [turma.professor])
    return (
        <div className="turma_card" key={turma._id}>
            <div className="turma_cardHeader">
                <span className="turma_profilePic" />
                <span
                    title={professor}
                >{professor}</span>
            </div>
            <p title={turma.nome}>{turma.nome}</p>
            <hr color="#DBCCCC" />
            <div className="turmas_cardFooter">
                <span>{`${turma.participantes.length} Participantes`}</span>
                <button className="turmas_cardButton" onClick={handleClass}>Entrar</button>
            </div>
        </div >
    )
}

export default CardTurma;
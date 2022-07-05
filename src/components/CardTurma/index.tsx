import React, { useState, useEffect } from 'react';
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
    const [photo, setPhoto] = useState("");

    async function fetchProfessor(id: string) {
        const response = api(`/usuarios/getById/${id}`)
        return response;
    }

    let user: any;
    const storage = localStorage.getItem("user");
    if (storage) {
        user = JSON.parse(storage)
    }

    function handleClass() {
        api.post(`/turmas/${turma._id}/joinClass`, {
            userId: String(user._id)
        }).then((res) => {
            window.location.href = 'home'
        })
    }
    useEffect(() => {
        fetchProfessor(turma.professor)
            .then((response) => { setProfessor(response.data.nome); setPhoto(response.data.photo) })
    }, [turma.professor])

    const isInClass = turma.participantes.includes(user._id)

    return (
        <div className="turma_card" key={turma._id}>
            <div className="turma_cardHeader">
                <img src={photo} alt={"Foto de perfil"} style={{ width: 24, height: 24, borderRadius: '50%' }} />
                <span
                    title={professor}
                >{professor}</span>
            </div>
            <p title={turma.nome}>{turma.nome}</p>
            <hr color="#DBCCCC" />
            <div className="turmas_cardFooter">
                <span>{`${turma.participantes.length} Participantes`}</span>
                <button className="turmas_cardButton" disabled={isInClass} onClick={handleClass}>
                    {isInClass ?
                        "Membro"
                        :
                        "Entrar"
                    }
                </button>
            </div>
        </div >
    )
}

export default CardTurma;
import React, { useEffect } from "react";
import Atividade from "../Atividade";
import { CloseActivity } from "../Modal/CloseActivity";

import Image from '../../assets/new_topic_black.png'
import SemAtividade from '../../assets/sem_atividade.png';

import "./index.css";
import IconButton from "../IconButton";
import { Activities } from "../Modal/Activities";
import api from "../../api/api";
import { useParams } from "react-router-dom";

interface Atividade {
    nome: string,
    prazo: Date,
    nota?: string,
    _id: string,
}
interface Props {
    atividades?: Array<Atividade>;
    data?: Date,
}

const Atividades: React.FC<Props> = () => {
    const [isModalOpen, setModal] = React.useState(false);
    const [createActivity, setCreateActivity] = React.useState(false);
    const [activities, setActivities] = React.useState([] as any);
    const [isEdit, setEdit] = React.useState(false);
    const storage = localStorage.getItem("user");
    const [activityID, setActivityID] = React.useState("");
    const user = storage ? JSON.parse(storage) : {};
    const { id } = useParams();
    function handleModal(id: string) {
        if (user.role === "professor") {
            setEdit(true)
            setActivityID(id)
        }
        else {
            setModal(true)
        }
    }
    useEffect(() => {
        api.get(`/atividades/${id}`).then((res) => {
            setActivities(res.data)
        })
    }, [id])
    return (
        <div className="atividades_Container">
            <div className="atividades_headerContainer">
                <h1 className="atividades_day">3 de Maio</h1>
            </div>
            <div className="atividades_carrosselContainer">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 style={{ marginBottom: 10 }}>Atividades do Dia</h2>
                    {
                        user.role === 'professor' &&
                        <IconButton
                            icon={Image}
                            onClick={() => setCreateActivity(true)}
                            showTitle={true}
                            title={"Criar"}
                            variant="secondary"
                        />
                    }
                </div>
                {activities.length > 0 ?
                    activities.map(
                        (atividade: Atividade) => {
                            return <Atividade nome={atividade.nome}
                                prazo={atividade.prazo}
                                nota={!!atividade.nota}
                                onClick={() => handleModal(atividade._id)} />
                        })
                    :
                    <div className="atividades__empty">
                        <img src={SemAtividade} alt="" />
                        <h3>Não existem atividades neste dia</h3>
                    </div>}
            </div>
            {
                isModalOpen && <CloseActivity isOpen={isModalOpen} handleOpen={setModal} />
            }
            {
                isEdit && <Activities isOpen={isEdit} handleOpen={setEdit} isEdit activityID={activityID} />
            }
            {
                createActivity && <Activities isOpen={createActivity} handleOpen={setCreateActivity} />
            }
        </div>
    );
}

export default Atividades;
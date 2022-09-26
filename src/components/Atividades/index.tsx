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

interface AtividadeProps {
    nome: string,
    prazo: Date,
    nota?: string,
    _id: string,
}
interface Props {
    atividades?: Array<AtividadeProps>;
    data?: Date,
}

const Atividades: React.FC<Props> = () => {
    const selectedDay = new Date();
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
                <h1 className="atividades_day">{`${selectedDay.toLocaleDateString()}`}</h1>
            </div>
            <div className="atividades_carrosselContainer">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 style={{ marginBottom: 10, fontSize: '1rem' }}>Atividades do Dia</h2>
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
                        (atividade: AtividadeProps) => {
                            return <Atividade nome={atividade.nome}
                                prazo={atividade.prazo}
                                nota={!!atividade.nota}
                                onClick={() => handleModal(atividade._id)} />
                        })
                    :
                    <div className="atividades__empty">
                        <img width='210px' height='210px' src={SemAtividade} alt="" />
                        <h3>Sem atividades cadastradas</h3>
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
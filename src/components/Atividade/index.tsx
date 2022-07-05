import React, { useEffect, useState } from "react";
import check_circle from "../../assets/svg/check_circle.svg"
import edit from "../../assets/svg/edit.svg";
import styles from "./Atividade.module.css";
import IconButton from "../IconButton";
import { handleData } from "../../utils/formatDate";

interface Props {
    nome: string;
    prazo: Date;
    nota?: string;
    onClick: () => void;
}

const Atividade: React.FC<Props> = ({ nome, prazo, nota, onClick }) => {
    const [isProfessor, setIsProfessor] = React.useState(false);

    useEffect(() => {
        const storage = localStorage.getItem("user");
        if (storage) {
            const user = JSON.parse(storage);
            setIsProfessor(user.role === "professor");
        }
    }, [])
    return (<div className={styles.atividade}>
        <h3>{nome}</h3>
        <div className={styles.atividadeFooter}>
            <div>{`Prazo: ${handleData(prazo)}`}</div>
            <IconButton
                title={isProfessor ? "Editar Atividade" : nota ?? "Marcar como Concluída"}
                icon={isProfessor ? edit : check_circle}
                showTitle
                variant={(nota && !isProfessor) ? "success" : "primary"}
                width={250}
                onClick={onClick}
            />
        </div>
    </div>)
}

export default Atividade;
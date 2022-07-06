import React, { useEffect } from "react";
import api from "../../api/api";
import draft from "../../assets/file.png";
import styles from "./Material.module.css";

interface Props {
  nome: string;
  link: string;
  autor: string;
  deleteItem?: () => void;
}

const Material: React.FC<Props> = ({ nome, link, autor, deleteItem }) => {
  const [name, setName] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  function handleName(id: string) {
    api.get(`/usuarios/getById/${id}`).then((res) => {
      setName(res.data.nome);
      setPhoto(res.data.photo);
    });
  }
  useEffect(() => {
    handleName(autor);
  });
  return (
    <div className={styles.material}>
      {deleteItem && (
        <button className={styles.delete} onClick={deleteItem}>
          X
        </button>
      )}
      <a
        href={link}
        className={styles.link}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={draft} alt="" style={{ width: 42, height: 42 }} />
        <span className={styles.name}>{nome}</span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-start",
            marginTop: 10,
          }}
        >
          <img
            src={photo}
            alt=""
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              marginRight: 5,
            }}
          />
          {/* Analisar overflow */}
          <span className={styles.author}>{name.substring(0, 10) + "..."}</span>
        </div>
      </a>
    </div>
  );
};

export default Material;

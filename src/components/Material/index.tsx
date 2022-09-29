import React, { useEffect } from "react";
import api from "../../api/api";
import draft from "../../assets/file.png";
import styles from "./Material.module.css";

interface Props {
  nome: string;
  link: string;
  authorId: number;
  deleteItem?: () => void;
}

const Material: React.FC<Props> = ({ nome, link, authorId, deleteItem }) => {
  const [name, setName] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  function handleName(id: number) {
  
    api.get(`/usuarios/${id}`).then((res) => {
 

      const user = res.data[0]
      setName(user.name);
      setPhoto(user.photo);
    })
  }
  useEffect(() => {
    handleName(authorId);
  }, [authorId]);
  return (
    <div className={styles.material}>
      {deleteItem && (
        <button className={styles.delete} onClick={deleteItem}>
          X
        </button>
      )}
      <a
        target="_blank" 
        rel="noopener noreferrer"
        href={link}
        className={styles.link}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={draft} alt="" width='25px' height='25px' />
        <span className={styles.name}>{nome}</span>
        <div className={styles.authorContainer}>
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
          <span title={name} className={styles.author}>{name}</span>
        </div>
      </a>
    </div>
  );
};

export default Material;

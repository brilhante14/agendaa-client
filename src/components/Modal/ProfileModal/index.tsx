import React from "react";
import styles from "./profileModal.module.css";
import edit_icon from "../../../assets/svg/edit.svg";
import Modal from "..";
import { TextInput } from "../../TextInput";
import { Button } from "../../Button";
import api from "../../../api/api";

interface props {
  isOpen: boolean;
  handleOpen: (status: boolean) => void;
}
/**
 * Modal contendo o formulário de edição de perfil
 *
 * @component
 * @param {boolean} isOpen controla se o modal deve estar aberto
 * @todo realizar o envio das infromações
 * @todo receber objeto contendo perfil do usuário
 */
const ProfileModal = ({ handleOpen }: props) => {
  const storage = localStorage.getItem("user");
  const user = storage ? JSON.parse(storage) : {};
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [username, setUsername] = React.useState(user.username);

  function handleEdit() {
    const body = {
      nome: name,
      role: user.role,
      email: email,
      user: username,
    }
    api.patch(`/usuarios/${user.userId}`,body );
    handleOpen(false);
    alert("Perfil editado com sucesso!");
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        nome: name,
        email: email,
        user: username,
      })
    );
    /*     window.location.reload(); */
  }

  function handleDelete() {
    if (window.confirm("Tem certeza que deseja deletar sua conta?")) {
      api.delete(`/usuarios/deleteUser/${user.userId}`);
      handleOpen(false);
      alert("Perfil deletado com sucesso!");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }
  }

  return (
    <Modal handleOpen={handleOpen}>
      <form>
        <div className={styles.inputs}>
          <label className={styles.imgLabel} htmlFor="profile-img">
            <img
              className={styles.profileImg}
              src={user.photo}
              alt="Imagem de Perfil"
            />
          </label>

          <div className={styles.texts}>
            <TextInput
              title="Nome"
              placeholder="Nome de usuário"
              onChange={(e: any) => {
                setName(e.target.value);
              }}
              value={name}
            />

            <TextInput
              title="Usuário"
              placeholder="Usuário"
              onChange={(e: any) => {
                setUsername(e.target.value);
              }}
              value={username}
            />

            <TextInput
              title="Email"
              placeholder="mail@example.com"
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <Button
              onClick={() => {}}
              size={{ width: "100%", height: 48 }}
              title={"Redefinir senha"}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            title="Deletar Perfil"
            onClick={handleDelete}
            size={{
              width: 260,
              height: 48,
            }}
            backgroundColor="#f44336"
            textColor="#FFF"
          />
          <Button
            isDisabled={!name || !username || !email}
            title="Confirmar Alterações"
            onClick={handleEdit}
            size={{
              width: 260,
              height: 48,
            }}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ProfileModal;

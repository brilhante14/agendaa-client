import React from "react";
import styles from "./profileModal.module.css";
import edit_icon from "../../../assets/svg/edit.svg";
import Modal from "..";
import { TextInput } from "../../TextInput";
import { Button } from "../../Button";

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
const ProfileModal = ({ isOpen, handleOpen }: props) => {
  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen}>
      <form>
        <div className={styles.inputs}>
          <label className={styles.imgLabel} htmlFor="profile-img">
            <img
              className={styles.profileImg}
              src="https://via.placeholder.com/100"
              alt="Imagem de Perfil"
            />
            <img className={styles.editIcon} src={edit_icon} alt="Editar" />
          </label>
          <input type="file" name="profile-img" id="profile-img"></input>

          <div className={styles.texts}>
            <TextInput
              title="Nome"
              placeholder="Fulano de Tal"
              onChange={() => ""}
            />

            <TextInput
              title="Usuário"
              placeholder="fulano123"
              onChange={() => ""}
            />

            <TextInput
              title="Endereço Eletrônico"
              placeholder="mail@example.com"
              onChange={() => ""}
            />

            <TextInput
              title="Senha"
              placeholder="********"
              onChange={() => ""}
            />

            <TextInput
              title="Confirmar Senha"
              placeholder="********"
              onChange={() => ""}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            title="Deletar Perfil"
            onClick={() => alert("Perfil deletado.")}
            size={{
              width: 180,
              height: 48,
            }}
          />
          <Button
            title="Confirmar Alterações"
            onClick={() => alert("Perfil alterado")}
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

import React from "react";
import { createPortal } from "react-dom";
import styles from "./profileModal.module.css";
import edit_icon from "../../assets/svg/edit.svg";

interface props {
  isOpen: boolean;
}
/**
 * Modal contendo o formulário de edição de perfil
 *
 * @component
 * @param {boolean} isOpen controla se o modal deve estar aberto
 * @todo realizar o envio das infromações
 * @todo receber objeto contendo perfil do usuário
 */
const ProfileModal = ({ isOpen }: props) => {
  const modal = (
    <dialog className={styles.dialog} open={isOpen}>
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
            <div className={styles.textInput}>
              <label htmlFor="name">Nome:</label>
              <input id="name" name="name" type="text" />
            </div>

            <div className={styles.textInput}>
              <label htmlFor="username">Usuário:</label>
              <input id="username" name="username" type="text" />
            </div>

            <div className={styles.textInput}>
              <label htmlFor="mail">Endereço Eletrônico:</label>
              <input id="mail" name="mail" type="text" />
            </div>

            <div className={styles.textInput}>
              <label htmlFor="password">Senha:</label>
              <input id="password" name="password" type="text" />
            </div>

            <div className={styles.textInput}>
              <label htmlFor="confirmPassword">Confirmar Senha:</label>
              <input id="confirmPassword" name="confirmPassword" type="text" />
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={`${styles.button} | ${styles.warning}`}>
            Deletar Perfil
          </button>
          <button className={`${styles.button} | ${styles.main}`} type="submit">
            Confirmar Alterações
          </button>
        </div>
      </form>
    </dialog>
  );

  return createPortal(modal, document.body);
};

export default ProfileModal;

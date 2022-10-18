import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../Modal/ProfileModal/index";
import styles from "./header.module.css";

interface IUserProfile {
  img: string;
  name: string;
}

const Header = (props: { profile?: IUserProfile }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  let navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div onClick={() => {navigate('/home/')}}><h1 className={styles.headerTitle}>AGENDAA</h1></div>
      {props.profile && (
        <div
          className={styles.profileMenu}
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          <button type="button" className={styles.profileButton}>
            <img className={styles.profileImg} src={props.profile.img} alt="" />
            <h2 style={{ color: 'white', fontSize: 14 }}>
              {props.profile.name}
              <span role="img" aria-label="toggle menu">
                {isMenuOpen ? " ▲" : " ▼"}
              </span>
            </h2>
          </button>
          {isMenuOpen && (<menu className={styles.menu}>
            <li className={styles.menu_item}>
              <button
                tabIndex={0}
                onClick={() => setModalOpen(true)}
                className={styles.menu_button}
              >
                Editar perfil
              </button>
            </li>
            <li className={styles.menu_item}>
              <button
                tabIndex={0}
                className={`${styles.menu_button} ${styles.sair}`}
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.reload();
                }}
              >
                Sair do AGENDAA
              </button>
            </li>
          </menu>)}
        </div>
      )}
      {
        isModalOpen && <ProfileModal isOpen={isModalOpen} handleOpen={setModalOpen} />
      }
    </header>
  );
};

export default Header;

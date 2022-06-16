import { useState } from "react";
import ProfileModal from "../ProfileModal";
import styles from "./header.module.css";

interface userProfile {
  img: string;
  name: string;
}

/**
 * Componente de cabeçalho para todas as páginas
 *
 * @component
 * @param {Object} profile Objeto contendo as propriedades do usuário logado
 * @todo aceitar um objeto de perfil mais completo
 * @todo implementar o "Actions Menu Button" conforme ARIA APG
 */
const Header = (props: { profile: userProfile }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>AGENDAA</h1>
      <div
        className={styles.profileMenu}
        onMouseEnter={() => setMenuOpen(true)}
        onFocus={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
        onBlur={() => setMenuOpen(false)}
      >
        <button type="button" className={styles.profileButton}>
          <img className={styles.profileImg} src={props.profile.img} alt="" />
          <h2>
            {props.profile.name}
            <span role="img" aria-label="toggle menu">
              {isMenuOpen ? " ▲" : " ▼"}
            </span>
          </h2>
        </button>
        <menu className={`${styles.menu}  ${!isMenuOpen && styles.invisible}`}>
          {/**
           * @todo Implementar funções para navegar de volta ao login e acessar modal de edição de perfil
           */}
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
            >
              Sair do AGENDAA
            </button>
          </li>
        </menu>
      </div>
      <ProfileModal isOpen={isModalOpen} />
    </header>
  );
};

export default Header;

import React from "react";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.generalContainer}>
      <div className={styles.leftContainer}>Participante: Alisson</div>
      <div className={styles.middleContainer}>Rodada 1</div>
      <div className={styles.rightContainer}>
        <div>Tempo: 10:00</div>
        <div>Pontuação: 100</div>
      </div>
    </div>
  );
};

export default Header;

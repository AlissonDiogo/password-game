"use client";
import React, { useContext } from "react";
import styles from "./header.module.css";
import { GameContext } from "@/app/context/gameContext";

const Header = () => {
  const { values } = useContext(GameContext);
  const { participantName, points, round } = values;
  return (
    <div className={styles.generalContainer}>
      <div className={styles.leftContainer}>
        Participante: {participantName}
      </div>
      <div className={styles.middleContainer}>Rodada {round}</div>
      <div className={styles.rightContainer}>
        <div>Tempo: 10:00</div>
        <div>Pontuação: {points}</div>
      </div>
    </div>
  );
};

export default Header;

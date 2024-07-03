"use client";
import React, { useContext } from "react";
import styles from "./header.module.css";
import { GameContext } from "@/app/context/gameContext";

type Props = {
  participantName: string;
}

const Header = ({ participantName }: Props) => {
  const { values } = useContext(GameContext);
  const { points, round } = values;
  return (
    <div className={styles.generalContainer}>
      <div className={styles.leftContainer}>
        Participante: {participantName} <br />
        <text style={{ color: '#00ff00' }}>Pontuação: {points}</text>
      </div>
      <div className={styles.middleContainer}>Rodada {round}</div>
      <div className={styles.rightContainer}>
        <div>Tempo: 10:00</div>
        <button style={{ textDecoration: 'underline', color: '#ff0000' }}>Sair</button>
      </div>
    </div>
  );
};

export default Header;

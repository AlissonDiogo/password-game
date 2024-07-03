"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./header.module.css";
import { GameContext } from "@/app/context/gameContext";

type Props = {
  participantName: string;
  timeFormatted: string;
  logout: () => void;
}

const Header = ({ participantName, timeFormatted, logout }: Props) => {
  const { values: {points, round} } = useContext(GameContext);

  return (
    <div className={styles.generalContainer}>
      <div className={styles.leftContainer}>
        Participante: {participantName} <br />
        <span style={{ color: '#00ff00' }}>Pontuação: {points}</span>
      </div>
      <div className={styles.middleContainer}>Rodada {round}</div>
      <div className={styles.rightContainer}>
        <div className="timeGame">Tempo: {timeFormatted}</div>
        <button style={{ textDecoration: 'underline', color: '#ff0000' }} onClick={logout}>Sair</button>
      </div>
    </div>
  );
};

export default Header;

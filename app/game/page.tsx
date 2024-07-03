"use client";
import { useState } from "react";
import styles from "./game.module.css";
import Header from "./components/Header/Header";
import GameBoard from "./components/GameBoard/GameBoard";

export default function Game() {
  const [currentRow, setCurrentRow] = useState(0);
  return (
    <div className={styles.firstContainer}>
      <div>
        <Header />
        <GameBoard />
      </div>
    </div>
  );
}

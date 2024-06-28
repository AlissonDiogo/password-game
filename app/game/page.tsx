"use client";
import { useState } from "react";
import styles from "./game.module.css";
import Header from "./components/Header/Header";
import GameRow from "./components/GameRow/GameRow";

export default function Game() {
  const [currentRow, setCurrentRow] = useState(0);
  return (
    <div className={styles.firstContainer}>
      <div>
        <Header />
        <div className={styles.gameBoardContainer}>
          <GameRow wordLength={6} currentRow={currentRow} rowNumber={0} />
          <GameRow wordLength={6} currentRow={currentRow} rowNumber={1} />
          <GameRow wordLength={6} currentRow={currentRow} rowNumber={2} />
          <GameRow wordLength={6} currentRow={currentRow} rowNumber={3} />
          <GameRow wordLength={6} currentRow={currentRow} rowNumber={4} />
          <GameRow wordLength={6} currentRow={currentRow} rowNumber={5} />
        </div>
      </div>
    </div>
  );
}

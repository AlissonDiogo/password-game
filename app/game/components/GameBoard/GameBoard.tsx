"use client";

import React, { useContext } from "react";
import GameRow from "../GameRow/GameRow";
import { GameContext } from "@/app/context/gameContext";

const GameBoard: React.FC = () => {
  const { values: {word , currentRow} } = useContext(GameContext);

  const mountGameBoard = () => {
    const rows = [];
    for (let i = 0; i < 6; i++) {
      rows.push(
        <GameRow key={i} wordLength={word.length} currentRow={currentRow} rowNumber={i} />
      );
    }
    return rows;
  };

  return <div>{mountGameBoard()}</div>;
};

export default GameBoard;

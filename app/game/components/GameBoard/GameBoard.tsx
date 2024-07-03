"use client";

import React, { useContext } from "react";
import GameRow from "../GameRow/GameRow";
import { GameContext } from "@/app/context/gameContext";

const GameBoard: React.FC = () => {
  const { values } = useContext(GameContext);
  const { currentRow } = values; 

  const mountGameBoard = () => {
    const row = [];
    for (let i = 0; i < 5; i++) {
      row.push(
        <GameRow wordLength={6} currentRow={currentRow} rowNumber={i} />
      );
    }
    return row;
  };

  return <div>{mountGameBoard()}</div>;
};

export default GameBoard;

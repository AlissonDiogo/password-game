import React from "react";
import styles from "./gameRow.module.css";
import Square from "../Square/Square";

type Props = {
  wordLength: number;
  currentRow: number;
  rowNumber: number;
};

const GameRow: React.FC<Props> = ({ wordLength, currentRow, rowNumber }) => {
  const mountSquareRow = () => {
    const squares = [];
    for (let i = 0; i < wordLength; i++) {
      squares.push(<Square key={i} currentRow={currentRow} rowNumber={rowNumber} squareNumber={i} />);
    }
    return squares;
  };

  return <div className={styles.gameRowContainer}>{mountSquareRow()}</div>;
};

export default GameRow;

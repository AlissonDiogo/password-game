"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./square.module.css";
import clsx from "clsx";
import { GameContext } from "@/app/context/gameContext";

type Props = {
  rowNumber: number;
  currentRow: number;
  squareNumber: number;
};

const Square: React.FC<Props> = ({ rowNumber, currentRow, squareNumber }) => {
  const { values, functions } = useContext(GameContext);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue("");
  }, [values.word]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 1) {
      functions.setSquareValue(squareNumber, e.target.value.toUpperCase());
      setInputValue(e.target.value.toUpperCase());
    }
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      functions.onConfirmGameRow();
    }
  };

  return (
    <div>
      <input
        className={clsx(styles.inputSquad, {
          [styles.textIndent27]: inputValue.length === 1,
          [styles.backgroundYellow]: functions.getExistButNotCorrect(
            rowNumber,
            squareNumber
          ),
          [styles.backgroundGreen]: functions.getIsCorrectValue(
            rowNumber,
            squareNumber
          ),
        })}
        value={inputValue}
        onChange={onChangeValue}
        disabled={rowNumber !== currentRow || values.disableAll}
        onKeyDown={onPressEnter}
      />
    </div>
  );
};

export default Square;

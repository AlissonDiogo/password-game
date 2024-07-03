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
  const { refSquareList } = values;
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue("");
  }, [values.word]);

  useEffect(() => {
    refSquareList?.get(0).current.focus();
  }, [currentRow]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 1) {
      functions.setSquareValue(squareNumber, e.target.value.toUpperCase());
      setInputValue(e.target.value.toUpperCase());
    }
    if (squareNumber + 1 !== values.word.length && e.target.value.length > 0) {
      refSquareList?.get(squareNumber + 1).current.focus();
    } else if (squareNumber > 0 && squareNumber + 1 !== values.word.length) {
      refSquareList?.get(squareNumber - 1).current.focus();
    }
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      functions.onConfirmGameRow();
    }

    if (e.key === "Backspace") {
      if (squareNumber + 1 === values.word.length) {
        setTimeout(
          () => refSquareList?.get(squareNumber - 1).current.focus(),
          100
        );
      } else if (squareNumber > 0 && inputValue === "") {
        setTimeout(
          () => refSquareList?.get(squareNumber - 1).current.focus(),
          100
        );
      }
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
        ref={rowNumber === currentRow ? refSquareList?.get(squareNumber) : null}
      />
    </div>
  );
};

export default Square;

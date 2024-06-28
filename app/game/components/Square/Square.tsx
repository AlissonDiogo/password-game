"use client";
import React, { useState } from "react";
import styles from "./square.module.css";
import clsx from "clsx";

type Props = {
  rowNumber: number;
  currentRow: number;
};

const Square: React.FC<Props> = ({ rowNumber, currentRow }) => {
  const [inputValue, setInputValue] = useState("");

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 1) {
      setInputValue(e.target.value.toUpperCase());
    }
  };
  return (
    <div>
      <input
        className={clsx(styles.inputSquad, {
          [styles.textIndent27]: inputValue.length === 1,
        })}
        value={inputValue}
        onChange={onChangeValue}
        disabled={rowNumber !== currentRow}
      />
    </div>
  );
};

export default Square;

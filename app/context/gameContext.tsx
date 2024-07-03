"use client";

import { createContext, useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/modal";

import { words } from "@/db";

interface ContextValues {
  values: ValuesType;
  functions: FunctionsType;
}

type ValuesType = {
  currentRow: number;
  word: String;
  points: number;
  round: number;
  answers: String[];
  currentAnswer: String[];
  isOpenModalSuccess: boolean;
  disableAll: boolean;
};

type FunctionsType = {
  setCurrentRow: Function;
  setWord: Function;
  setPoints: Function;
  setRound: Function;
  setAnswers: Function;
  setSquareValue: Function;
  onConfirmGameRow: Function;
  getIsCorrectValue: Function;
  getExistButNotCorrect: Function;
  onOpenModalSuccess: Function;
  onOpenChangeModalSuccess: Function;
  resetGame: Function;
  nextWord: () => void;
};

export const GameContext = createContext<ContextValues>({} as ContextValues);

export const GameContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [currentRow, setCurrentRow] = useState(0);
  const [word, setWord] = useState("VIKING");
  const [points, setPoints] = useState(0);
  const [round, setRound] = useState(1);
  const [answers, setAnswers] = useState<String[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string[]>([]);
  const [disableAll, setDisableAll] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const setSquareValue = (squareNumber: number, newValue: string) => {
    const currentAnswerCopy = currentAnswer;
    currentAnswerCopy[squareNumber] = newValue;
    setCurrentAnswer(currentAnswerCopy);
  };

  const onConfirmGameRow = () => {
    if (checkAllFieldsAreFill()) {
      if (checkIfAnswerIsCorrect(currentAnswer)) {
        setDisableAll(true);
        onOpen();
        setPoints(points + 100);
      }
      const answersCopy = answers;
      answersCopy.push(currentAnswer.join(""));
      setAnswers(answersCopy);
      setCurrentRow(currentRow + 1);
      setCurrentAnswer([]);
    }
  };

  const checkIfAnswerIsCorrect = (currentAnswer: string[]) => {
    return currentAnswer.join("").toUpperCase() === word;
  };

  const getIsCorrectValue = (rowNumber: number, squareNumber: number) => {
    if (
      currentRow > rowNumber &&
      answers[rowNumber][squareNumber] === word[squareNumber]
    )
      return true;
  };

  const getExistButNotCorrect = (rowNumber: number, squareNumber: number) => {
    let wordWithoutCorrectValues = "";
    if (answers[rowNumber]) {
      word.split("").forEach((value, index) => {
        if (value !== answers[rowNumber][index]) {
          wordWithoutCorrectValues = wordWithoutCorrectValues.concat(value);
        }
      });
    }

    if (
      wordWithoutCorrectValues !== "" &&
      wordWithoutCorrectValues.includes(answers[rowNumber][squareNumber])
    ) {
      return true;
    }
    return false;
  };

  const checkAllFieldsAreFill = () => {
    let valid = true;
    if (currentAnswer.length < word.length) return false;
    currentAnswer.forEach((value) => {
      if (!value || value === "" || RegExp(/\d/g).test(value)) valid = false;
    });
    return valid;
  };

  const resetGame = () => {
    document.cookie = "user=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;";

    setCurrentRow(0);
    setAnswers([]);
    setCurrentAnswer([]);
    setDisableAll(false);
    setPoints(0);
    setRound(1);
  };

  const nextWord = (): void => {
    const randomIndex = Math.floor(Math.random() * 184);
    setWord(words[randomIndex].toUpperCase());
    setAnswers([]);
    setCurrentAnswer([]);
    setCurrentRow(0);
    setRound((prev) => prev + 1);
    setDisableAll(false);
  };

  return (
    <GameContext.Provider
      value={{
        values: {
          currentRow,
          word,
          points,
          round,
          answers,
          currentAnswer,
          isOpenModalSuccess: isOpen,
          disableAll,
        },
        functions: {
          setCurrentRow,
          setWord,
          setPoints,
          setRound,
          setAnswers,
          setSquareValue,
          onConfirmGameRow,
          getIsCorrectValue,
          getExistButNotCorrect,
          onOpenModalSuccess: onOpen,
          onOpenChangeModalSuccess: onOpenChange,
          resetGame,
          nextWord,
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

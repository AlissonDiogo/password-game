"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "./components/Header/Header";
import GameBoard from "./components/GameBoard/GameBoard";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

import { GameContext } from "../context/gameContext";

import styles from "./game.module.css";

let timeout: NodeJS.Timeout | null = null;

export default function Game() {
  const router = useRouter();
  const {
    values: {points, isOpenModalSuccess, word},
    functions: { onOpenChangeModalSuccess, resetGame, nextWord },
  } = useContext(GameContext);

  const [participantName, setParticipantName] = useState<string>("");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if(document){
      const cookie = document.cookie;
      if (cookie && cookie?.startsWith("user")) {
        setParticipantName(cookie.split("=")[1]);
      }
    }
  }, [document]);


  useEffect(() => {
    timeout = setTimeout(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  }, [timeout]);

  const setParticipantInTxtFile = async () => {
    try {
      const response = await fetch("/ranking/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ participantName, points, seconds }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados");
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const logoutGame = (): void => {
    if(timeout) clearTimeout(timeout);
    setParticipantInTxtFile();
    resetGame();
    router.back();
  }

  return (
    <div className={styles.firstContainer}>
      <div>
        <Header 
          participantName={participantName} 
          timeFormatted={formatTime(seconds)} 
          logout={logoutGame}
        />
        <GameBoard />
        <Modal
          isOpen={isOpenModalSuccess}
          onOpenChange={() => onOpenChangeModalSuccess()}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent className={styles.modalContent}>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Certa resposta
                </ModalHeader>
                <ModalBody>
                  <p>Respota correta! A palavra acertada foi {word}</p>
                  <p>
                    Se quiser continuar jogando, clique no botão continuar
                    abaixo.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onClose();
                      setParticipantInTxtFile();
                      resetGame();
                      router.push("/");
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      nextWord();
                      onClose();
                    }}
                  >
                    Continuar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

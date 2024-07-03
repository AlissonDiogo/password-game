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

export default function Game() {
  const router = useRouter();
  const {
    values,
    functions: { onOpenChangeModalSuccess, resetGame, nextWord },
  } = useContext(GameContext);
  const [participantName, setParticipantName] = useState<string>("");

  useEffect(() => {
    if(document){
      const cookie = document.cookie;
      if (cookie && cookie?.startsWith("user")) {
        setParticipantName(cookie.split("=")[1]);
      }
    }
  }, [document]);

  const setParticipantInTxtFile = async () => {
    try {
      const response = await fetch("/ranking/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ participantName: "test", points: 100 }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados");
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className={styles.firstContainer}>
      <div>
        <Header participantName={participantName} />
        <GameBoard />
        <Modal
          isOpen={values.isOpenModalSuccess}
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
                  <p>Respota correta! A palavra acertada foi {values.word}</p>
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

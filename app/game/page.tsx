"use client";
import { useContext, useState } from "react";
import styles from "./game.module.css";
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
import { useRouter } from "next/navigation";

export default function Game() {
  const { values, functions } = useContext(GameContext);
  const router = useRouter();

  return (
    <div className={styles.firstContainer}>
      <div>
        <Header />
        <GameBoard />
        <Modal
          isOpen={values.isOpenModalSuccess}
          onOpenChange={() => functions.onOpenChangeModalSuccess()}
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
                      functions.resetGame()
                      router.push("/");
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button color="primary" onPress={onClose}>
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

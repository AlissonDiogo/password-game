"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";

export default function RootPage() {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const handleEnter = (): void => {
    const name = nameRef?.current.value;
    if (name) {
      document.cookie = `user=${name}`;
      router.push("/game");
    }
  };

  const goRankingRoute = () => {
    router.push("/ranking");
  };

  return (
    <div className="home">
      <div className="left">
        <h1 className="title">Password Game</h1>
        <div className="text-container">
          <p className="description">
            É um jogo de palavras onde os jogadores tentam adivinhar uma palavra
            secreta sem nenhuma dica. O usuário tem 5 chances, e a cada
            tentativa são marcadas as letras corretas e as letras em posições
            incorretas.
          </p>
        </div>
      </div>
      <div className="right">
        <input className="user-name" ref={nameRef} placeholder="Nome" />
        <button className="enter" onClick={handleEnter}>
          Entrar
        </button>
      </div>
      <div className="float-button">
        <Button onClick={goRankingRoute}>Ranking</Button>
      </div>
    </div>
  );
}

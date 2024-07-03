'use client'

import { useRouter } from 'next/navigation';
import React, { useContext, useRef } from 'react';
import { GameContext } from './context/gameContext';

export default function RootPage() {
  const {functions: { setParticipantName }} = useContext(GameContext);
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const handleEnter = (): void => {
    const name = nameRef?.current.value;
    if(name){
      setParticipantName(name);
      router.push("/game");
    }
  }

  return (
    <div className='home'>
      <div className='left'>
        <h1 className='title'>
          Password Game
        </h1>
        <div className='text-container'>
          <p className='description'>
            É um jogo de palavras onde jogadores tentam adivinhar uma palavra secreta sem dica alguma. O usuário tem 6 chances e a
            cada chance utilizada é marcado as letras corretas e letras em posições incorretas.
          </p>
        </div>
      </div>
      <div className='right'>
        <input className='user-name' ref={nameRef} placeholder='Nome'/>
        <button className='enter' onClick={handleEnter}>Entrar</button>
      </div>
    </div>
  );
}

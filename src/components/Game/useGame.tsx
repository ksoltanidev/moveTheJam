import { useEffect, useRef, useState } from 'react';
import { GameStateType, JarMovementType } from './Game.tsx';
import useKeyboard from './useKeyboard.tsx';

const GAME_SPEED = 200;
const LEVEL_DURATION = 4000;

type GameProps = {
  boardSize: { width: number; height: number };
  jamJarSize: { width: number; height: number };
};

export default function useGame({ boardSize, jamJarSize }: GameProps) {
  const [gameState, setGameState] = useState<GameStateType>({
    gameState: 'playing',
    level: 1,
    startDate: Date.now(),
  });
  const GameStateRefCache = useRef<GameStateType>({
    gameState: 'playing',
    level: 1,
    startDate: Date.now(),
  });

  const [jars, setJars] = useState<JarMovementType[]>([]);
  const jarsRefCache = useRef<JarMovementType[]>([]);

  const [playerJar, setPlayerJar] = useState<JarMovementType>({
    id: 1,
    positions: [
      {
        position: { x: 50, y: 50 },
        state: 'full',
      },
    ],
  });
  const playerRefCache = useRef<JarMovementType>(playerJar);

  const [frame, setFrame] = useState(0);
  const lastFrameTimeRef = useRef<number>(Date.now());

  const requestUpdateRef = useRef<number>(0);
  const { keyPressedRef } = useKeyboard();

  function NextLevelTrigger() {
    const newGameState = {
      ...GameStateRefCache.current,
      level: GameStateRefCache.current.level + 1,
      startDate: Date.now(),
    };
    setGameState(newGameState);
    GameStateRefCache.current = newGameState;

    // console.log('playerRefCache.current', playerRefCache.current);
    const newJars = [...jarsRefCache.current, playerRefCache.current];
    setJars(newJars);
    jarsRefCache.current = newJars;

    const newPlayerJar: JarMovementType = {
      id: playerRefCache.current.id + 1,
      positions: [
        {
          position: { x: 0, y: 0 },
          state: 'full',
        },
      ],
    };
    setPlayerJar(newPlayerJar);
    playerRefCache.current = newPlayerJar;

    setFrame(0);
    lastFrameTimeRef.current = Date.now();
    // console.log('NewLevel', newPlayerJar);
  }

  function updatePlayerJarPosition(lastPlayerJarPosition: JarMovementType['positions'][0], deltaTime: number) {
    const playerJarPosition = {
      ...lastPlayerJarPosition,
      position: {
        ...lastPlayerJarPosition.position,
      },
    };
    if (keyPressedRef.current) {
      if (keyPressedRef.current === 'ArrowRight')
        playerJarPosition.position.x = Math.min(
          boardSize.width - jamJarSize.width / 2,
          playerJarPosition.position.x - (GAME_SPEED * deltaTime) / 1000,
        );
      if (keyPressedRef.current === 'ArrowLeft')
        playerJarPosition.position.x = Math.max(
          jamJarSize.height / 2,
          playerJarPosition.position.x + (GAME_SPEED * deltaTime) / 1000,
        );
      if (keyPressedRef.current === 'ArrowDown')
        playerJarPosition.position.y = Math.min(
          boardSize.height - jamJarSize.width / 2,
          playerJarPosition.position.y - (GAME_SPEED * deltaTime) / 1000,
        );
      if (keyPressedRef.current === 'ArrowUp')
        playerJarPosition.position.y = Math.max(
          jamJarSize.height / 2,
          playerJarPosition.position.y + (GAME_SPEED * deltaTime) / 1000,
        );
    }
    return playerJarPosition;
  }

  const update = () => {
    setFrame((prevFrame) => prevFrame + 1); // Increment frame or reset if necessary

    const deltaTime = lastFrameTimeRef.current - Date.now();
    lastFrameTimeRef.current = Date.now();

    //Update Game State
    const gameDeltaTime = Date.now() - GameStateRefCache.current.startDate;
    if (gameDeltaTime > LEVEL_DURATION) {
      NextLevelTrigger();
    } else {
      //UpdatePlayerJarPosition
      const lastPlayerJarPosition = playerRefCache.current.positions[playerRefCache.current.positions.length - 1];
      const playerJarPosition = updatePlayerJarPosition(lastPlayerJarPosition, deltaTime);
      const newPlayerJar: JarMovementType = {
        ...playerJar,
        positions: [...playerRefCache.current.positions, playerJarPosition],
      };
      setPlayerJar(newPlayerJar);
      playerRefCache.current = newPlayerJar;
    }
    //Trigger next frame Update
    requestUpdateRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    requestUpdateRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestUpdateRef.current);
  }, [update]); // Runs once on component mount
  // }, [jars, update]); // Runs once on component mount

  return { gameState, jars, playerJar, frame, keyPressedRef };
}

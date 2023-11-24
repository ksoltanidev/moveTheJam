import { useEffect, useRef, useState } from 'react';
import useKeyboard from './useKeyboard.tsx';
import { getRandomPosition } from './utils/getRandomPosition.tsx';
import isColliding from './utils/isColliding.tsx';

export const GAME_SPEED = 250;
export const LEVEL_DURATION = 12000;

export type JarMovementType = {
  id: number;
  positions: {
    position: { x: number; y: number };
    state: 'full' | 'transparent';
  }[]; //list of positions for each frame;
};

export type GameStateType = {
  gameState: 'menu' | 'playing' | 'gameOver';
  level: number;
  score: number;
  objective: { x: number; y: number };
  startDate: number;
};

type GameProps = {
  boardSize: { width: number; height: number };
  jamJarSize: { width: number; height: number };
};

export default function useGame({ boardSize, jamJarSize }: GameProps) {
  const [gameState, setGameState] = useState<GameStateType>({
    gameState: 'playing',
    level: 1,
    score: 0,
    objective: getRandomPosition(boardSize),
    startDate: Date.now(),
  });
  const GameStateRefCache = useRef<GameStateType>(gameState);

  const [jars, setJars] = useState<JarMovementType[]>([]);
  const jarsRefCache = useRef<JarMovementType[]>([]);

  const [playerJar, setPlayerJar] = useState<JarMovementType>({
    id: 1,
    positions: [
      {
        position: getRandomPosition(boardSize),
        state: 'full',
      },
    ],
  });
  const playerRefCache = useRef<JarMovementType>(playerJar);

  const [frame, setFrame] = useState(0);
  const lastFrameTimeRef = useRef<number>(Date.now());

  const requestUpdateRef = useRef<number>(0);
  const { keyPressedRef } = useKeyboard();

  function CompleteLevel() {
    const newGameState = {
      ...GameStateRefCache.current,
      level: GameStateRefCache.current.level + 1,
      score: Math.floor(GameStateRefCache.current.score + (LEVEL_DURATION - (Date.now() - gameState.startDate)) / 100), // + time left
      objective: getRandomPosition(boardSize),
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
          position: playerRefCache.current.positions[playerRefCache.current.positions.length - 1].position,
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

  function GameOver() {
    const newGameState = {
      ...GameStateRefCache.current,
      gameState: 'gameOver' as const,
    };
    setGameState(newGameState);
    GameStateRefCache.current = newGameState;

    setFrame(0);
    lastFrameTimeRef.current = Date.now();
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
    if (gameState.gameState == 'playing') {
      setFrame((prevFrame) => prevFrame + 1); // Increment frame or reset if necessary

      const deltaTime = lastFrameTimeRef.current - Date.now();
      lastFrameTimeRef.current = Date.now();

      //Update Game State
      const gameDeltaTime = Date.now() - GameStateRefCache.current.startDate;
      if (gameDeltaTime > LEVEL_DURATION) {
        GameOver();
      } else {
        //UpdatePlayerJarPosition
        const lastPlayerJarPosition = playerRefCache.current.positions[playerRefCache.current.positions.length - 1];
        const playerJarPosition = updatePlayerJarPosition(lastPlayerJarPosition, deltaTime);

        //Check Collisions
        //Check With Objective
        const isCollidingWithObjective = isColliding(
          playerJarPosition.position,
          GameStateRefCache.current.objective,
          jamJarSize.width * 0.7,
        );
        if (isCollidingWithObjective) {
          CompleteLevel();
          return;
        }

        //Check with other jars
        const isCollidingWithJars = jarsRefCache.current.some((jar) => {
          const jarPosition = jar.positions[frame]?.position;
          return jarPosition && isColliding(playerJarPosition.position, jarPosition, jamJarSize.width * 0.7);
        });
        if (isCollidingWithJars) {
          GameOver();
          return;
        }

        const newPlayerJar: JarMovementType = {
          ...playerJar,
          positions: [...playerRefCache.current.positions, playerJarPosition],
        };
        setPlayerJar(newPlayerJar);
        playerRefCache.current = newPlayerJar;
      }
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

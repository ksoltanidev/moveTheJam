import { GameContainer } from './Game.styles.ts';
import JamJar from '../JamJar/JamJar.tsx';
import { useEffect, useRef, useState } from 'react';

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
  jars: JarMovementType[];
};

export default function Game() {
  const [GameState, setGameState] = useState<GameStateType>({
    gameState: 'playing',
    level: 1,
    jars: [],
  });
  const [frame, setFrame] = useState(0);
  const requestRef = useRef<number>(0);

  const update = () => {
    setFrame((prevFrame) => prevFrame + 1); // Increment frame or reset if necessary
    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Runs once on component mount

  return (
    <GameContainer>
      <JamJar position={{ x: 50, y: 50 }} color={'white'} />
      {GameState.gameState === 'playing' &&
        GameState.jars.map((jar, index) => (
          <JamJar key={jar.id} position={jar.positions[frame].position} color={'white'} />
        ))}
    </GameContainer>
  );
}

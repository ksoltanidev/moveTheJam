import { GameContainer } from './Game.styles.ts';
import JamJar from '../JamJar/JamJar.tsx';
import PlayableJamJar from '../PlayableJamJar/PlayableJamJar.tsx';
import { useEffect } from 'react';
import useGame from './useGame.tsx';
import TargetObjectiv from '../TargetObjective/TargetObjective.tsx';

const BOARD_SIZE = { width: 800, height: 500 };

export default function Game() {
  const { gameState, jars, playerJar, frame, keyPressedRef } = useGame({
    boardSize: BOARD_SIZE,
    jamJarSize: { width: 40, height: 40 }, //todo set elsewhere
  });

  useEffect(() => {
    // console.log('jars', jars);
    // console.log('cache', playerRefCache.current);
  }, [jars]);

  return (
    <GameContainer size={BOARD_SIZE}>
      <h2>Keypress: {keyPressedRef.current}</h2>
      <h2>Frame: {frame}</h2>
      <PlayableJamJar jarMovement={playerJar} />
      {gameState.gameState === 'playing' &&
        jars.map((jar) => {
          const jarCurrentPosition = jar.positions[frame]?.position;
          return <JamJar key={jar.id} jarNumber={jar.id} position={jarCurrentPosition} color={'white'} />;
        })}
      <TargetObjectiv position={gameState.objective} />
    </GameContainer>
  );
}

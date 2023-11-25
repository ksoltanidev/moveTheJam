import { GameContainer } from './Game.styles.ts';
import JamJar from '../JamJar/JamJar.tsx';
import PlayableJamJar from '../PlayableJamJar/PlayableJamJar.tsx';
import useGame, { LEVEL_DURATION } from './useGame.tsx';
import TargetObjective from '../TargetObjective/TargetObjective.tsx';
import GameOver from '../GameOver/GameOver.tsx';
import StartMenu from '../StartMenu/StartMenu.tsx';

const BOARD_SIZE = { width: 800, height: 500 };

export default function Game() {
  const { gameState, jars, playerJar, frame, changeGameState } = useGame({
    boardSize: BOARD_SIZE,
    jamJarSize: { width: 40, height: 40 }, //todo set elsewhere
  });

  if (gameState.gameState === 'menu') return <StartMenu handleStart={() => changeGameState('playing')} />;

  if (gameState.gameState === 'gameOver')
    return (
      <GameOver
        score={gameState.score}
        handleRestart={() => changeGameState('playing')}
        handleExit={() => changeGameState('menu')}
      />
    );

  return (
    <GameContainer size={BOARD_SIZE}>
      <h2>Time Left: {(LEVEL_DURATION - (Date.now() - gameState.startDate)) / 1000}</h2>
      <h2>Score: {gameState.score}</h2>
      <PlayableJamJar jarMovement={playerJar} />
      {gameState.gameState === 'playing' &&
        jars.map((jar) => {
          const jarCurrentPosition = jar.positions[frame]?.position;
          return <JamJar key={jar.id} jarNumber={jar.id} position={jarCurrentPosition} color={'white'} />;
        })}
      <TargetObjective position={gameState.objective} />
    </GameContainer>
  );
}

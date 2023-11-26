import { UIContainer } from './Game.styles.ts';
import useGame, { LEVEL_DURATION } from './useGame.tsx';
import GameOver from '../GameOver/GameOver.tsx';
import StartMenu from '../StartMenu/StartMenu.tsx';
import GameScene from '../GameScene/GameScene.tsx';

export const BOARD_SIZE = { width: 800, height: 500 };
export const JAR_SIZE = { width: 40, height: 40 };

export default function Game() {
  const { gameState, jars, playerJar, frame, changeGameState } = useGame({
    boardSize: BOARD_SIZE,
    jamJarSize: JAR_SIZE,
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
    <div>
      <GameScene playerJar={playerJar} jars={jars} frame={frame} gameState={gameState} />
      <UIContainer size={BOARD_SIZE}>
        <h1>Time left: {((LEVEL_DURATION - (Date.now() - gameState.startDate)) / 1000).toFixed(1)}s</h1>
        <h2>Score: {gameState.score}</h2>
      </UIContainer>
    </div>
  );
}

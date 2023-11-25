import { UIContainer } from './Game.styles.ts';
import useGame, { LEVEL_DURATION } from './useGame.tsx';
import GameOver from '../GameOver/GameOver.tsx';
import GameScene from '../GameScene/GameScene.tsx';

export const BOARD_SIZE = { width: 800, height: 500 };
export const JAR_SIZE = { width: 40, height: 40 };

export default function Game() {
  const { gameState, jars, playerJar, frame, restartGame } = useGame({
    boardSize: BOARD_SIZE,
    jamJarSize: JAR_SIZE,
  });

  if (gameState.gameState === 'gameOver') return <GameOver score={gameState.score} handleRestart={restartGame} />;

  return (
    <div>
      <GameScene playerJar={playerJar} jars={jars} frame={frame} gameState={gameState} />
      <UIContainer size={BOARD_SIZE}>
        <h2>Time Left: {(LEVEL_DURATION - (Date.now() - gameState.startDate)) / 1000}</h2>
        <h2>Score: {gameState.score}</h2>
      </UIContainer>
    </div>
  );
}

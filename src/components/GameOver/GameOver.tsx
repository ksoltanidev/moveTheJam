interface GameOverProps {
  score: number;
  handleRestart: () => void;
  handleExit: () => void;
}

const GameOver = ({ score, handleRestart, handleExit }: GameOverProps) => {
  const bestScore = window.localStorage.getItem('best_score');
  return (
    <div>
      <h1>Game Over</h1>
      {bestScore && <span>Best score: {bestScore}</span>}
      <span>Score: {score}</span>
      <button onClick={handleRestart}>Try Again</button>
      <button onClick={handleExit}>Return to menu </button>
    </div>
  );
};

export default GameOver;

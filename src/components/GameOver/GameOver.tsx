import {
  StyledBestScore,
  StyledButton,
  StyledGameOverContainer,
  StyledScore,
  StyledTextContainer,
  Title,
} from './GameOver.styles.ts';

interface GameOverProps {
  score: number;
  handleRestart: () => void;
  handleExit: () => void;
}

const GameOver = ({ score, handleRestart, handleExit }: GameOverProps) => {
  const bestScore = window.localStorage.getItem('best_score');
  return (
    <StyledGameOverContainer>
      <Title>
        <span>GAME</span>
        <span>OVER</span>
      </Title>
      <StyledTextContainer>
        <StyledScore>Score: {score}</StyledScore>
        {bestScore && <StyledBestScore>Best score: {bestScore}</StyledBestScore>}
        <StyledButton onClick={handleRestart}>Try Again</StyledButton>
        <StyledButton onClick={handleExit}>Return to menu </StyledButton>
      </StyledTextContainer>
    </StyledGameOverContainer>
  );
};

export default GameOver;

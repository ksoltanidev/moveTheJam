import styled from 'styled-components';

export const UIContainer = styled.div<{ size: { width: number; height: number } }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  color: rgb(58, 65, 183);
  text-shadow: 0 0 10px rgba(58, 65, 183, 0.5);
`;

export const StyledTimeAndInfo = styled.h2`
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);

  h1 {
    font-size: 40px;
    margin: 0;
    min-width: 310px;
  }
  p {
    font-size: 30px;
    margin: 0;
    text-align: center;
  }
`;

export const StyledScoreAndLevel = styled.div`
  position: absolute;
  top: 30px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  h2 {
    font-size: 24px;
    margin: 0;
    padding: 0;
  }
`;

export const StyledScore = styled.div`
  display: flex;
  gap: 8px;
`;

export const StyledBonusPoints = styled.div`
  animation: bonusPoints 1s ease-in-out;
  font-weight: bold;
  font-size: 24px;
  opacity: 1;

  @keyframes bonusPoints {
    0% {
      transform: translateY(-10px);
      opacity: 1;
    }
    20% {
      transform: scale(1.3) translateY(0);
      opacity: 1;
    }
    100% {
      transform: scale(1.3) translateY(50px);
      opacity: 0;
    }
  }
`;

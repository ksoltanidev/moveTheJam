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

export const StyledScore = styled.div`
  position: absolute;
  top: 30px;
  left: 20px;
  > h2 {
    font-size: 24px;
  }
`;

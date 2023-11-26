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

  > h1 {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-130px);
    font-size: 40px;
  }
  > h2 {
    position: absolute;
    top: 30px;
    left: 20px;
    font-size: 24px;
  }
`;

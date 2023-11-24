import styled from 'styled-components';

export const GameContainer = styled.div<{ size: { width: number; height: number } }>`
  position: relative;
  background: red;
  width: ${({ size }) => size.width}px;
  height: ${({ size }) => size.height}px;
  color: black;
`;

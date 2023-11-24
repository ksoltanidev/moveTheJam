import styled from 'styled-components';

export const StyledJamJar = styled.div<{ color: string; position: { x: number; y: number } }>`
  position: absolute;
  left: ${({ position }) => position.x}px;
  top: ${({ position }) => position.y}px;
  transform: translate(-50%, -50%);
  background: ${({ color }) => color};
  width: 40px;
  height: 40px;
`;

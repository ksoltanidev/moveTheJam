import styled from 'styled-components';

export const StyledTargetObjective = styled.div<{ position: { x: number; y: number } }>`
  position: absolute;
  left: ${({ position }) => position.x}px;
  top: ${({ position }) => position.y}px;
  transform: translate(-50%, -50%);
  background: #1efe00;
  width: 40px;
  height: 40px;
`;

import styled from 'styled-components';

export const UIContainer = styled.div<{ size: { width: number; height: number } }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  color: white;
`;

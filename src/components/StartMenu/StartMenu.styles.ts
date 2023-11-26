import styled from 'styled-components';

export const StyledStartMenu = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  cursor: none;
  overflow: hidden;
`;

export const StyledTitleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #b0cbd9;
`;

export const Title = styled.h1`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 25vh;
  font-weight: 800;
  letter-spacing: 8px;
  color: #535bf2;
  text-align: left;
  margin: 0;
  padding: 20px;
  > span {
    display: block;
  }
`;

export const StyledMask = styled.div<{ position: { x: number; y: number } }>`
  position: absolute;
  top: ${({ position }) => position.y}px;
  left: ${({ position }) => position.x}px;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgb(31, 31, 31);
  //background: rgba(1, 48, 109, 0.24);
  mix-blend-mode: difference;
  box-shadow: 0 0 6px 3px rgb(98 98 98 / 31%);
  overflow: hidden;
`;

export const StyledCursor = styled.div<{ position: { x: number; y: number } }>`
  position: absolute;
  top: ${({ position }) => position.y}px;
  left: ${({ position }) => position.x}px;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.13);
  box-shadow: 0 0 6px 3px rgba(98, 98, 98, 0.07);
  overflow: hidden;
  pointer-events: none;
`;

export const StyledPageContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  pointer-events: none;
`;

export const StyledStartButton = styled.button`
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  font-weight: 800;
  letter-spacing: 3px;
  color: #535bf2;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 20px;
  transition: all 0.5s ease;
  pointer-events: all;
  border-radius: 10px;
  &:hover {
    box-shadow: 0 0 6px 3px rgb(98 98 98 / 31%);
    color: #b0cbd9;
    background: #535bf2;
  }
`;

export const StyledGithubLink = styled.span`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #535bf2;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.5s ease;

  > a {
    text-decoration: none;
    color: #2a2c80;
    pointer-events: all;

    &:hover {
      color: #b0cbd9;
    }
  }
`;

export const StyledSoundButton = styled.button`
  position: absolute;
  bottom: 80px;
  right: 40px;
  width: 100px;
  height: 100px;
  background: rgba(66, 98, 118, 0.13);
  border-radius: 50%;
  border: none;
  box-shadow: 0 0 6px 3px rgba(98, 98, 98, 0.07);

  color: #535bf2;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 0;
  pointer-events: all;

  transition: all 0.3s ease;
  &:hover {
    color: #b0cbd9;
    background: rgba(66, 98, 118, 0.2);
    transform: scale(1.1);
  }
`;

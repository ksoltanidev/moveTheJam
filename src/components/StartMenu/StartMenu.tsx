import MenuBackground from './MenuBackground/MenuBackground.tsx';
import {
  StyledCursor,
  StyledMask,
  StyledTitleContainer,
  StyledStartMenu,
  Title,
  StyledPageContent,
  StyledStartButton,
  StyledGithubLink,
} from './StartMenu.styles.ts';
import { useEffect, useRef, useState } from 'react';

interface StartMenuProps {
  handleStart: () => void;
}

const StartMenu = ({ handleStart }: StartMenuProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const requestUpdateRef = useRef<any>();
  function updateCursorPosition() {
    setCursorPosition({
      x: cursorPosition.x + (mousePosition.x - cursorPosition.x) * 0.5,
      y: cursorPosition.y + (mousePosition.y - cursorPosition.y) * 0.5,
    });
  }

  useEffect(() => {
    requestUpdateRef.current = requestAnimationFrame(updateCursorPosition);
    return () => cancelAnimationFrame(requestUpdateRef.current);
  }, [updateCursorPosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <StyledStartMenu>
      <StyledTitleContainer>
        <Title>
          <span>MOVE</span>
          <span>THE</span>
          <span>JAM</span>
        </Title>
      </StyledTitleContainer>
      <StyledMask position={mousePosition} />
      <MenuBackground />
      <StyledPageContent>
        <StyledStartButton onClick={handleStart}>START</StyledStartButton>
        {/*<p>Crédits</p>*/}
        <StyledGithubLink>
          Review the code on <a href="https://github.com/ksoltanidev/moveTheJam">GitHub</a>
        </StyledGithubLink>
      </StyledPageContent>
      <StyledCursor position={cursorPosition} />
    </StyledStartMenu>
  );
};

export default StartMenu;

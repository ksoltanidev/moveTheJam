import JamJar from '../JamJar/JamJar.tsx';
import { useCallback, useEffect, useState } from 'react';

const PlayableJamJar = () => {
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const {code} = e;

    if (code === 'ArrowLeft') setPositionX((x) => x - 5)
    if (code === 'ArrowRight') setPositionX((x) => x + 5)

    if (code === 'ArrowUp') setPositionY((y) => y - 5)
    if (code === 'ArrowDown') setPositionY((y) => y + 5)
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress]);

  return (
    <>
      <JamJar position={{x: positionX, y: positionY}} />
    </>
  );
};

export default PlayableJamJar;

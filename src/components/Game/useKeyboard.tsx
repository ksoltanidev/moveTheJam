import { useCallback, useEffect, useRef } from 'react';

export default function useKeyboard() {
  const keyPressedRef = useRef<Array<string>>([]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const { code } = e;
    if (!keyPressedRef.current.includes(code)) keyPressedRef.current.push(code);
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const { code } = e;
    keyPressedRef.current = keyPressedRef.current.filter((keyPressed) => keyPressed !== code);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyPress]);

  return { keyPressedRef };
}

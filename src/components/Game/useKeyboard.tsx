import { useCallback, useEffect, useRef } from 'react';

export default function useKeyboard() {
  const keyPressedRef = useRef<Array<string>>([]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const { code } = e;
    if (!keyPressedRef.current.includes(code)) {
      keyPressedRef.current.push(code);
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const { code } = e;
    keyPressedRef.current = keyPressedRef.current.filter((keyPressed) => keyPressed !== code);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown]);

  return { keyPressedRef };
}

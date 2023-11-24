import { useCallback, useEffect, useRef } from 'react';

export default function useKeyboard() {
  const keyPressedRef = useRef<string | null>(null);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const { code } = e;
    keyPressedRef.current = code;
  }, []);

  const handleKeyUp = useCallback(() => {
    keyPressedRef.current = null;
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

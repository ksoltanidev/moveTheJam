export function getRandomPosition(boardSize: { width: number; height: number }) {
  const x = Math.floor(Math.random() * boardSize.width);
  const y = Math.floor(Math.random() * boardSize.height);
  return { x, y };
}

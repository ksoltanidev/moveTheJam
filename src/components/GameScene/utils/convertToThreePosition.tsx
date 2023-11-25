import { BOARD_SIZE } from '../../Game/Game.tsx';

export function convertToThreePosition(position: { x: number; y: number }, height?: number): [number, number, number] {
  return [(position.x - BOARD_SIZE.width / 2) / 10, (-position.y + BOARD_SIZE.height / 2) / 10, height || 0];
}

const KEYS = {
  up: ['ArrowUp', 'KeyW', 'KeyZ'],
  down: ['ArrowDown', 'KeyS'],
  left: ['ArrowLeft', 'KeyA', 'KeyQ'],
  right: ['ArrowRight', 'KeyD'],
};
export function isMovingToDirection(keys: string[], direction: keyof typeof KEYS) {
  return keys.some((key) => KEYS[direction].includes(key));
}

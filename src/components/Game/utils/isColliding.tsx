import getDistance from './getDistance.tsx';

export default function isColliding(
  position1: { x: number; y: number },
  position2: { x: number; y: number },
  minimumDistance: number = 0,
) {
  return getDistance(position1, position2) <= minimumDistance;
}

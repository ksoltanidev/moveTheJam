export default function getDistance(position1: { x: number; y: number }, position2: { x: number; y: number }) {
  const a = position1.x - position2.x;
  const b = position1.y - position2.y;

  return Math.sqrt(a * a + b * b);
}

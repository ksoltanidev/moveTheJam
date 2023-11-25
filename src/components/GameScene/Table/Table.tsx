import { BOARD_SIZE } from '../../Game/Game.tsx';

export default function Table() {
  return (
    <mesh>
      <planeGeometry attach="geometry" args={[BOARD_SIZE.width / 10, BOARD_SIZE.height / 10]} />
      <meshStandardMaterial attach="material" color="orange" />
    </mesh>
  );
}

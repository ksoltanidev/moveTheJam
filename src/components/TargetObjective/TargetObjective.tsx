import Jar from '../GameScene/Jar/Jar.tsx';
import { convertToThreePosition } from '../GameScene/utils/convertToThreePosition.tsx';

type TargetObjectiveProps = {
  position: { x: number; y: number };
};

export default function TargetObjective({ position }: TargetObjectiveProps) {
  return <Jar id={-10} position={convertToThreePosition(position)} color={'green'} lidColor={'#09d710'} />;
}

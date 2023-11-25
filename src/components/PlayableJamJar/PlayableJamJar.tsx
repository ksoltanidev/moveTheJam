import { JarMovementType } from '../Game/useGame.tsx';
import Jar from '../GameScene/Jar/Jar.tsx';
import { convertToThreePosition } from '../GameScene/utils/convertToThreePosition.tsx';

type PlayableJamJarProps = {
  jarMovement: JarMovementType;
};

const PlayableJamJar = ({ jarMovement }: PlayableJamJarProps) => {
  const lastPosition = jarMovement.positions[jarMovement.positions.length - 1];
  return (
    <Jar
      id={-1}
      position={convertToThreePosition({ x: lastPosition.position.x, y: lastPosition.position.y })}
      color={'#0480f4'}
      lidColor={'#0a71d8'}
    />
  );
};

export default PlayableJamJar;

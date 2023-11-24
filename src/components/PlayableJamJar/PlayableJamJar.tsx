import JamJar from '../JamJar/JamJar.tsx';
import { JarMovementType } from '../Game/Game.tsx';

type PlayableJamJarProps = {
  jarMovement: JarMovementType;
};

const PlayableJamJar = ({ jarMovement }: PlayableJamJarProps) => {
  const lastPosition = jarMovement.positions[jarMovement.positions.length - 1];

  return (
    <>
      <JamJar position={{ x: lastPosition.position.x, y: lastPosition.position.y }} color={'blue'} />
    </>
  );
};

export default PlayableJamJar;

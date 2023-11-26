import { SceneContainer } from './GameScene.styles.ts';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { folder, Leva, useControls } from 'leva';
import { GameStateType, JarMovementType } from '../Game/useGame.tsx';
import Table from './Table/Table.tsx';
import Jar from './Jar/Jar.tsx';
import PlayableJamJar from '../PlayableJamJar/PlayableJamJar.tsx';
import { convertToThreePosition } from './utils/convertToThreePosition.tsx';
import TargetObjective from '../TargetObjective/TargetObjective.tsx';

type GameSceneProps = {
  playerJar: JarMovementType;
  jars: JarMovementType[];
  frame: number;
  gameState: GameStateType;
};

export default function GameScene({ playerJar, jars, frame, gameState }: GameSceneProps) {
  const controls = useControls('Lights', {
    directional: folder({
      d_Intensity: {
        value: 3,
        min: 0,
        max: 10,
        step: 0.1,
      },
      d_XZ: {
        value: {
          x: 10,
          y: 10,
        },
        step: 0.1,
      },
      d_Y: {
        value: 10,
        min: -20,
        max: 20,
        step: 0.1,
      },
      d_RotationX: {
        value: 0,
        min: -10,
        max: 10,
        step: 0.5,
      },
      d_RotationY: {
        value: 0,
        min: -10,
        max: 10,
        step: 0.5,
      },
      d_RotationZ: {
        value: 0,
        min: -10,
        max: 10,
        step: 0.5,
      },
    }),
    ambiant: folder({
      a_Intensity: {
        value: 0.7,
        min: 0,
        max: 1,
        step: 0.05,
      },
    }),
    camera: folder({
      c_RotationX: {
        value: 0.25,
        min: -2,
        max: 2,
        step: 0.05,
      },
      c_RotationY: {
        value: 0,
        min: -2,
        max: 2,
        step: 0.05,
      },
      c_RotationZ: {
        value: 0,
        min: -2,
        max: 2,
        step: 0.05,
      },
    }),
  });

  const jamColors = [
    '#aa0f0f',
    '#d87617',
    '#cda00f',
    '#d8d80b',
    '#80ff00',
    '#00ff00',
    '#00ff80',
    '#01e6d7',
    '#0aaece',
    '#066f9d',
    '#064c9d',
    '#2113c9',
    '#410ace',
    '#4a069d',
    '#5c08c2',
    '#8b0ad5',
    '#bc11ea',
    '#ea11c2',
    '#d5067f',
    '#d8063e',
  ];
  return (
    <SceneContainer>
      <Leva hidden={true} />
      <Canvas>
        <color attach="background" args={['#b0cbd9']} />
        <PerspectiveCamera
          makeDefault
          position={[0, -25, 60]}
          rotation-x={(controls.c_RotationX * Math.PI) / 2}
          rotation-y={(controls.c_RotationY * Math.PI) / 2}
          rotation-z={(controls.c_RotationZ * Math.PI) / 2}
        />
        <directionalLight
          intensity={controls.d_Intensity}
          position={[controls.d_XZ.x, controls.d_XZ.y, controls.d_Y]}
          rotation-x={(controls.d_RotationX * Math.PI) / 2}
          rotation-y={(controls.d_RotationY * Math.PI) / 2}
          rotation-z={(controls.d_RotationZ * Math.PI) / 2}
        />
        <ambientLight intensity={controls.a_Intensity} />
        {/*<OrbitControls />*/}
        <group>
          <Table />
          <PlayableJamJar jarMovement={playerJar} />
          {jars.map((jar) => {
            const jarCurrentPosition = jar.positions[frame]?.position;
            return (
              jarCurrentPosition && (
                <Jar
                  key={jar.id}
                  id={jar.id}
                  position={convertToThreePosition(jarCurrentPosition)}
                  color={jamColors[jar.id % 20]}
                  lidColor={'#ad0505'}
                />
              )
            );
          })}
          <TargetObjective position={gameState.objective} />
          {gameState.bonusJar && (
            <Jar
              id={-20}
              position={convertToThreePosition(gameState.bonusJar)}
              color={'#e27101'}
              lidColor={'#dcca06'}
            />
          )}
        </group>
      </Canvas>
    </SceneContainer>
  );
}

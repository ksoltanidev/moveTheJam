import { SceneContainer } from './MenuBackground.styles.ts';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Mask, PerspectiveCamera } from '@react-three/drei';
import { Leva } from 'leva';
import MenuJars from './MenuJars.tsx';
import { useMemo, useRef, useState } from 'react';

export default function MenuBackground() {
  const [mousePosInCanvas, setMousePosInCanvas] = useState({ x: 0, y: 0 });

  const instanceCount = 500;
  const randomPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < instanceCount; i++) {
      positions.push({
        x: ((Math.random() - 0.5) * window.innerWidth) / 40,
        y: (Math.random() * window.innerHeight) / 2,
        z: 5 - Math.random() * 20,
        rx: Math.random() * Math.PI * 2,
        ry: Math.random() * Math.PI * 2,
        rz: Math.random() * Math.PI * 2,
        fallSpeed: Math.random(),
        rotateSpeedX: Math.random() * 2 - 1,
        rotateSpeedY: Math.random() * 2 - 1,
        rotateSpeedZ: Math.random() * 2 - 1,
      });
    }
    return positions;
  }, []);

  return (
    <div>
      <Leva hidden={true} />
      <SceneContainer>
        <Canvas>
          <Scene
            invert={false}
            lidColor={'#d5a82b'}
            jamColor={'#bf0631'}
            randomPositions={randomPositions}
            instanceCount={instanceCount}
            mousePosInCanvas={mousePosInCanvas}
            setMousePosInCanvas={setMousePosInCanvas}
          />
        </Canvas>
      </SceneContainer>
      <SceneContainer>
        <Canvas>
          <Scene
            invert={true}
            lidColor={'#2bc4d5'}
            jamColor={'#9135d4'}
            randomPositions={randomPositions}
            instanceCount={instanceCount}
            mousePosInCanvas={mousePosInCanvas}
            setMousePosInCanvas={setMousePosInCanvas}
          />
        </Canvas>
      </SceneContainer>
    </div>
  );
}

type SceneProps = {
  invert: boolean;
  lidColor: string;
  jamColor: string;
  randomPositions: {
    x: number;
    y: number;
    z: number;
    rx: number;
    ry: number;
    rz: number;
    fallSpeed: number;
    rotateSpeedX: number;
    rotateSpeedY: number;
    rotateSpeedZ: number;
  }[];
  instanceCount: number;
  mousePosInCanvas: { x: number; y: number };
  setMousePosInCanvas: (mousePosInCanvas: { x: number; y: number }) => void;
};
function Scene({
  invert,
  lidColor,
  jamColor,
  randomPositions,
  instanceCount,
  mousePosInCanvas,
  setMousePosInCanvas,
}: SceneProps) {
  const { viewport, camera } = useThree();
  const maskRef = useRef<any>(null);

  useFrame(({ pointer }) => {
    if (!maskRef.current) return;
    const x = (pointer.x * viewport.width) / 2;
    const y = (18 + pointer.y * viewport.height) / 2;
    setMousePosInCanvas({ x, y });
    maskRef.current.position.set(mousePosInCanvas.x, mousePosInCanvas.y, 0);
    maskRef.current.lookAt(camera.position);
    //camera is 0 0 20. rotate the mask to be 90° to face the camera
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} rotation-x={(0.25 * Math.PI) / 2} />
      <pointLight intensity={900} position={[-9, 4.4, 6.5]} />
      <ambientLight intensity={0.7} />
      {/*<OrbitControls />*/}
      <group ref={maskRef} position={[10, 0, 19]}>
        {/*<Frame />*/}
        <Mask id={1}>
          <circleGeometry args={[4, 64]} />
        </Mask>
      </group>
      <MenuJars
        randomPositions={randomPositions}
        instanceCount={instanceCount}
        lidColor={lidColor}
        jamColor={jamColor}
        invert={invert}
      />
    </>
  );
}

// @ts-ignore
function Frame(props) {
  return (
    <mesh {...props}>
      <ringGeometry args={[3.9, 4, 64]} />
      <meshPhongMaterial color="black" />
    </mesh>
  );
}

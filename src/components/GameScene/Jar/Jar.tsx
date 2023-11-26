// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

type JarProps = {
  id: number;
  color: string;
  position: [number, number, number];
  lidColor?: string;
};
export default function Jar({ position, color, lidColor = '#b49234' }: JarProps) {
  const jamModel = useLoader(GLTFLoader as any, '/jamjar.gltf');
  const { jam, lid, pot } = jamModel.nodes;
  return (
    <group position={[position[0], position[1], position[2]]} rotation={[Math.PI / 2, 0, 0]} scale={2}>
      <mesh geometry={pot.geometry}>
        <meshPhysicalMaterial
          color={'#b2d4e5'}
          roughness={0.1}
          transmission={0.6}
          thickness={0.6}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <mesh geometry={lid.geometry}>
        <meshStandardMaterial color={lidColor} />
      </mesh>
      <mesh geometry={jam.geometry}>
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

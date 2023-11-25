import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useMask } from '@react-three/drei';

type MenuJarsProps = {
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
  lidColor: string;
  jamColor: string;
  invert: boolean;
};
export default function MenuJars({ randomPositions, instanceCount, lidColor, jamColor, invert }: MenuJarsProps) {
  const jamModel = useLoader(GLTFLoader as any, '/jamjar.gltf');
  const { jam, lid, pot } = jamModel.nodes;
  const stencil = useMask(1, invert);

  const instancedMeshRefPot = useRef<any>();
  const instancedMeshRefLid = useRef<any>();
  const instancedMeshRefJam = useRef<any>();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    for (let i = 0; i < randomPositions.length; i++) {
      dummy.position.set(randomPositions[i].x, randomPositions[i].y, randomPositions[i].z);
      dummy.rotation.set(randomPositions[i].rx, randomPositions[i].ry, randomPositions[i].rz);
      dummy.updateMatrix();
      instancedMeshRefPot.current.setMatrixAt(i, dummy.matrix);
      instancedMeshRefLid.current.setMatrixAt(i, dummy.matrix);
      instancedMeshRefJam.current.setMatrixAt(i, dummy.matrix);
    }
    // Update the instance
    instancedMeshRefPot.current.instanceMatrix.needsUpdate = true;
    instancedMeshRefLid.current.instanceMatrix.needsUpdate = true;
    instancedMeshRefJam.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    for (let i = 0; i < randomPositions.length; i++) {
      dummy.matrix.fromArray(instancedMeshRefPot.current.instanceMatrix.array, i * 16);
      dummy.position.y = randomPositions[i].y - randomPositions[i].fallSpeed * 2 * elapsedTime;
      dummy.position.x = randomPositions[i].x;
      dummy.position.z = randomPositions[i].z;

      dummy.rotation.x =
        randomPositions[i].rx + randomPositions[i].rotateSpeedX * elapsedTime * randomPositions[i].fallSpeed;
      dummy.rotation.y =
        randomPositions[i].ry + randomPositions[i].rotateSpeedY * elapsedTime * randomPositions[i].fallSpeed;
      dummy.rotation.z =
        randomPositions[i].rz + randomPositions[i].rotateSpeedZ * elapsedTime * randomPositions[i].fallSpeed;

      // Update the matrix
      dummy.updateMatrix();
      instancedMeshRefPot.current.setMatrixAt(i, dummy.matrix);
      instancedMeshRefLid.current.setMatrixAt(i, dummy.matrix);
      instancedMeshRefJam.current.setMatrixAt(i, dummy.matrix);
    }

    // Update the instance
    instancedMeshRefPot.current.instanceMatrix.needsUpdate = true;
    instancedMeshRefLid.current.instanceMatrix.needsUpdate = true;
    instancedMeshRefJam.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={[0, 2, -4]} scale={2}>
      <instancedMesh ref={instancedMeshRefPot} args={[pot.geometry, null, instanceCount]}>
        <meshPhysicalMaterial
          color={'#b2d4e5'}
          roughness={0.1}
          transmission={0.8}
          thickness={0.6}
          ior={1.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          {...stencil}
        />
      </instancedMesh>
      <instancedMesh ref={instancedMeshRefLid} args={[lid.geometry, null, instanceCount]}>
        <meshStandardMaterial color={lidColor} {...stencil} />
      </instancedMesh>
      <instancedMesh ref={instancedMeshRefJam} args={[jam.geometry, null, instanceCount]}>
        <meshStandardMaterial color={jamColor} {...stencil} />
      </instancedMesh>
    </group>
  );
}

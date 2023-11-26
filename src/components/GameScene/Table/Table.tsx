import { BOARD_SIZE } from '../../Game/Game.tsx';

const table_vertex = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

const table_fragment = `
varying vec2 vUv;

void main() {
  vec3 color1 = vec3(0.9, 0.2, 0.4); // Red
  vec3 color2 = vec3(0.9, 0.9, 0.9); // Green

  float grid = mod(floor(vUv.x * 10.0) + floor(vUv.y * 8.0), 3.0);
  vec3 color = mix(color1, color2, grid);

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function Table() {
  return (
    <mesh>
      <planeGeometry attach="geometry" args={[BOARD_SIZE.width / 10, BOARD_SIZE.height / 10]} />
      <shaderMaterial attach="material" fragmentShader={table_fragment} vertexShader={table_vertex} />
    </mesh>
  );
}

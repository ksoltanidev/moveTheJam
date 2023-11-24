import { StyledJamJar } from './JamJar.styles.ts';

type JamJarProps = {
  position: { x: number; y: number };
  color?: string;
};
export default function JamJar({ position, color = '#f00' }: JamJarProps) {
  return (
    <StyledJamJar color={color} position={position}>
      jamjar
    </StyledJamJar>
  );
}

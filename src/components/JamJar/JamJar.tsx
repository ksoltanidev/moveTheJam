import { StyledJamJar } from './JamJar.styles.ts';

type JamJarProps = {
  jarNumber?: number;
  position?: { x: number; y: number };
  color?: string;
};
export default function JamJar({ jarNumber, position, color = '#f00' }: JamJarProps) {
  return (
    position && (
      <StyledJamJar color={color} position={position}>
        {jarNumber}
      </StyledJamJar>
    )
  );
}

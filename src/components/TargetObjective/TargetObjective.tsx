import { StyledTargetObjective } from './TargetObjective.styles.ts';

type TargetObjectiveProps = {
  position: { x: number; y: number };
};

export default function TargetObjectiv({ position }: TargetObjectiveProps) {
  return <StyledTargetObjective position={position}>Obj</StyledTargetObjective>;
}

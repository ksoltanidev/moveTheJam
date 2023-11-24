import { GameContainer } from './Game.styles.ts';
import JamJar from '../JamJar/JamJar.tsx';

export default function Game() {
  return (
    <GameContainer>
      <JamJar position={{ x: 50, y: 50 }} color={'white'} />
    </GameContainer>
  );
}

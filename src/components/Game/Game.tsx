import { GameContainer } from './Game.styles.ts';
import JamJar from '../JamJar/JamJar.tsx';
import PlayableJamJar from '../PlayableJamJar/PlayableJamJar.tsx';

export default function Game() {
  return (
    <GameContainer>
      <PlayableJamJar/>
      <JamJar position={{ x: 50, y: 50 }} color={'white'} />
    </GameContainer>
  );
}

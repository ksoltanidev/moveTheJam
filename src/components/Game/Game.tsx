import { StyledBonusPoints, StyledScoreAndLevel, StyledTimeAndInfo, UIContainer, StyledScore } from './Game.styles.ts';
import useGame, { IMMUNE_DURATION, LEVEL_DURATION } from './useGame.tsx';
import GameOver from '../GameOver/GameOver.tsx';
import StartMenu from '../StartMenu/StartMenu.tsx';
import GameScene from '../GameScene/GameScene.tsx';
import gameAudio from '../../../public/audio.mp3';
// @ts-ignore
import useSound from 'use-sound';
import { useEffect, useState } from 'react';

export const BOARD_SIZE = { width: 800, height: 500 };
export const JAR_SIZE = { width: 40, height: 40 };

export default function Game() {
  const { gameState, jars, playerJar, frame, changeGameState } = useGame({
    boardSize: BOARD_SIZE,
    jamJarSize: JAR_SIZE,
  });
  const gameDeltaTime = Date.now() - gameState.startDate;
  const [scoreCache, setScoreCache] = useState<{ score: number; delta: number | null }>({
    score: 0,
    delta: null,
  });
  const [isSongPlaying, setIsSongPlaying] = useState<boolean>(false);
  const [isSongMuted, setIsSongMuted] = useState<boolean>(false);
  const [play, { stop }] = useSound(gameAudio, {
    volume: 0.08,
    onplay: () => setIsSongPlaying(true),
    onend: () => setIsSongPlaying(false),
  });

  useEffect(() => {
    if (!isSongPlaying && !isSongMuted) play();
  }, [isSongPlaying, play]);

  function onSoundButton() {
    if (isSongMuted) {
      setIsSongMuted(false);
      // setIsSongPlaying(true);
      play();
    } else {
      setIsSongMuted(true);
      stop();
    }
  }

  useEffect(() => {
    setScoreCache({
      score: gameState.score,
      delta: gameState.score - scoreCache.score,
    });
    setTimeout(() => {
      setScoreCache({
        score: gameState.score,
        delta: null,
      });
    }, 1000);
  }, [gameState.score]);

  if (gameState.gameState === 'menu')
    return (
      <StartMenu
        handleStart={() => changeGameState('playing')}
        onSoundButton={onSoundButton}
        isSongPlaying={!isSongMuted}
      />
    );

  if (gameState.gameState === 'gameOver')
    return (
      <GameOver
        score={gameState.score}
        handleRestart={() => changeGameState('playing')}
        handleExit={() => changeGameState('menu')}
      />
    );

  return (
    <div>
      <GameScene playerJar={playerJar} jars={jars} frame={frame} gameState={gameState} />
      <UIContainer size={BOARD_SIZE}>
        <StyledTimeAndInfo>
          <h1>Time left: {((LEVEL_DURATION - (Date.now() - gameState.startDate)) / 1000).toFixed(1)}s</h1>
          {gameDeltaTime < IMMUNE_DURATION && <p>IMMUNE</p>}
        </StyledTimeAndInfo>
        <StyledScoreAndLevel>
          <StyledScore>
            <h2>Score: {gameState.score}</h2>
            {scoreCache.delta && <StyledBonusPoints>+{scoreCache.delta}</StyledBonusPoints>}
          </StyledScore>
          <h2>Level: {gameState.level}</h2>
        </StyledScoreAndLevel>
      </UIContainer>
    </div>
  );
}

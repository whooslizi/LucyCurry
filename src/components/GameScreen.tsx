import { useState } from 'react'
import ShopScene from './ShopScene'
import DailySummary from './DailySummary'
import StoryScreen from './StoryScreen'
import TutorialScreen from './TutorialScreen'
import EndingScreen from './EndingScreen'
import NightCutscene from './NightCutscene'
import { GameProvider, useGameState } from '../game/gameState'

// Internal component that uses context
function GameContent() {
  const { state } = useGameState();
  const [isDayOver, setIsDayOver] = useState(false);
  const [wastePenalty, setWastePenalty] = useState(0);
  const [showRobbery, setShowRobbery] = useState(false);
  const [showTutorial, setShowTutorial] = useState(() => !localStorage.getItem('lucyCurry_tutorialRead'));

  // If player hasn't entered name, show story
  if (!state.playerName) {
    return <StoryScreen onComplete={() => {}} />;
  }

  if (showTutorial && state.playerName) {
    return <TutorialScreen onClose={() => {
      localStorage.setItem('lucyCurry_tutorialRead', 'true');
      setShowTutorial(false);
    }} />;
  }

  // If game is finished (day > 7)
  if (state.day > 7) {
    return <EndingScreen />;
  }

  if (showRobbery) {
    return <NightCutscene onComplete={() => { setShowRobbery(false); setIsDayOver(false); }} />;
  }

  return (
    <div className="screen-container">
      {!isDayOver ? (
        <ShopScene onEndDay={(p) => { setWastePenalty(p); setIsDayOver(true); }} />
      ) : (
        <DailySummary wastePenalty={wastePenalty} onNextDay={() => {
          if (state.day > 1 && Math.random() < 0.3) {
            setShowRobbery(true);
          } else {
            setIsDayOver(false);
          }
        }} />
      )}
    </div>
  );
}

export default function GameScreen() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  )
}

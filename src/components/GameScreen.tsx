import { useState } from 'react'
import ShopScene from './ShopScene'
import DailySummary from './DailySummary'
import StoryScreen from './StoryScreen'
import { GameProvider, useGameState } from '../game/gameState'

// Internal component that uses context
function GameContent() {
  const { state } = useGameState();
  const [isDayOver, setIsDayOver] = useState(false);

  // If player hasn't entered name, show story
  if (!state.playerName) {
    return <StoryScreen onComplete={() => {}} />;
  }

  return (
    <div className="screen-container">
      {!isDayOver ? (
        <ShopScene onEndDay={() => setIsDayOver(true)} />
      ) : (
        <DailySummary onNextDay={() => setIsDayOver(false)} />
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

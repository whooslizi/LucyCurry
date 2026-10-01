import { useState } from 'react'
import DisclaimerScreen from './components/DisclaimerScreen'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'

function App() {
  const [screen, setScreen] = useState<'disclaimer' | 'start' | 'game'>('disclaimer')
  const [musicStarted, setMusicStarted] = useState(false);

  const handleDisclaimerAccept = () => {
    setScreen('start')
    setMusicStarted(true);
  }

  return (
    <>
      {musicStarted && <audio src="/sounds/bgm.wav" loop autoPlay />}
      {screen === 'disclaimer' && <DisclaimerScreen onAccept={handleDisclaimerAccept} />}
      {screen === 'start' && <StartScreen onStart={() => setScreen('game')} onShowDisclaimer={() => setScreen('disclaimer')} />}
      {screen === 'game' && <GameScreen />}
    </>
  )
}

export default App

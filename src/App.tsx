import { useState, useEffect } from 'react'
import DisclaimerScreen from './components/DisclaimerScreen'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'

function App() {
  const [screen, setScreen] = useState<'disclaimer' | 'start' | 'game'>('disclaimer');
  const [musicStarted, setMusicStarted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('lucyCurry_disclaimerAccepted')) {
      setScreen('start');
    }
  }, []);

  const handleDisclaimerAccept = () => {
    localStorage.setItem('lucyCurry_disclaimerAccepted', 'true');
    setScreen('start')
    setMusicStarted(true);
  }

  return (
    <>
      {musicStarted && <audio src="/sounds/bgm.wav" loop autoPlay />}
      {screen === 'disclaimer' && <DisclaimerScreen onAccept={handleDisclaimerAccept} />}
      {screen === 'start' && <StartScreen onStart={() => { setScreen('game'); setMusicStarted(true); }} onShowDisclaimer={() => setScreen('disclaimer')} />}
      {screen === 'game' && <GameScreen />}
    </>
  )
}

export default App

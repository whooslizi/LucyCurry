import { useState, useEffect } from 'react'
import DisclaimerScreen from './components/DisclaimerScreen'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'

function App() {
  const [screen, setScreen] = useState<'disclaimer' | 'start' | 'game'>('disclaimer');
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('lucyCurry_disclaimerAccepted')) {
      setScreen('start');
    }
    
    const onInteract = () => setInteracted(true);
    window.addEventListener('click', onInteract, { once: true });
    return () => window.removeEventListener('click', onInteract);
  }, []);

  const handleDisclaimerAccept = () => {
    localStorage.setItem('lucyCurry_disclaimerAccepted', 'true');
    setScreen('start');
  }

  return (
    <>
      {interacted && screen !== 'game' && <audio src="/sounds/yassss.mp3" loop autoPlay />}
      {screen === 'disclaimer' && <DisclaimerScreen onAccept={handleDisclaimerAccept} />}
      {screen === 'start' && <StartScreen onStart={() => setScreen('game')} onShowDisclaimer={() => setScreen('disclaimer')} />}
      {screen === 'game' && <GameScreen />}
    </>
  )
}

export default App

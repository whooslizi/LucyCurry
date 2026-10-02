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
  }, []);

  const handleDisclaimerAccept = () => {
    localStorage.setItem('lucyCurry_disclaimerAccepted', 'true');
    setScreen('start');
  }

  if (!interacted) {
    return (
      <div 
        onClick={() => setInteracted(true)}
        style={{ width: '100vw', height: '100dvh', background: '#3e2723', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column' }}
      >
        <h1 style={{ color: '#ffb300', fontSize: '36px', marginBottom: '20px', textAlign: 'center', animation: 'pulse 1.5s infinite' }}>
          CHẠM VÀO MÀN HÌNH ĐỂ BẮT ĐẦU
        </h1>
        <p style={{ color: '#fff', fontSize: '18px' }}>(Bật tiếng để có trải nghiệm tốt nhất)</p>
        <style>{`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {screen !== 'game' && <audio src="/sounds/yassss.mp3" loop autoPlay />}
      {screen === 'game' && <audio src="/sounds/bgm.wav" loop autoPlay />}
      {screen === 'game' && <audio src="/sounds/bgm.wav" loop autoPlay />}
      {screen === 'disclaimer' && <DisclaimerScreen onAccept={handleDisclaimerAccept} />}
      {screen === 'start' && <StartScreen onStart={() => setScreen('game')} onShowDisclaimer={() => setScreen('disclaimer')} />}
      {screen === 'game' && <GameScreen />}
    </>
  )
}

export default App

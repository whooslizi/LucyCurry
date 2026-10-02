import { useState, useEffect } from 'react';
import { useGameState } from '../game/gameState';

interface Props {
  onComplete: () => void;
}

export default function NightCutscene({ onComplete }: Props) {
  const { dispatch } = useGameState();
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    // Sequence timing
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2000);
      return () => clearTimeout(timer);
    } else if (step === 1) {
      const timer = setTimeout(() => setStep(2), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleWakeUp = () => {
    // Deduct money for robbery
    dispatch({ type: 'ADD_EXPENSE', payload: 150000 }); // Robbed 150k
    setStep(3);
  };

  if (step === 0 || step === 1) {
    return (
      <div className="portrait-container" style={{ background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* CCTV overlay */}
        <div style={{ position: 'absolute', top: 10, left: 10, color: '#fff', fontFamily: 'monospace', fontSize: '18px' }}>
          <span style={{ color: 'red', animation: 'pulse 1s infinite' }}>● REC</span>
          <br/>
          CAM 01 - 02:43 AM
        </div>
        
        {/* Scanline effect */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)', pointerEvents: 'none', zIndex: 10 }} />
        
        <div style={{ width: '100%', height: '50%', background: '#1a1a1a', borderBottom: '4px solid #333', position: 'relative' }}>
           {/* Safe/Counter */}
           <div style={{ position: 'absolute', bottom: 0, left: '20%', width: '60px', height: '40px', background: '#424242', border: '2px solid #757575' }} />
           
           {/* Thief sneaking in */}
           <img 
             src="/images/thief.svg" 
             alt="Thief" 
             style={{ 
               width: '80px', height: '80px', imageRendering: 'pixelated',
               position: 'absolute', bottom: 0,
               transition: 'all 3s linear',
               left: step === 0 ? '100%' : '30%',
               filter: 'grayscale(100%) brightness(0.8)'
             }} 
           />
        </div>
        <div style={{ padding: '20px', color: '#fff', textAlign: 'center', fontSize: '24px' }}>
          Đêm xuống, mọi người đều đã ngủ...
        </div>
        <style>{`
          @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
        `}</style>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="portrait-container" style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h1 style={{ color: '#fff', fontSize: '32px', marginBottom: '20px' }}>Trời đã sáng...</h1>
        <button onClick={handleWakeUp} style={{ padding: '15px 30px', fontSize: '24px', background: '#ffb300', color: '#000', border: '4px solid #fff' }}>TỈNH DẬY KÝ ĐƠN</button>
      </div>
    );
  }

  return (
    <div className="portrait-container" style={{ background: '#2d1815', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
       <h2 style={{ color: '#c62828', fontSize: '32px' }}>CÓ TRỘM!</h2>
       <img src="/images/police.svg" alt="Police" style={{ width: '120px', height: '120px', imageRendering: 'pixelated', margin: '20px 0' }} />
       <div style={{ background: '#e0c097', padding: '15px', border: '4px solid #5d4037', fontSize: '22px', color: '#000' }}>
         <p><strong>Cảnh sát:</strong> Chào bà chủ! Đêm qua có một tên trộm đã lẻn vào bẻ khóa két sắt của tiệm.</p>
         <p>Camera an ninh ghi lại hình ảnh nhưng hắn che mặt kín quá.</p>
         <p style={{ color: '#c62828', fontWeight: 'bold' }}>Kiểm tra két, bạn phát hiện bị mất 150.000 đ tiền mặt!</p>
       </div>
       <button onClick={onComplete} style={{ marginTop: '30px', padding: '15px 30px', fontSize: '24px', background: '#1565c0', color: '#fff', border: '4px solid #000' }}>
         CẢNH GIÁC HƠN
       </button>
    </div>
  );
}

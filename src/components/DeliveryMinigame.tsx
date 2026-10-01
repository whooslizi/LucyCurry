import { useState, useEffect } from 'react';

interface Props {
  onComplete: (success: boolean) => void;
  orderInfo: string;
}

export default function DeliveryMinigame({ onComplete, orderInfo }: Props) {
  const [lane, setLane] = useState(1);
  const [obstacles, setObstacles] = useState<{id: number, lane: number, y: number, type: string}[]>([]);
  const [distance, setDistance] = useState(0);
  const [crashes, setCrashes] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const hazardTypes = ['/images/pothole.svg', '/images/cone.svg', '/images/dog.svg'];

  useEffect(() => {
    if (gameOver) return;
    
    const gameLoop = setInterval(() => {
      setDistance(d => {
        if (d >= 100) {
          setGameOver(true);
          setTimeout(() => onComplete(crashes < 3), 2000);
          return d;
        }
        return d + 2; // Faster progress
      });

      setObstacles(obs => {
        let newObs = obs.map(o => ({ ...o, y: o.y + 15 })).filter(o => o.y < 120); // Move faster down
        
        const hit = newObs.find(o => o.y > 80 && o.y < 100 && o.lane === lane);
        if (hit) {
          setCrashes(c => c + 1);
          newObs = newObs.filter(o => o.id !== hit.id);
        }

        if (Math.random() < 0.2 && newObs.length < 4) { // Higher spawn rate
          newObs.push({ 
            id: Math.random(), 
            lane: Math.floor(Math.random() * 3), 
            y: -20,
            type: hazardTypes[Math.floor(Math.random() * hazardTypes.length)]
          });
        }
        return newObs;
      });
    }, 100);

    return () => clearInterval(gameLoop);
  }, [lane, gameOver, crashes, onComplete]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && lane > 0) setLane(l => l - 1);
    if (e.key === 'ArrowRight' && lane < 2) setLane(l => l + 1);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lane]);

  return (
    <div className="modal-backdrop" style={{ zIndex: 9999 }}>
      <div className="modal-content" style={{ width: '100%', height: '100%', background: '#212121', padding: '10px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: '#ffb300', textAlign: 'center', fontSize: '32px' }}>TỰ SHIP HÀNG!</h2>
        <p style={{ textAlign: 'center', color: '#fff', fontSize: '20px' }}>{orderInfo}</p>
        <p style={{ textAlign: 'center', color: '#4fc3f7', fontSize: '24px', margin: '5px 0' }}>Tiến độ: {distance}% | Va chạm: {crashes}/3</p>
        
        <div style={{ 
          position: 'relative', flex: 1, 
          backgroundImage: 'url(/images/road.svg)', 
          backgroundSize: '100% auto',
          backgroundPosition: `0 ${distance * 10}px`,
          margin: '0 auto', width: '100%', maxWidth: '300px', overflow: 'hidden', border: '10px solid #424242'
        }}>
          {obstacles.map(o => (
            <img key={o.id} src={o.type} alt="Hazard" style={{
              position: 'absolute',
              left: `${o.lane * 33 + 5}%`,
              top: `${o.y}%`,
              width: '60px', height: '60px',
              imageRendering: 'pixelated'
            }} />
          ))}

          <div style={{
            position: 'absolute',
            left: `${lane * 33 + 10}%`,
            bottom: '20px',
            width: '40px', height: '60px',
            background: 'var(--primary)',
            borderRadius: '10px',
            transition: 'left 0.1s'
          }}></div>
        </div>

        {gameOver && (
          <h2 style={{ color: crashes < 3 ? '#4caf50' : '#f44336', textAlign: 'center', fontSize: '36px' }}>
            {crashes < 3 ? 'GIAO THÀNH CÔNG!' : 'ĐỔ HẾT CÀ RI!'}
          </h2>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
           <button style={{ flex: 1, marginRight: '10px', fontSize: '24px', padding: '15px' }} onClick={() => lane > 0 && setLane(l => l-1)}>TRÁI</button>
           <button style={{ flex: 1, marginLeft: '10px', fontSize: '24px', padding: '15px' }} onClick={() => lane < 2 && setLane(l => l+1)}>PHẢI</button>
        </div>
      </div>
    </div>
  );
}

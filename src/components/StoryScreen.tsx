import { useState } from 'react';
import { useGameState } from '../game/gameState';

interface Props {
  onComplete: () => void;
}

export default function StoryScreen({ onComplete }: Props) {
  const { state, dispatch } = useGameState();
  const [step, setStep] = useState(0);
  const [nameInput, setNameInput] = useState('');

  const handleNext = () => {
    if (step === 2) {
      if (!nameInput.trim()) return;
      dispatch({ type: 'SET_PLAYER_NAME', payload: nameInput.trim() });
      setStep(3);
    } else if (step === 3) {
      onComplete();
    } else {
      setStep(s => s + 1);
    }
  };

  const storyContent = [
    {
      title: 'Truyền thuyết',
      text: 'Giữa lòng phố thị xô bồ, tương truyền có một tiệm cà ri nhỏ bé mang hương vị có thể thắp sáng những ngày u ám nhất...'
    },
    {
      title: 'Lộc Lucy',
      text: 'Tôi là Lộc Lucy, chuyên món cà ri. Suốt nhiều năm qua, tôi đã dồn bao tâm huyết vào từng nồi nước dùng.'
    },
    {
      title: 'Lộc Lucy',
      text: 'Nhưng nay tôi cần được nghỉ ngơi. Căn bếp này... tôi sẽ giao lại cho bạn. Kẻ kế thừa tiệm cà ri, bạn tên là gì?'
    },
    {
      title: 'Lộc Lucy',
      text: `Vậy, ${state.playerName || nameInput}. Hãy tự viết tiếp câu chuyện của mình nhé!`
    }
  ];

  const current = storyContent[step];

  return (
    <div className="portrait-container" style={{ background: '#2d1815', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ flex: 1, background: '#1a0f0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {step > 0 && (
          <img src="/images/lucy_8bit.svg" alt="Lucy" style={{ width: '180px', height: '180px', imageRendering: 'pixelated' }} />
        )}
      </div>

      <div style={{ padding: '20px', background: '#2d1815', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '90%', background: '#e0c097', border: '6px solid #8d6e63', padding: '15px', display: 'flex', minHeight: '180px' }}>
          {step > 0 && (
            <div style={{ width: '80px', height: '80px', border: '4px solid #5d4037', background: '#f5e6cc', marginRight: '15px', flexShrink: 0 }}>
              <img src="/images/lucy_8bit.svg" alt="Face" style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }} />
            </div>
          )}
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ color: '#d84315', fontWeight: 'bold', fontSize: '24px' }}>{current.title}</span>
              <p style={{ color: '#000', margin: '10px 0', fontSize: '22px', lineHeight: '1.4' }}>
                {current.text}
              </p>
            </div>
            
            {step === 2 && (
              <input 
                type="text" 
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                style={{ background: '#fff', border: '2px solid #5d4037', padding: '10px', fontSize: '24px', fontFamily: 'VT323', marginTop: '10px', width: '90%' }}
                placeholder="NHẬP TÊN..."
                autoFocus
              />
            )}

            <div style={{ alignSelf: 'flex-end', cursor: 'pointer', color: '#d84315', fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }} onClick={handleNext}>
              {step === 2 ? '► XÁC NHẬN' : step === 3 ? '► NHẬN TIỆM' : '► TIẾP TỤC'}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

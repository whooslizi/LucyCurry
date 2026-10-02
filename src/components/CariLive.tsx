import { useEffect, useState, useRef } from 'react';
import { useGameState } from '../game/gameState';

const POSITIVE_MESSAGES = [
  "Quán {name} bá cháy bọ chét!",
  "Xin vía bán rẻ như chủ tiệm",
  "10 điểm không có nhưng",
  "Ủng hộ tiệm dài dài",
  "Ngon bổ rẻ là đây",
];

const NEGATIVE_MESSAGES = [
  "Cà ri dát vàng à?",
  "Khứa {name} lùa gà!",
  "Bán mắc dị cha nội?",
  "Tẩy chay tiệm {name}!!!",
  "Bán đắt thế mua đồ ăn liền cho lẹ",
  "Gọi quản lý thị trường đi anh em",
];

const NEUTRAL_MESSAGES = [
  "Lên đơn lẹ đi {name} ơi",
  "Hôm nay tiệm đông quá",
  "Mùi cà ri thơm quá",
  "Chờ nửa tiếng rồi chưa có đồ ăn",
];

interface ChatMessage {
  id: number;
  user: string;
  text: string;
  type: 'pos' | 'neg' | 'neu';
}

export default function CariLive() {
  const { state } = useGameState();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  // Evaluate current pricing strategy
  const getPricingMood = () => {
    let totalNormal = 0;
    let totalCurrent = 0;
    
    // Average baseline prices
    const baseline: Record<string, number> = {
      'Cơm cà ri gà': 35000,
      'Cơm cà ri heo': 40000,
      'Cơm cà ri bò': 45000,
      'Cơm cà ri tôm': 55000,
    };

    let count = 0;
    for (const [dish, price] of Object.entries(state.menuPrices)) {
      if (baseline[dish]) {
        totalNormal += baseline[dish];
        totalCurrent += price;
        count++;
      }
    }

    if (count === 0) return 'normal';
    
    const ratio = totalCurrent / totalNormal;
    if (ratio > 1.5) return 'expensive';
    if (ratio < 0.8) return 'cheap';
    return 'normal';
  };

  useEffect(() => {
    const mood = getPricingMood();
    
    const generateMessage = () => {
      let pool = NEUTRAL_MESSAGES;
      let type: 'pos' | 'neg' | 'neu' = 'neu';
      
      const rand = Math.random();
      if (mood === 'expensive') {
        if (rand < 0.7) { pool = NEGATIVE_MESSAGES; type = 'neg'; }
        else { pool = NEUTRAL_MESSAGES; type = 'neu'; }
      } else if (mood === 'cheap') {
        if (rand < 0.7) { pool = POSITIVE_MESSAGES; type = 'pos'; }
        else { pool = NEUTRAL_MESSAGES; type = 'neu'; }
      } else {
        if (rand < 0.2) { pool = POSITIVE_MESSAGES; type = 'pos'; }
        else if (rand < 0.4) { pool = NEGATIVE_MESSAGES; type = 'neg'; }
      }

      const rawMsg = pool[Math.floor(Math.random() * pool.length)];
      const text = rawMsg.replace('{name}', state.playerName || 'chủ quán');
      const user = 'user' + Math.floor(Math.random() * 9999);

      setMessages(prev => {
        const next = [...prev, { id: Date.now(), user, text, type }];
        if (next.length > 30) return next.slice(next.length - 30);
        return next;
      });
    };

    // Chat speed depends on pricing mood (people complain more when expensive, or praise when cheap)
    const intervalTime = mood === 'normal' ? 3500 : 2000;
    
    const timer = setInterval(generateMessage, intervalTime);
    return () => clearInterval(timer);
  }, [state.menuPrices, state.playerName]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{
      width: '180px',
      height: '100%',
      background: '#212121',
      borderLeft: '4px solid #000',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ background: '#d32f2f', color: '#fff', padding: '5px', textAlign: 'center', fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
        <span style={{ color: '#fff' }}>🔴</span> LIVE
      </div>
      <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '5px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ fontSize: '14px', lineHeight: '1.2' }}>
            <span style={{ color: '#9e9e9e', fontWeight: 'bold' }}>{msg.user}: </span>
            <span style={{ 
              color: msg.type === 'neg' ? '#ff5252' : msg.type === 'pos' ? '#69f0ae' : '#fff' 
            }}>{msg.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

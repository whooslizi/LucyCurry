
import { useGameState } from '../game/gameState';

interface Props {
  onStartDay: () => void;
}

export default function PricingMenu({ onStartDay }: Props) {
  const { state, dispatch } = useGameState();

  const handlePriceChange = (dish: string, amount: number) => {
    const currentPrice = state.menuPrices[dish] || 40000;
    const newPrice = Math.max(10000, Math.min(250000, currentPrice + amount));
    dispatch({ type: 'SET_MENU_PRICE', payload: { item: dish, price: newPrice } });
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="portrait-container" style={{ background: '#3e2723', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h2 style={{ color: '#ffb300', fontSize: '32px', textAlign: 'center', marginBottom: '20px', borderBottom: '4px solid #ffb300', paddingBottom: '10px' }}>
        BẢNG GIÁ HÔM NAY
      </h2>
      
      <p style={{ color: '#fff', fontSize: '20px', textAlign: 'center', marginBottom: '20px' }}>
        Chỉnh giá bán để tối ưu lợi nhuận. Bán đắt thì ít khách, bán rẻ thì đông. Chú ý bão mạng trên CàriLive!
      </p>

      <div style={{ width: '100%', flex: 1, overflowY: 'auto' }}>
        {state.unlockedRecipes.map(recipe => (
          <div key={recipe} style={{ background: '#e0c097', border: '4px solid #5d4037', padding: '15px', marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '10px' }}>
              {recipe}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button 
                onClick={() => handlePriceChange(recipe, -5000)}
                style={{ background: '#d32f2f', color: '#fff', padding: '10px 15px', border: '2px solid #000' }}
              >
                - 5k
              </button>
              
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2e7d32' }}>
                {formatMoney(state.menuPrices[recipe] || 45000)}
              </div>
              
              <button 
                onClick={() => handlePriceChange(recipe, 5000)}
                style={{ background: '#4caf50', color: '#fff', padding: '10px 15px', border: '2px solid #000' }}
              >
                + 5k
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={onStartDay} style={{ width: '100%', background: '#d84315', color: '#fff', padding: '20px', fontSize: '28px', border: '4px solid #000', marginTop: '20px' }}>
        MỞ CỬA TIỆM
      </button>
    </div>
  );
}

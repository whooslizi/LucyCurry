import { useState } from 'react';
import RecipeModal from './RecipeModal';

interface Props {
  onStart: () => void;
  onShowDisclaimer: () => void;
}

export default function StartScreen({ onStart, onShowDisclaimer }: Props) {
  const [showRecipe, setShowRecipe] = useState(false);

  const resetProgress = () => {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ tiến trình không?')) {
      localStorage.removeItem('lucyCurry_disclaimerAccepted');
      localStorage.removeItem('lucy_save_v1');
      window.location.reload();
    }
  };

  return (
    <div className="portrait-container" style={{ alignItems: 'center', justifyContent: 'center', background: '#3e2723' }}>
      {showRecipe && <RecipeModal onClose={() => setShowRecipe(false)} />}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#ffb300', textShadow: '2px 2px 0 #000', fontSize: '48px', margin: '0' }}>TIỆM CÀRI</h1>
        <h1 style={{ color: '#ffb300', textShadow: '2px 2px 0 #000', fontSize: '48px', margin: '0' }}>CÔ LỘC LUCY</h1>
        <p style={{ color: '#fff', fontSize: '20px', marginTop: '10px' }}>SINH TỒN BÁN HÀNG</p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <button className="start-btn btn-green" onClick={onStart}>BẮT ĐẦU GAME</button>
        <button className="start-btn btn-yellow" onClick={() => setShowRecipe(true)}>SỔ TAY CÔNG THỨC</button>
        <button className="start-btn btn-red" onClick={resetProgress}>XÓA TIẾN TRÌNH</button>
        <button className="start-btn btn-grey" onClick={onShowDisclaimer}>ĐỌC ĐIỀU LUẬT</button>
      </div>

      <div style={{ position: 'absolute', bottom: '20px' }}>
        <button style={{ background: '#5d4037', border: '2px solid #000', fontSize: '16px', borderRadius: '20px' }}>TẮT ÂM</button>
      </div>
    </div>
  )
}

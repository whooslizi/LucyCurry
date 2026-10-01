import { useGameState } from '../game/gameState';

export default function EndingScreen() {
  const { state } = useGameState();

  const resetProgress = () => {
    localStorage.removeItem('lucy_save_v1');
    window.location.reload();
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const money = state.money;
  let endingType = '';
  let endingDesc = '';
  let color = '';

  if (money < 100000) {
    endingType = 'KẾT CỤC XẤU: PHÁ SẢN';
    endingDesc = 'Bạn không có khiếu kinh doanh rồi... Cô Lộc đành phải đứng ra gánh khoản nợ thay cho bạn. Tiệm bị đóng cửa và bạn phải về quê trồng rau.';
    color = '#c62828';
  } else if (money > 2000000) {
    endingType = 'KẾT CỤC HOÀN MỸ: BÀ TRÙM CÀ RI';
    endingDesc = 'Doanh thu bùng nổ! Bạn chính thức mua đứt bản quyền thương hiệu, mở chuỗi nhượng quyền toàn quốc và chuẩn bị lên Shark Tank gọi vốn!';
    color = '#d84315';
  } else {
    endingType = 'KẾT CỤC BÌNH THƯỜNG: BÀI HỌC KINH DOANH';
    endingDesc = 'Tuy không quá giàu, nhưng bạn đã vượt qua thử thách 7 ngày khắc nghiệt, học được cách kinh doanh và trả lại tiệm nguyên vẹn cho cô Lộc.';
    color = '#2e7d32';
  }

  return (
    <div className="portrait-container" style={{ alignItems: 'center', justifyContent: 'center', background: '#3e2723', padding: '20px' }}>
      
      <div style={{ background: '#e0c097', border: '6px solid #8d6e63', padding: '20px', textAlign: 'center', width: '100%', maxWidth: '400px', boxShadow: '4px 4px 0 rgba(0,0,0,0.5)' }}>
        
        <h1 style={{ color: '#ffb300', textShadow: '2px 2px 0 #000', fontSize: '36px', margin: '0 0 20px 0', borderBottom: '4px dashed #8d6e63', paddingBottom: '10px' }}>
          TỔNG KẾT 7 NGÀY
        </h1>

        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '10px' }}>
          Tài sản cuối cùng:
        </div>
        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#d84315', marginBottom: '20px' }}>
          {formatMoney(money)}
        </div>

        <div style={{ background: '#fff', border: `4px solid ${color}`, padding: '15px', marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '26px', color: color }}>{endingType}</h2>
          <p style={{ fontSize: '22px', color: '#3e2723' }}>{endingDesc}</p>
        </div>

        <div style={{ background: '#3e2723', color: '#fff', padding: '15px', border: '2px solid #000', marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '24px', color: '#ffb300' }}>CREDITS</h3>
          <p style={{ fontSize: '20px', margin: '5px 0' }}>Dev: @whooslizi</p>
          <p style={{ fontSize: '20px', margin: '5px 0' }}>Xin kính gửi tặng cô Lộc Lucy - Nguồn cảm hứng bất tận của dự án này!</p>
          <p style={{ fontSize: '20px', margin: '5px 0', color: '#4caf50', fontWeight: 'bold' }}>Cảm ơn bạn đã trải nghiệm!</p>
        </div>

        <button onClick={resetProgress} style={{ width: '100%', background: '#d32f2f', padding: '15px', fontSize: '24px', border: '4px solid #000', fontWeight: 'bold', color: '#fff', cursor: 'pointer' }}>
          CHƠI LẠI TỪ ĐẦU
        </button>
      </div>

    </div>
  )
}

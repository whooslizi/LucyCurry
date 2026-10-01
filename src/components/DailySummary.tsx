import { useState } from 'react';
import { useGameState } from '../game/gameState';

interface Props {
  onNextDay: () => void;
}

export default function DailySummary({ onNextDay }: Props) {
  const { state, dispatch } = useGameState();
  const [taxPaid, setTaxPaid] = useState(false);
  const [taxEventMessage, setTaxEventMessage] = useState('');

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Tax calculation: 5% of revenue if revenue > 100k
  const taxAmount = state.revenueToday > 100000 ? Math.floor(state.revenueToday * 0.05) : 0;

  const handlePayTax = () => {
    dispatch({ type: 'PAY_TAX', payload: taxAmount });
    setTaxPaid(true);
    setTaxEventMessage('Cảm ơn bạn đã đóng thuế đầy đủ! Cơ quan thuế rất hài lòng.');
  };

  const handleEvadeTax = () => {
    if (Math.random() < 0.5) { // 50% chance to get caught
      const fine = taxAmount * 3;
      dispatch({ type: 'PAY_TAX', payload: fine }); // It deducts money in GameState
      setTaxEventMessage(`🚨 BỊ BẮT! Thanh tra phát hiện bạn trốn thuế ${formatMoney(taxAmount)}. Bị phạt gấp 3 lần: Tịch thu ${formatMoney(fine)}!`);
    } else {
      setTaxEventMessage(`😎 Trót lọt! Bạn đã trốn thuế thành công và giữ lại được ${formatMoney(taxAmount)}.`);
    }
    setTaxPaid(true);
  };

  const handleNext = () => {
    dispatch({ type: 'NEXT_DAY' });
    onNextDay();
  };

  return (
    <div className="portrait-container" style={{ background: '#2d1815', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      
      <div style={{ width: '100%', background: '#e0c097', border: '6px solid #8d6e63', padding: '20px', color: '#3e2723' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', color: '#b71c1c', borderBottom: '4px solid #b71c1c', paddingBottom: '10px' }}>TỔNG KẾT NGÀY {state.day}</h2>
        
        <div style={{ fontSize: '24px', margin: '20px 0', lineHeight: '1.8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Đơn hoàn thành:</span>
            <strong>{state.completedOrdersToday} đơn</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Doanh thu:</span>
            <strong style={{ color: '#2e7d32' }}>+ {formatMoney(state.revenueToday)}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Chi phí (Vốn, Ship, Phạt):</span>
            <strong style={{ color: '#c62828' }}>- {formatMoney(state.expensesToday)}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px dashed #8d6e63', paddingTop: '10px', marginTop: '10px' }}>
            <span>Lợi nhuận:</span>
            <strong style={{ color: state.profitToday >= 0 ? '#2e7d32' : '#c62828' }}>
              {formatMoney(state.profitToday)}
            </strong>
          </div>
        </div>

        {/* NGHĨA VỤ THUẾ */}
        <div style={{ background: '#f5e6cc', border: '4px solid #5d4037', padding: '15px', marginTop: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#d84315', fontSize: '28px', textAlign: 'center' }}>NGHĨA VỤ THUẾ</h3>
          {!taxPaid ? (
            <>
              {taxAmount > 0 ? (
                <>
                  <p style={{ fontSize: '20px', textAlign: 'center' }}>Doanh thu trên 100k, bạn phải nộp 5% thuế thu nhập:</p>
                  <div style={{ fontSize: '32px', textAlign: 'center', color: '#c62828', fontWeight: 'bold', margin: '15px 0' }}>
                    {formatMoney(taxAmount)}
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handlePayTax} style={{ flex: 1, background: '#4caf50', fontSize: '20px', padding: '15px', fontWeight: 'bold', border: '2px solid #000' }}>ĐÓNG THUẾ</button>
                    <button onClick={handleEvadeTax} style={{ flex: 1, background: '#000', color: '#fff', fontSize: '20px', padding: '15px', fontWeight: 'bold', border: '2px solid #d32f2f' }}>TRỐN THUẾ</button>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '22px', textAlign: 'center', color: '#2e7d32', fontWeight: 'bold' }}>Hôm nay buôn bán ế ẩm, được MIỄN THUẾ!</p>
                  <button onClick={() => setTaxPaid(true)} style={{ width: '100%', background: '#4caf50', fontSize: '24px', padding: '15px', fontWeight: 'bold', marginTop: '10px', border: '2px solid #000' }}>TIẾP TỤC</button>
                </>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '22px', fontWeight: 'bold', color: taxEventMessage.includes('BỊ BẮT') ? '#c62828' : '#2e7d32' }}>
                {taxEventMessage}
              </p>
              <div style={{ fontSize: '24px', margin: '20px 0' }}>
                Số dư hiện tại: <strong style={{ color: '#d84315' }}>{formatMoney(state.money)}</strong>
              </div>
              <button onClick={handleNext} style={{ width: '100%', background: '#ff9800', fontSize: '28px', padding: '20px', fontWeight: 'bold', border: '4px solid #5d4037' }}>
                SANG NGÀY TIẾP THEO
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

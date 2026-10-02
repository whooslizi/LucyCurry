interface Props {
  onBack: () => void;
}

export default function OutsideView({ onBack }: Props) {
  return (
    <div className="portrait-container" style={{ background: '#81d4fa', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Top Header */}
      <div style={{ background: '#3e2723', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #000' }}>
        <h2 style={{ color: '#ffb300', margin: 0, fontSize: '24px' }}>PHỐ CÀ RI</h2>
        <button onClick={onBack} style={{ background: '#d32f2f', color: '#fff', border: '2px solid #000', padding: '5px 10px' }}>TRỞ VỀ TIỆM</button>
      </div>

      {/* Street Graphic */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#81d4fa' }}>
        <img src="/images/street.svg" alt="Curry Street" style={{ width: '100%', imageRendering: 'pixelated' }} />
      </div>

      {/* Info Panel */}
      <div style={{ background: '#2d1815', padding: '20px', borderTop: '4px solid #000', color: '#fff' }}>
        <h3 style={{ color: '#ffb300', fontSize: '24px', margin: '0 0 10px 0' }}>Bất động sản & Chi nhánh</h3>
        <p style={{ fontSize: '18px', margin: '10px 0', lineHeight: '1.4' }}>
          Đây là dãy phố sầm uất. Bạn có thể nhìn thấy tiệm cà ri của mình đang bốc khói nghi ngút. Các mặt bằng bên cạnh đang cho thuê...
        </p>
        <p style={{ fontSize: '18px', color: '#9e9e9e' }}>
          (Tính năng Mua Nhượng Quyền sẽ ra mắt trong bản cập nhật tới!)
        </p>
      </div>
      
    </div>
  );
}

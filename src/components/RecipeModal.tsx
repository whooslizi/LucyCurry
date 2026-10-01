interface Props {
  onClose: () => void;
}

export default function RecipeModal({ onClose }: Props) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <img src="/images/notebook.svg" alt="Sổ tay" style={{ width: '30px' }} />
          <h2 style={{ color: 'var(--accent)', margin: 0 }}>SỔ TAY CÔNG THỨC</h2>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#fff', borderBottom: '2px solid #795548', paddingBottom: '5px', margin: '5px 0' }}>
            <img src="/images/pot_curry.svg" alt="Curry" style={{ width: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
            Cơm cà ri gà
          </h4>
          <p style={{ fontSize: '14px', color: '#ccc', margin: '2px 0' }}>Nấu nồi: Gà, Khoai tây, Cà rốt</p>
          <p style={{ fontSize: '14px', color: '#ccc', margin: '2px 0' }}>Ra tô: Thêm Cơm</p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#fff', borderBottom: '2px solid #795548', paddingBottom: '5px', margin: '5px 0' }}>
            <img src="/images/pot_curry.svg" alt="Curry" style={{ width: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
            Cơm cà ri bò
          </h4>
          <p style={{ fontSize: '14px', color: '#ccc', margin: '2px 0' }}>Nấu nồi: Bò, Khoai tây, Cà rốt</p>
          <p style={{ fontSize: '14px', color: '#ccc', margin: '2px 0' }}>Ra tô: Thêm Cơm</p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#fff', borderBottom: '2px solid #795548', paddingBottom: '5px', margin: '5px 0' }}>
            <img src="/images/pot_curry.svg" alt="Curry" style={{ width: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
            Cơm cà ri heo chiên xù
          </h4>
          <p style={{ fontSize: '14px', color: '#ccc', margin: '2px 0' }}>Nấu nồi: Khoai tây, Cà rốt (Sốt nền)</p>
          <p style={{ fontSize: '14px', color: '#ccc', margin: '2px 0' }}>Ra tô: Thêm Cơm, Heo chiên xù</p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#fff', borderBottom: '2px solid #795548', paddingBottom: '5px', margin: '5px 0' }}>
            <img src="/images/pot_udon.svg" alt="Udon" style={{ width: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
            Udon cà ri tôm chiên
          </h4>
          <p style={{ fontSize: '14px', color: '#ccc', margin: '2px 0' }}>Nấu nồi: Khoai tây, Cà rốt</p>
          <p style={{ fontSize: '14px', color: '#ccc', margin: '2px 0' }}>Ra tô: Thêm Udon, Tôm chiên xù</p>
        </div>

        <button onClick={onClose} style={{ width: '100%', marginTop: '10px' }}>ĐÓNG SỔ TAY</button>
      </div>
    </div>
  );
}

import { useState } from 'react';

interface Props {
  onClose: () => void;
}

export default function TutorialScreen({ onClose }: Props) {
  const [page, setPage] = useState(1);
  const totalPages = 4;

  const handleNext = () => {
    if (page < totalPages) setPage(p => p + 1);
  };
  const handlePrev = () => {
    if (page > 1) setPage(p => p - 1);
  };

  return (
    <div className="modal-backdrop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
      
      <div style={{ 
        width: '90%', 
        maxWidth: '440px',
        height: '80%', 
        background: '#d7ccc8', 
        border: '6px solid #5d4037', 
        boxShadow: 'inset 0 0 0 4px #a1887f, 4px 4px 0px rgba(0,0,0,0.5)',
        display: 'flex', 
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}>
        
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          <h2 style={{ textAlign: 'center', color: '#b71c1c', marginBottom: '15px', fontSize: '32px', borderBottom: '4px solid #b71c1c', paddingBottom: '10px' }}>
            HƯỚNG DẪN CHƠI
          </h2>
          
                    <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px', color: '#3e2723', fontFamily: 'VT323' }}>
            {page === 1 && (
              <div>
                <h3 style={{ fontSize: '26px', marginBottom: '10px', fontWeight: 'bold' }}>1. Mở Cửa & Chốt Đơn</h3>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Bắt đầu ngày mới bằng nút <strong>MỞ CỬA BÁN</strong>. Khách sẽ nhắn tin liên tục qua <strong>CàriChat</strong>.
                </p>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Bạn cần ấn <strong>BÁO GIÁ</strong> trước, chờ khách đồng ý chuyển khoản cái "TING TING" thì ấn NHẬN ĐƠN NẤU.
                </p>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Hết nguyên liệu? Nhấn vào bảng nguyên liệu dưới cùng để mua (bấm trực tiếp hoặc bấm vào bảng tuỳ chọn sỉ x5, x10).
                </p>
              </div>
            )}
            {page === 2 && (
              <div>
                <h3 style={{ fontSize: '26px', marginBottom: '10px', fontWeight: 'bold' }}>2. Nấu Ăn</h3>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Kéo xuống dưới cùng, chọn số lượng từng món cần nấu bằng nút <strong>+</strong> / <strong>-</strong>, sau đó ấn <strong>BẬT BẾP NẤU MÓN ĐÃ CHỌN</strong>.
                </p>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Bếp sẽ nấu chung 1 mẻ. Nấu xong, món ăn sẽ nằm ở kho bếp (số lượng có sẵn màu xanh lá).
                </p>
              </div>
            )}
            {page === 3 && (
              <div>
                <h3 style={{ fontSize: '26px', marginBottom: '10px', fontWeight: 'bold', color: '#d32f2f' }}>3. CHÚ Ý ĐÓNG GÓI!</h3>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px', fontWeight: 'bold', color: '#d32f2f' }}>
                  Sau khi nấu xong, nhấn vào Tờ Bill Khách Hàng lơ lửng trên bếp để vào màn hình đóng gói.
                </p>
                <p style={{ fontSize: '24px', lineHeight: '1.4', marginBottom: '15px', fontWeight: 'bold', color: '#000', border: '3px dashed #d32f2f', padding: '10px', background: '#fff' }}>
                  Ở màn Đóng Gói: Bạn PHẢI BẤM TỪNG MÓN ở cột "Đã nấu xong" bên phải, để chuyển nó sang cột "TRONG HỘP" bên trái cho khớp với Yêu cầu.
                </p>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px', color: '#d32f2f' }}>
                  Nhiều người không đọc cái này, hộp trống rỗng mà vẫn bấm "CHỐT HỘP & GIAO", kết quả bị chửi sấp mặt và đền 50k đó nha!!!! Đóng đủ đồ mới chốt nhé!
                </p>
              </div>
            )}
            {page === 4 && (
              <div>
                <h3 style={{ fontSize: '26px', marginBottom: '10px', fontWeight: 'bold' }}>4. Lò Vi Sóng & Sự Cố</h3>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Nấu xong mà bom đói không giao, đồ ăn sẽ bị <strong>nguội</strong>! Khi đó phải nhấp vào LÒ VI SÓNG ở bếp (tối đa 2 món/lần quay) tốn 10k tiền điện.
                </p>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Thỉnh thoảng có khách bom hàng, xế lừa đảo, hãy cẩn thận chọn "Tin Tưởng" hay "Kiểm Tra" nhé. Chúc bạn một ngày buôn bán đắt khách!
                </p>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', color: '#5d4037', marginTop: '15px', fontSize: '24px', fontWeight: 'bold' }}>
            - Trang {page} / {totalPages} -
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
            <button onClick={handlePrev} disabled={page === 1} style={{ background: page === 1 ? '#a1887f' : '#795548', padding: '15px', fontSize: '24px', fontWeight: 'bold', color: '#fff', border: '4px solid #3e2723' }}>
              LÙI LẠI
            </button>
            {page < totalPages ? (
              <button onClick={handleNext} style={{ background: '#d84315', padding: '15px', fontSize: '24px', fontWeight: 'bold', color: '#fff', border: '4px solid #3e2723' }}>
                TRANG TIẾP
              </button>
            ) : (
              <button onClick={onClose} style={{ background: '#4caf50', padding: '15px', fontSize: '24px', fontWeight: 'bold', color: '#fff', border: '4px solid #3e2723', animation: 'pulse 1.5s infinite' }}>
                ĐÃ HIỂU LUẬT CHƠI
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

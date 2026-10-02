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
    <div className="portrait-container" style={{ background: '#2d1815', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
      
      <div style={{ 
        width: '90%', 
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
                  Bắt đầu ngày mới bằng nút <strong>MỞ CỬA BÁN</strong>. Khách sẽ nhắn tin qua <strong>CàriChat</strong>.
                </p>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Bạn cần ấn <strong>BÁO GIÁ</strong>, nếu khách đồng ý chuyển khoản (kêu TING TING), hãy ấn Nhận Đơn để bắt đầu nấu. Nhớ mua nguyên liệu trong Kho nhé (có thể ấn nút x5, x10 để mua sỉ).
                </p>
              </div>
            )}
            {page === 2 && (
              <div>
                <h3 style={{ fontSize: '26px', marginBottom: '10px', fontWeight: 'bold' }}>2. Nấu Ăn</h3>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Bạn điều chỉnh số lượng món bằng nút <strong>+</strong> / <strong>-</strong> ở phía dưới, sau đó ấn <strong>BẬT BẾP NẤU</strong>.
                </p>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Sau khi nấu xong, món ăn sẽ nằm ở trạng thái <em>Sẵn sàng</em>. Lấy các tờ Note (Bill) ở trên cùng để bắt đầu đóng gói nha!
                </p>
              </div>
            )}
            {page === 3 && (
              <div>
                <h3 style={{ fontSize: '26px', marginBottom: '10px', fontWeight: 'bold', color: '#d32f2f' }}>3. CHÚ Ý ĐÓNG GÓI!</h3>
                <p style={{ fontSize: '24px', lineHeight: '1.4', marginBottom: '15px', fontWeight: 'bold', color: '#d32f2f' }}>
                  Khi đóng gói cho khách, phải BẤM VÀO MÓN ở cột "Đã nấu xong" để chuyển qua cột "Trong hộp".
                </p>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Nhiều người không biết cứ ấn "Chốt hộp" luôn trong khi hộp trống rỗng, thế là bị chửi sấp mặt và đền 50k đó nha!!!! Đóng đủ đồ mới chốt nhé!
                </p>
              </div>
            )}
            {page === 4 && (
              <div>
                <h3 style={{ fontSize: '26px', marginBottom: '10px', fontWeight: 'bold' }}>4. Lò Vi Sóng & Sự Cố</h3>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Đồ ăn nấu xong để lâu sẽ bị <strong>nguội</strong>! Khi đó phải cho lại vào lò vi sóng (tối đa 2 món/lần) và tốn thêm 10k tiền điện yasss.
                </p>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Ngoài ra thỉnh thoảng sẽ có người xưng là Lộc Lương, hay shipper khả nghi... hãy cẩn trọng quyết định để không mất tiền oan.
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

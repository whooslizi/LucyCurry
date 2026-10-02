import { useState } from 'react';

interface Props {
  onAccept: () => void;
}

export default function DisclaimerScreen({ onAccept }: Props) {
  const [page, setPage] = useState(1);
  const totalPages = 3;

  const handleNext = () => {
    if (page < totalPages) setPage(p => p + 1);
  };
  const handlePrev = () => {
    if (page > 1) setPage(p => p - 1);
  };

  return (
    <div className="portrait-container" style={{ background: '#2d1815', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Minecraft-style book layout */}
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
        
        {/* Inner Paper Area */}
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          <h2 style={{ textAlign: 'center', color: '#b71c1c', marginBottom: '15px', fontSize: '32px', borderBottom: '4px solid #b71c1c', paddingBottom: '10px' }}>
            MỘT VÀI ĐIỀU TRƯỚC KHI CHƠI
          </h2>
          
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px', color: '#3e2723', fontFamily: 'VT323' }}>
            {page === 1 && (
              <div>
                <h3 style={{ fontSize: '26px', marginBottom: '10px', fontWeight: 'bold' }}>1. Về trò chơi</h3>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  “Tiệm Càri của cô Lộc Lucy” là một trò chơi lấy Cô Lộc Lucy làm nhân vật trung tâm. Người chơi sẽ vào vai bà chủ tiệm cà ri và trải nghiệm một ngày làm việc với những công việc quen thuộc như chuẩn bị món, nấu cà ri, bán hàng, đóng gói, giao đơn và quản lý cửa hàng.
                </p>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Nội dung trò chơi được lấy cảm hứng từ những công việc và nội dung mà Cô Lộc Lucy chia sẻ công khai trên mạng xã hội. Trò chơi không khai thác đời tư, thông tin cá nhân hoặc những nội dung riêng tư của cô.
                </p>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Đây là dự án do người hâm mộ thực hiện, nhằm mục đích sáng tạo và nghiên cứu. Không đại diện cho Cô Lộc Lucy, và đây không phải là sản phẩm chính thức do cô Lộc Lucy phát hành.
                </p>
                <p style={{ fontSize: '22px', lineHeight: '1.4' }}>
                  Nếu bạn yêu thích cô Lộc Lucy và muốn ủng hộ, bạn có thể đặt cà ri trực tiếp qua Zalo của cô.
                </p>
                <div style={{ background: '#fff', border: '3px dashed #d84315', padding: '10px', marginTop: '15px' }}>
                  <h4 style={{ color: '#d84315', margin: '0 0 5px 0', fontSize: '24px' }}>Về quyền riêng tư:</h4>
                  <p style={{ fontSize: '20px', margin: 0, color: '#000' }}>
                    Trò chơi này hoàn toàn chạy trên trình duyệt của bạn. Mọi tiến trình (bao gồm tên, tiền bạc và tài sản trong game) chỉ được lưu trữ cục bộ (Local Storage) trên thiết bị. Chúng mình <strong>không thu thập, không lưu trữ hay gửi bất kỳ dữ liệu cá nhân nào</strong> của bạn lên máy chủ.
                  </p>
                </div>
                <div style={{ background: '#f5e6cc', border: '3px dashed #5d4037', padding: '10px', marginTop: '15px' }}>
                  <h4 style={{ color: '#5d4037', margin: '0 0 5px 0', fontSize: '24px' }}>Về hình ảnh trong game:</h4>
                  <p style={{ fontSize: '20px', margin: 0, color: '#000' }}>
                    Xin lỗi bạn thật nhiều nếu đồ họa trong game trông có vẻ "hơi phèn" hay "xấu quắc" . Vì toàn bộ hình ảnh 8-bit trong này đều do lập trình viên tự gõ bằng code (Programmer Art) thay vì họa sĩ vẽ tay. Mong bạn thông cảm và tập trung tận hưởng cốt truyện nha!
                  </p>
                </div>
              </div>
            )}
            {page === 2 && (
              <div>
                <h3 style={{ fontSize: '26px', marginBottom: '10px', fontWeight: 'bold' }}>2. Về dự án nghiên cứu</h3>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Hiện tại mình đang thực hiện một dự án nghiên cứu với chủ đề <strong>“CẢM NHẬN NGƯỜI CHƠI: TRANH AI VS. NGHỆ THUẬT LẬP TRÌNH (PYTHON ART) CHO GIAO DIỆN GAME”</strong>.
                </p>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Vì vậy, việc trò chơi có sử dụng một số hình ảnh được tạo bằng AI là một phần có chủ đích trong quá trình nghiên cứu. Mình xin lỗi nếu điều này khiến bạn cảm thấy không thoải mái.
                </p>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Nếu bạn đã chơi game, bạn có thể dành chút thời gian điền vào bảng khảo sát:
                </p>
                <a href="https://forms.gle/DBMJd6wcKX65By11A" target="_blank" rel="noreferrer" style={{ color: '#d84315', wordBreak: 'break-all', fontSize: '22px', textDecoration: 'underline' }}>
                  https://forms.gle/DBMJd6wcKX65By11A
                </a>
              </div>
            )}
            {page === 3 && (
              <div>
                <h3 style={{ fontSize: '26px', marginBottom: '10px', fontWeight: 'bold' }}>3. Mã nguồn mở</h3>
                <p style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '15px' }}>
                  Trò chơi được phát hành dưới dạng mã nguồn mở trên GitHub. Nếu bạn phát hiện lỗi, có ý tưởng cải thiện hoặc muốn đề xuất thay đổi, bạn có thể tạo một Issue trên repository.
                </p>
                <div style={{ textAlign: 'center', margin: '40px 0' }}>
                  <a href="https://github.com/whooslizi/LucyCurry" target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: '#3e2723', color: '#ffb300', padding: '15px 30px', textDecoration: 'none', border: '4px solid #000', fontSize: '26px', fontWeight: 'bold', boxShadow: '4px 4px 0 #000' }}>
                    Mã nguồn GitHub
                  </a>
                </div>
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
              <button onClick={onAccept} style={{ background: '#4caf50', padding: '15px', fontSize: '24px', fontWeight: 'bold', color: '#fff', border: '4px solid #3e2723', animation: 'pulse 1.5s infinite' }}>
                TÔI ĐÃ ĐỌC
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useGameState } from '../game/gameState';
import { Order } from '../types/game';
import RecipeModal from './RecipeModal';
import DeliveryMinigame from './DeliveryMinigame';

interface Props {
  onEndDay: () => void;
}

export default function ShopScene({ onEndDay }: Props) {
  const { state, dispatch } = useGameState();
  
  const [showRecipe, setShowRecipe] = useState(false);
  const [isDelivering, setIsDelivering] = useState(false);
  const [deliveringOrder, setDeliveringOrder] = useState<Order | null>(null);
  
  const [packingModalOrder, setPackingModalOrder] = useState<Order | null>(null);
  const [boxItems, setBoxItems] = useState<Record<string, number>>({});
  
  const [shippingModalOrder, setShippingModalOrder] = useState<Order | null>(null);
  const [showPhone, setShowPhone] = useState(false);

  // Shop status
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<{type: string, message: string, onResolve: (choice: boolean) => void} | null>(null);

  // Cooking state
  const [selectedDishes, setSelectedDishes] = useState<Record<string, number>>({});
  const [isCooking, setIsCooking] = useState(false);
  const [cookingProgress, setCookingProgress] = useState(0);
  const [cookedDishes, setCookedDishes] = useState<Record<string, number>>({});

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const playSound = (name: string) => {
    try {
      const audio = new Audio(`/sounds/${name}.wav`);
      audio.play().catch(() => {});
    } catch(e) {}
  };

  const RECIPES: {name: string, req: Record<string, number>, icon: string, unlockCost: number, price: number}[] = [
    { name: 'Cơm cà ri gà', req: { 'Cơm': 1, 'Gà': 1, 'Khoai tây': 1 }, icon: '/images/pot_curry.svg', unlockCost: 0, price: 55000 },
    { name: 'Cơm cà ri bò', req: { 'Cơm': 1, 'Bò': 1, 'Khoai tây': 1 }, icon: '/images/pot_curry.svg', unlockCost: 0, price: 85000 },
    { name: 'Cơm cà ri heo', req: { 'Cơm': 1, 'Heo chiên': 1, 'Khoai tây': 1 }, icon: '/images/pot_curry.svg', unlockCost: 50000, price: 85000 },
    { name: 'Udon cà ri tôm', req: { 'Udon': 1, 'Tôm chiên': 1, 'Cà rốt': 1 }, icon: '/images/pot_udon.svg', unlockCost: 100000, price: 90000 },
    { name: 'Cơm cà ri đậu hũ', req: { 'Cơm': 1, 'Khoai tây': 1, 'Cà rốt': 1 }, icon: '/images/pot_curry.svg', unlockCost: 20000, price: 50000 },
    { name: 'Cơm cà ri nấm', req: { 'Cơm': 1, 'Khoai tây': 1, 'Cà rốt': 2 }, icon: '/images/pot_curry.svg', unlockCost: 30000, price: 55000 },
    { name: 'Cơm cà ri trứng', req: { 'Cơm': 1, 'Khoai tây': 2 }, icon: '/images/pot_curry.svg', unlockCost: 40000, price: 55000 },
    { name: 'Udon bò xào', req: { 'Udon': 1, 'Bò': 1, 'Cà rốt': 1 }, icon: '/images/pot_udon.svg', unlockCost: 80000, price: 85000 }
  ];

  const INGREDIENTS = [
    { name: 'Cơm', price: 5000, img: '/images/rice.svg' },
    { name: 'Udon', price: 15000, img: '/images/udon.svg' },
    { name: 'Bò', price: 25000, img: '/images/beef.svg' },
    { name: 'Gà', price: 15000, img: '/images/chicken.svg' },
    { name: 'Heo chiên', price: 20000, img: '/images/pork.svg' },
    { name: 'Tôm chiên', price: 30000, img: '/images/shrimp.svg' },
    { name: 'Khoai tây', price: 5000, img: '/images/potato.svg' },
    { name: 'Cà rốt', price: 5000, img: '/images/carrot.svg' }
  ];

  // Game Loop
  useEffect(() => {
    if (!isShopOpen || currentEvent || isDelivering) return;
    
    const loop = setInterval(() => {
      if (state.timeMinutes >= state.closingMinutes) {
        setIsShopOpen(false);
        onEndDay();
        return;
      }
      
      dispatch({ type: 'ADVANCE_TIME', payload: 2 });
      
      // Random customer messages (Phone)
      if (Math.random() < 0.1 && state.phoneOrders.length < 5) {
        const id = Math.random().toString(36).substring(7, 11).toUpperCase();
        const availableTypes = RECIPES.filter(r => state.unlockedRecipes.includes(r.name));
        
        const numItems = Math.floor(Math.random() * 3) + 1;
        const items: import('../types/game').OrderItem[] = [];
        let totalPrice = 0;
        
        for (let i = 0; i < numItems; i++) {
          const selectedRecipe = availableTypes[Math.floor(Math.random() * availableTypes.length)];
          const existing = items.find(it => it.name === selectedRecipe.name);
          if (existing) {
            existing.quantity += 1;
          } else {
            items.push({ name: selectedRecipe.name, quantity: 1 });
          }
          totalPrice += selectedRecipe.price;
        }

        dispatch({
          type: 'RECEIVE_PHONE_ORDER',
          payload: {
            id,
            customerName: 'Khách ' + Math.floor(Math.random() * 100),
            items,
            totalPrice,
            status: 'phone'
          } as Order
        });

        playSound('notification');
        setShowPhone(true);
      }

      // Random Event
      if (state.day > 1 && Math.random() < 0.02) {
        if (Math.random() > 0.5) {
          setCurrentEvent({
            type: 'Scam',
            message: 'Khách gửi ảnh bill chuyển khoản, nhưng app ngân hàng của bạn chưa nhận được tiền. Báo đã nhận hay kiểm tra kỹ?',
            onResolve: (trusts) => {
              if (trusts) {
                playSound('error');
                alert("Bạn bị lừa! Bị trừ 50,000đ tiền vốn.");
                dispatch({ type: 'ADD_EXPENSE', payload: 50000 });
              } else {
                playSound('cash');
                alert("Bạn yêu cầu khách kiểm tra lại, khách thấy lỗi mạng liền chuyển khoản thật.");
              }
              setCurrentEvent(null);
            }
          });
        } else {
          setCurrentEvent({
            type: 'BadShipper',
            message: 'Xế đến nhận hàng nhưng mặt mũi khả nghi, không có áo đồng phục. Giao hộp cà ri cho hắn hay từ chối?',
            onResolve: (trusts) => {
              if (trusts) {
                playSound('error');
                alert("Xế bom hàng! Trừ 50,000đ bồi thường.");
                dispatch({ type: 'ADD_EXPENSE', payload: 50000 });
              } else {
                playSound('cash');
                alert("Bạn từ chối. Lát sau có xế xịn đến nhận.");
              }
              setCurrentEvent(null);
            }
          });
        }
      }
      
    }, 1000);
    return () => clearInterval(loop);
  }, [isShopOpen, state.timeMinutes, state.closingMinutes, currentEvent, isDelivering, onEndDay, state.unlockedRecipes, state.phoneOrders.length, dispatch, state.day]);

  // Cooking progress
  useEffect(() => {
    let interval: any;
    if (isCooking && cookingProgress < 100) {
      interval = setInterval(() => {
        setCookingProgress(p => {
          if (p + 10 >= 100) {
            setIsCooking(false);
            setCookedDishes(prev => {
              const next = { ...prev };
              for (const [dish, qty] of Object.entries(selectedDishes)) {
                next[dish] = (next[dish] || 0) + qty;
              }
              return next;
            });
            setSelectedDishes({});
            return 100;
          }
          return p + 10;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isCooking, cookingProgress, selectedDishes]);

  const buyIngredient = (item: string, cost: number) => {
    playSound('cash');
    dispatch({ type: 'BUY_INGREDIENT', payload: { item, cost } });
  };

  const handleDishChange = (dishName: string, delta: number, req: Record<string, number>) => {
    const current = selectedDishes[dishName] || 0;
    const next = current + delta;
    if (next < 0) return;

    if (delta > 0) {
      for (const [ing, qty] of Object.entries(req)) {
        const needed = qty;
        const have = state.inventory[ing] || 0;
        let used = 0;
        for (const [d, dQty] of Object.entries(selectedDishes)) {
           const dReq = RECIPES.find(r => r.name === d)?.req;
           if (dReq && dReq[ing]) used += dReq[ing] * dQty;
        }
        if (have - used < needed) {
          playSound('error');
          alert(`Thiếu ${ing}! Hãy bấm mua trong Kho.`);
          return;
        }
      }
    }
    setSelectedDishes(prev => ({ ...prev, [dishName]: next }));
  };

  const startCooking = () => {
    if (Object.keys(selectedDishes).length === 0) return;
    const used: Record<string, number> = {};
    for (const [dish, qty] of Object.entries(selectedDishes)) {
      if (qty > 0) {
        const req = RECIPES.find(r => r.name === dish)?.req || {};
        for (const [ing, rQty] of Object.entries(req)) {
          used[ing] = (used[ing] || 0) + (rQty * qty);
        }
      }
    }
    dispatch({ type: 'USE_INGREDIENTS', payload: used });
    setCookingProgress(0);
    setIsCooking(true);
  };

  const initiatePacking = (order: Order) => {
    setPackingModalOrder(order);
    setBoxItems({});
  };

  const addToBox = (dish: string) => {
    if (cookedDishes[dish] > 0) {
      setCookedDishes(prev => ({ ...prev, [dish]: prev[dish] - 1 }));
      setBoxItems(prev => ({ ...prev, [dish]: (prev[dish] || 0) + 1 }));
    }
  };

  const removeFromBox = (dish: string) => {
    if (boxItems[dish] > 0) {
      setBoxItems(prev => ({ ...prev, [dish]: prev[dish] - 1 }));
      setCookedDishes(prev => ({ ...prev, [dish]: (prev[dish] || 0) + 1 }));
    }
  };

  const confirmPacking = () => {
    if (!packingModalOrder) return;
    
    // Verify if box matches order exactly
    let isCorrect = true;
    const required: Record<string, number> = {};
    for (const it of packingModalOrder.items) required[it.name] = it.quantity;
    
    for (const dish of Object.keys(required)) {
      if ((boxItems[dish] || 0) !== required[dish]) isCorrect = false;
    }
    for (const dish of Object.keys(boxItems)) {
      if (boxItems[dish] > 0 && (required[dish] || 0) !== boxItems[dish]) isCorrect = false;
    }

    if (isCorrect) {
      playSound('cash');
      setShippingModalOrder(packingModalOrder);
      setPackingModalOrder(null);
    } else {
      playSound('error');
      alert('ĐÓNG SAI MÓN! Khách chửi rủa om sòm và hủy đơn. Bồi thường 50k!');
      // Remove all items in box (lost)
      setBoxItems({});
      dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id: packingModalOrder.id, status: 'completed' } });
      dispatch({ type: 'COMPLETE_ORDER', payload: { ...packingModalOrder, totalPrice: -50000 } });
      setPackingModalOrder(null);
    }
  };

  const executeDelivery = (method: 'shipper' | 'self') => {
    if (!shippingModalOrder) return;
    const order = shippingModalOrder;
    setShippingModalOrder(null);

    if (method === 'shipper') {
      dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id: order.id, status: 'completed' } });
      dispatch({ type: 'ADD_EXPENSE', payload: 15000 });
      dispatch({ type: 'COMPLETE_ORDER', payload: order });
      playSound('YASSS');
    } else {
      setDeliveringOrder(order);
      setIsDelivering(true);
    }
  };

  const handleDeliveryComplete = (success: boolean) => {
    setIsDelivering(false);
    dispatch({ type: 'ADVANCE_TIME', payload: 30 }); 
    
    if (deliveringOrder) {
      if (success) {
        dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id: deliveringOrder.id, status: 'completed' } });
        dispatch({ type: 'COMPLETE_ORDER', payload: deliveringOrder });
        playSound('YASSS');
      } else {
        playSound('error');
        dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id: deliveringOrder.id, status: 'completed' } });
        dispatch({ type: 'COMPLETE_ORDER', payload: { ...deliveringOrder, totalPrice: 0 } });
      }
    }
    setDeliveringOrder(null);
  };

  return (
    <div className="portrait-container" style={{ display: 'flex', flexDirection: 'column', background: '#3e2723' }}>
      {showRecipe && <RecipeModal onClose={() => setShowRecipe(false)} />}
      {isDelivering && deliveringOrder && <DeliveryMinigame orderInfo={`Đơn #${deliveringOrder.id}`} onComplete={handleDeliveryComplete} />}
      
      {/* Event Modal */}
      {currentEvent && (
        <div className="modal-backdrop" style={{ zIndex: 100 }}>
          <div className="modal-content" style={{ background: '#f5e6cc', border: '6px solid #8d6e63', padding: '20px', textAlign: 'center', color: '#3e2723' }}>
            <h2 style={{ fontSize: '32px', color: '#d32f2f' }}>SỰ CỐ!</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{currentEvent.message}</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
              <button onClick={() => currentEvent.onResolve(true)} style={{ background: '#d84315', padding: '15px', fontSize: '20px', fontWeight: 'bold', border: '2px solid #000', color: '#fff' }}>TIN TƯỞNG</button>
              <button onClick={() => currentEvent.onResolve(false)} style={{ background: '#4caf50', padding: '15px', fontSize: '20px', fontWeight: 'bold', border: '2px solid #000', color: '#fff' }}>KIỂM TRA LẠI</button>
            </div>
          </div>
        </div>
      )}

      {/* CàriChat Phone Modal */}
      {showPhone && (
        <div className="modal-backdrop" onClick={() => setShowPhone(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: '90%', height: '80%', background: '#fff', border: '6px solid #000', borderRadius: '25px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center', background: '#e0e0e0', padding: '15px', borderRadius: '15px 15px 0 0', fontWeight: 'bold', fontSize: '28px', color: '#000' }}>CàriChat</div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '15px', background: '#f5f5f5' }}>
              {state.phoneOrders.length === 0 && <div style={{ textAlign: 'center', color: '#999', marginTop: '50px', fontSize: '20px' }}>Không có tin nhắn nào.</div>}
              {state.phoneOrders.map(order => (
                <div key={order.id} style={{ background: '#e3f2fd', color: '#000', padding: '15px', borderRadius: '15px', marginBottom: '15px', fontSize: '22px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}>
                  <strong>{order.customerName}:</strong>
                  <div style={{ marginTop: '5px' }}>Chị ơi cho em đơn:</div>
                  <ul style={{ margin: '10px 0', paddingLeft: '25px', fontWeight: 'bold', color: '#d84315' }}>
                    {order.items.map((it, i) => <li key={i}>{it.quantity} x {it.name}</li>)}
                  </ul>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button onClick={() => dispatch({ type: 'ACCEPT_ORDER', payload: order.id })} style={{ flex: 1, background: '#4caf50', padding: '12px', color: '#fff', fontWeight: 'bold', border: '2px solid #000' }}>NHẬN ĐƠN</button>
                    <button onClick={() => dispatch({ type: 'REJECT_ORDER', payload: order.id })} style={{ flex: 1, background: '#f44336', padding: '12px', color: '#fff', fontWeight: 'bold', border: '2px solid #000' }}>TỪ CHỐI</button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowPhone(false)} style={{ background: '#000', color: '#fff', padding: '15px', borderRadius: '0 0 15px 15px', fontSize: '24px', fontWeight: 'bold' }}>ĐÓNG ĐIỆN THOẠI</button>
          </div>
        </div>
      )}

      {/* Packing Minigame Modal */}
      {packingModalOrder && (
        <div className="modal-backdrop" style={{ zIndex: 100 }}>
          <div className="modal-content" style={{ background: '#f5e6cc', border: '6px solid #8d6e63', padding: '20px', color: '#3e2723', display: 'flex', flexDirection: 'column', width: '95%', height: '80%' }}>
            <h2 style={{ fontSize: '32px', margin: '0 0 10px 0', color: '#d84315', textAlign: 'center' }}>ĐÓNG GÓI ĐƠN #{packingModalOrder.id}</h2>
            
            <div style={{ display: 'flex', flex: 1, gap: '10px', overflow: 'hidden' }}>
              {/* Left: Box Requirements (The Order Note) */}
              <div style={{ flex: 1, background: '#fff9c4', border: '2px solid #fbc02d', padding: '15px', overflowY: 'auto', boxShadow: '3px 3px 0 rgba(0,0,0,0.1)' }}>
                <h3 style={{ borderBottom: '2px dashed #fbc02d', paddingBottom: '10px', margin: '0 0 10px 0' }}>YÊU CẦU:</h3>
                {packingModalOrder.items.map((it, i) => (
                  <div key={i} style={{ fontSize: '20px', fontWeight: 'bold', color: '#d84315', marginBottom: '10px' }}>
                    - {it.quantity}x {it.name}
                  </div>
                ))}

                <h3 style={{ borderBottom: '2px dashed #fbc02d', paddingBottom: '10px', margin: '20px 0 10px 0' }}>TRONG HỘP:</h3>
                {Object.keys(boxItems).map(dish => boxItems[dish] > 0 ? (
                  <div key={dish} onClick={() => removeFromBox(dish)} style={{ fontSize: '18px', fontWeight: 'bold', background: '#4caf50', color: '#fff', padding: '5px', marginBottom: '5px', cursor: 'pointer', borderRadius: '5px' }}>
                    {boxItems[dish]}x {dish} (Bấm để bỏ ra)
                  </div>
                ) : null)}
              </div>

              {/* Right: Available Cooked Dishes */}
              <div style={{ flex: 1, background: '#fff', border: '2px solid #8d6e63', padding: '10px', overflowY: 'auto' }}>
                <h3 style={{ borderBottom: '2px dashed #8d6e63', paddingBottom: '5px', margin: '0 0 10px 0' }}>ĐÃ NẤU XONG:</h3>
                {Object.keys(cookedDishes).map(dish => cookedDishes[dish] > 0 ? (
                  <div key={dish} onClick={() => addToBox(dish)} style={{ background: '#ffcc80', border: '2px solid #ef6c00', padding: '10px', marginBottom: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px', borderRadius: '5px' }}>
                    {dish} (Còn {cookedDishes[dish]})<br/>
                    <small>Bấm để cho vào hộp</small>
                  </div>
                ) : null)}
                {Object.values(cookedDishes).reduce((a,b)=>a+b,0) === 0 && <div style={{ color: '#999' }}>Chưa có món nào nấu xong!</div>}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button onClick={confirmPacking} style={{ flex: 2, background: '#4caf50', padding: '15px', fontSize: '24px', fontWeight: 'bold', color: '#fff', border: '3px solid #1b5e20' }}>
                CHỐT HỘP & GIAO!
              </button>
              <button onClick={() => {
                // Return items to inventory if cancelled
                const returning = { ...cookedDishes };
                for (const dish of Object.keys(boxItems)) {
                  returning[dish] = (returning[dish] || 0) + boxItems[dish];
                }
                setCookedDishes(returning);
                setBoxItems({});
                setPackingModalOrder(null);
              }} style={{ flex: 1, background: '#757575', padding: '15px', fontSize: '20px', fontWeight: 'bold', color: '#fff', border: '3px solid #424242' }}>
                HỦY ĐÓNG GÓI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shipping Modal */}
      {shippingModalOrder && (
        <div className="modal-backdrop" style={{ zIndex: 100 }}>
          <div className="modal-content" style={{ background: '#f5e6cc', border: '6px solid #8d6e63', padding: '20px', textAlign: 'center', color: '#3e2723' }}>
            <h2 style={{ fontSize: '32px', margin: '0 0 10px 0', color: '#d84315' }}>HỘP ĐÃ SẴN SÀNG</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Order #{shippingModalOrder.id} - {shippingModalOrder.customerName}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              <button onClick={() => executeDelivery('shipper')} style={{ background: '#4caf50', padding: '15px', fontSize: '24px', fontWeight: 'bold', color: '#fff', border: '3px solid #000' }}>
                GỌI XẾ (-15K)
              </button>
              <button onClick={() => executeDelivery('self')} style={{ background: '#2e7d32', padding: '15px', fontSize: '24px', fontWeight: 'bold', color: '#fff', border: '3px solid #000' }}>
                TỰ SHIP (+30P)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: '#1a0f0d', color: '#ffb300', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', borderBottom: '2px solid #000', fontSize: '24px' }}>
        <div>
          <span>Ngày {state.day} </span><br/>
          <span style={{ color: '#4caf50' }}>{formatMoney(state.money)}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span>{formatTime(state.timeMinutes)}</span><br/>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '5px' }}>
            <button onClick={() => setShowRecipe(true)} style={{ background: 'transparent', padding: 0, border: 'none', color: '#fff', fontSize: '18px', textDecoration: 'underline' }}>
              Sổ công thức
            </button>
            <button onClick={() => window.location.reload()} style={{ background: '#d32f2f', padding: '2px 8px', border: '2px solid #fff', color: '#fff', fontSize: '16px', fontWeight: 'bold', borderRadius: '5px' }}>
              THOÁT
            </button>
          </div>
        </div>
      </div>

      {/* Top Scene: Cozy Kitchen */}
      <div style={{ 
        minHeight: '340px', flexShrink: 0, background: 'linear-gradient(to bottom, #5d4037 0%, #3e2723 80%, #795548 80%, #5d4037 100%)', 
        position: 'relative', overflow: 'hidden', borderBottom: '6px solid #1a0f0d'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '80%', backgroundImage: 'url(/images/brick.svg)', opacity: 0.3 }}></div>
        
        <img src="/images/window.svg" style={{ position: 'absolute', top: '15px', left: '20px', width: '90px', boxShadow: '2px 2px 10px #000' }} />
        <img src="/images/wood.svg" style={{ position: 'absolute', bottom: '15px', left: '15px', width: '100px' }} />
        
        <div style={{ position: 'absolute', bottom: '20px', left: '130px', width: '120px' }}>
          {isCooking && <div style={{ color: '#ffb300', fontSize: '20px', marginBottom: '5px', fontWeight: 'bold', background: '#000', padding: '2px 8px', borderRadius: '10px', textAlign: 'center' }}>ĐANG NẤU</div>}
          <img src="/images/stove.svg" style={{ width: '100%' }} />
        </div>
        
        <img src="/images/lucy_8bit.svg" style={{ position: 'absolute', bottom: '20px', right: '120px', width: '100px', imageRendering: 'pixelated' }} />

        {/* CàriChat Phone Button */}
        <div 
          onClick={() => setShowPhone(true)}
          style={{ position: 'absolute', bottom: '20px', right: '15px', background: state.phoneOrders.length > 0 ? '#f44336' : '#2196f3', width: '80px', height: '120px', borderRadius: '10px', border: '4px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '4px 4px 0 rgba(0,0,0,0.5)', animation: state.phoneOrders.length > 0 ? 'shake 0.5s infinite' : 'none', zIndex: 10 }}
        >
          <div style={{ color: '#fff', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}>
            CHAT
            {state.phoneOrders.length > 0 && <div style={{ background: '#fff', color: '#f44336', borderRadius: '50%', width: '35px', height: '35px', margin: '5px auto 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{state.phoneOrders.length}</div>}
          </div>
        </div>

        {/* Floating Transparent Sticky Notes */}
        <div style={{ position: 'absolute', top: '15px', right: '15px', left: '130px', display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', zIndex: 5 }}>
          {state.activeOrders.map(order => (
            <div 
              key={order.id} 
              onClick={() => initiatePacking(order)}
              style={{ 
                background: 'rgba(255, 249, 196, 0.85)', /* Transparent yellow note */
                border: '2px dashed rgba(245, 127, 23, 0.8)', 
                padding: '10px', 
                borderRadius: '5px', 
                minWidth: '160px', 
                boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                backdropFilter: 'blur(2px)'
              }}
            >
              <div style={{ fontSize: '22px', color: '#000', fontWeight: 'bold', marginBottom: '5px', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>#{order.id}</div>
              <div style={{ fontSize: '18px', color: '#d84315', fontWeight: 'bold' }}>
                {order.items.map((it, i) => <div key={i}>- {it.quantity}x {it.name}</div>)}
              </div>
              <div style={{ textAlign: 'center', marginTop: '5px', fontSize: '14px', color: '#000', fontWeight: 'bold', background: 'rgba(255,255,255,0.5)', borderRadius: '3px' }}>Bấm để đóng gói</div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes shake {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(5deg); }
            50% { transform: rotate(0deg); }
            75% { transform: rotate(-5deg); }
            100% { transform: rotate(0deg); }
          }
        `}</style>

        {!isShopOpen && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
            <button onClick={() => setIsShopOpen(true)} style={{ background: '#d84315', fontSize: '32px', padding: '20px 40px', border: '4px solid #fff', borderRadius: '10px', fontWeight: 'bold', color: '#fff' }}>MỞ CỬA BÁN!</button>
          </div>
        )}
      </div>

      {/* Bottom UI Panel */}
      <div style={{ flex: 1, background: '#f5e6cc', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
          
          <div style={{ fontSize: '22px', color: '#d84315', marginBottom: '8px', fontWeight: 'bold' }}>Kho nguyên liệu · Bấm để mua</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '15px' }}>
             {INGREDIENTS.map(item => (
              <div key={item.name} onClick={() => buyIngredient(item.name, item.price)} style={{ 
                background: '#fff', border: '3px solid #8d6e63', padding: '5px', 
                textAlign: 'center', cursor: 'pointer', borderRadius: '8px', position: 'relative',
                boxShadow: '2px 2px 0 #d7ccc8', display: 'flex', flexDirection: 'column', alignItems: 'center'
              }}>
                <div style={{ 
                  position: 'absolute', top: '-8px', right: '-8px', 
                  background: '#d84315', color: '#fff', fontSize: '16px', fontWeight: 'bold', 
                  padding: '2px 6px', borderRadius: '10px', border: '2px solid #fff'
                }}>
                  {state.inventory[item.name] || 0}
                </div>
                <img src={item.img} style={{ width: '36px', height: '36px', imageRendering: 'pixelated', marginTop: '10px' }} />
                <div style={{ fontSize: '14px', color: '#3e2723', fontWeight: 'bold', marginTop: '5px' }}>{item.name}</div>
                <div style={{ fontSize: '16px', color: '#b71c1c', fontWeight: 'bold' }}>{item.price/1000}k</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '22px', color: '#d84315', marginBottom: '8px', fontWeight: 'bold' }}>Chọn món để nấu</div>
          <div style={{ background: '#fff', border: '3px solid #8d6e63', padding: '10px', borderRadius: '8px' }}>
            {RECIPES.map(recipe => {
              const isUnlocked = state.unlockedRecipes.includes(recipe.name);
              const qty = selectedDishes[recipe.name] || 0;
              const hasCooked = cookedDishes[recipe.name] || 0;

              return (
                <div key={recipe.name} style={{ display: 'flex', alignItems: 'center', borderBottom: '2px dashed #e0e0e0', padding: '10px 0' }}>
                  <img src={recipe.icon} style={{ width: '36px', marginRight: '10px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '20px', color: '#3e2723', fontWeight: 'bold' }}>{recipe.name}</div>
                  </div>
                  
                  {!isUnlocked ? (
                    <button 
                      onClick={() => dispatch({ type: 'UNLOCK_RECIPE', payload: { recipe: recipe.name, cost: recipe.unlockCost } })}
                      style={{ background: '#ffb300', color: '#000', fontSize: '18px', padding: '8px 12px', border: '2px solid #3e2723', fontWeight: 'bold', borderRadius: '5px' }}
                    >
                      Học {recipe.unlockCost / 1000}k
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button onClick={() => handleDishChange(recipe.name, -1, recipe.req)} style={{ background: '#e53935', color: '#fff', padding: '5px 12px', fontSize: '24px', border: '2px solid #000', borderRadius: '5px' }}>-</button>
                      <span style={{ width: '35px', textAlign: 'center', fontSize: '24px', color: '#000', fontWeight: 'bold' }}>{qty}</span>
                      <button onClick={() => handleDishChange(recipe.name, 1, recipe.req)} style={{ background: '#4caf50', color: '#fff', padding: '5px 12px', fontSize: '24px', border: '2px solid #000', borderRadius: '5px' }}>+</button>
                    </div>
                  )}
                  {hasCooked > 0 && <span style={{ marginLeft: '10px', fontSize: '18px', color: '#4caf50', fontWeight: 'bold' }}>(Sẵn: {hasCooked})</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky Cook Button */}
        <div style={{ padding: '10px', background: '#e0c097', borderTop: '4px solid #8d6e63' }}>
          <button 
            onClick={startCooking} 
            disabled={isCooking || Object.values(selectedDishes).reduce((a,b)=>a+b,0) === 0}
            style={{ 
              width: '100%', background: isCooking ? '#9e9e9e' : '#ff9800', padding: '15px', 
              fontSize: '24px', border: '3px solid #3e2723', fontWeight: 'bold', 
              borderRadius: '10px', color: '#000', cursor: isCooking ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 0 #3e2723'
            }}
          >
            {isCooking ? `ĐANG NẤU... ${cookingProgress}%` : 'BẬT BẾP NẤU MÓN ĐÃ CHỌN'}
          </button>
        </div>
      </div>
    </div>
  );
}

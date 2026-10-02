import { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { GameState, Order } from '../types/game';

type Action =
  | { type: 'SET_PLAYER_NAME'; payload: string }
  | { type: 'ADVANCE_TIME'; payload: number }
  | { type: 'RECEIVE_PHONE_ORDER'; payload: Order }
  | { type: 'ACCEPT_ORDER'; payload: string }
  | { type: 'REJECT_ORDER'; payload: string }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string, status: 'ready' | 'completed' } }
  | { type: 'COMPLETE_ORDER'; payload: Order }
  | { type: 'ADD_EXPENSE'; payload: number }
  | { type: 'BUY_INGREDIENT'; payload: { item: string; cost: number } }
  | { type: 'USE_INGREDIENTS'; payload: Record<string, number> }
  | { type: 'UNLOCK_RECIPE'; payload: { recipe: string; cost: number } }
  | { type: 'PAY_TAX'; payload: number }
  | { type: 'NEXT_DAY' }
  | { type: 'SET_MENU_PRICE'; payload: { item: string, price: number } };

const initialState: GameState = {
  playerName: '',
  day: 1,
  money: 500000,
  timeMinutes: 480,
  closingMinutes: 1320,
  phoneOrders: [],
  activeOrders: [],
  energy: 100,
  revenueToday: 0,
  expensesToday: 0,
  profitToday: 0,
  completedOrdersToday: 0,
  inventory: {
    'Cơm': 5, 'Udon': 2, 'Bò': 2, 'Gà': 3, 'Heo chiên': 0, 'Tôm chiên': 0, 'Khoai tây': 5, 'Cà rốt': 5
  },
  unlockedRecipes: ['Cơm cà ri gà', 'Cơm cà ri bò'],
  menuPrices: { 'Cơm cà ri gà': 35000, 'Cơm cà ri bò': 45000, 'Cơm cà ri heo': 40000, 'Cơm cà ri tôm': 55000 }
};

const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'SET_PLAYER_NAME': return { ...state, playerName: action.payload };
    case 'ADVANCE_TIME': return { ...state, timeMinutes: state.timeMinutes + action.payload };
    case 'RECEIVE_PHONE_ORDER': return { ...state, phoneOrders: [...state.phoneOrders, action.payload] };
    case 'ACCEPT_ORDER': {
      const order = state.phoneOrders.find(o => o.id === action.payload);
      if (!order) return state;
      return {
        ...state,
        money: state.money + order.totalPrice,
        revenueToday: state.revenueToday + order.totalPrice,
        profitToday: state.profitToday + order.totalPrice,
        phoneOrders: state.phoneOrders.filter(o => o.id !== action.payload),
        activeOrders: [...state.activeOrders, { ...order, status: 'accepted' }]
      };
    }
    case 'REJECT_ORDER':
      return { ...state, phoneOrders: state.phoneOrders.filter(o => o.id !== action.payload) };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        activeOrders: state.activeOrders.map(o => o.id === action.payload.id ? { ...o, status: action.payload.status } : o)
      };
    case 'COMPLETE_ORDER':
      return {
        ...state,
        activeOrders: state.activeOrders.filter(o => o.id !== action.payload.id),
        completedOrdersToday: state.completedOrdersToday + 1
      };
    case 'ADD_EXPENSE':
      return {
        ...state,
        money: state.money - action.payload,
        expensesToday: state.expensesToday + action.payload,
        profitToday: state.profitToday - action.payload
      };
    case 'PAY_TAX':
      return {
        ...state,
        money: state.money - action.payload,
        expensesToday: state.expensesToday + action.payload,
        profitToday: state.profitToday - action.payload
      };
    case 'BUY_INGREDIENT':
      if (state.money < action.payload.cost) return state;
      return {
        ...state,
        money: state.money - action.payload.cost,
        expensesToday: state.expensesToday + action.payload.cost,
        profitToday: state.profitToday - action.payload.cost,
        inventory: { ...state.inventory, [action.payload.item]: (state.inventory[action.payload.item] || 0) + 1 }
      };
    case 'USE_INGREDIENTS': {
      const newInv = { ...state.inventory };
      for (const [item, qty] of Object.entries(action.payload)) {
        newInv[item] = Math.max(0, (newInv[item] || 0) - qty);
      }
      return { ...state, inventory: newInv };
    }
    case 'UNLOCK_RECIPE':
      if (state.money < action.payload.cost) return state;
      return {
        ...state,
        money: state.money - action.payload.cost,
        expensesToday: state.expensesToday + action.payload.cost,
        profitToday: state.profitToday - action.payload.cost,
        unlockedRecipes: [...state.unlockedRecipes, action.payload.recipe]
      };
    case 'SET_MENU_PRICE':
      return { ...state, menuPrices: { ...state.menuPrices, [action.payload.item]: action.payload.price } };
    case 'NEXT_DAY':
      return {
        ...state,
        day: state.day + 1,
        timeMinutes: 480,
        energy: 100,
        revenueToday: 0,
        expensesToday: 0,
        profitToday: 0,
        completedOrdersToday: 0,
        phoneOrders: [],
        activeOrders: []
      };
    default: return state;
  }
};

const GameContext = createContext<{ state: GameState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState, (initial) => {
    try {
      const saved = localStorage.getItem('lucy_save_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.menuPrices) {
          parsed.menuPrices = { 'Cơm cà ri gà': 35000, 'Cơm cà ri bò': 45000, 'Cơm cà ri heo': 40000, 'Udon cà ri tôm': 55000 };
        }
        return parsed;
      }
    } catch (e) {
      console.error("Failed to load save", e);
    }
    return initial;
  });

  // Save to local storage on every state change
  useEffect(() => {
    localStorage.setItem('lucy_save_v1', JSON.stringify(state));
  }, [state]);

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};

export const useGameState = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGameState must be used within GameProvider');
  return context;
};

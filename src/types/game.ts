export interface OrderItem {
  name: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'phone' | 'accepted' | 'ready' | 'completed';
}

export interface GameState {
  playerName: string;
  day: number;
  money: number;
  timeMinutes: number;
  closingMinutes: number;
  
  phoneOrders: Order[];
  activeOrders: Order[];
  
  energy: number;
  revenueToday: number;
  expensesToday: number;
  profitToday: number;
  completedOrdersToday: number;
  
  inventory: Record<string, number>;
  unlockedRecipes: string[];
}

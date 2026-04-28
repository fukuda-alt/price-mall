import { create } from 'zustand'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  getTotalCount: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const existing = get().items.find((i) => i.id === item.id)
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      })
    } else {
      set({ items: [...get().items, { ...item, quantity: 1 }] })
    }
  },
  getTotalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  getTotalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}))
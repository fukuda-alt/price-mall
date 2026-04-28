"use client"
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'

type Props = {
  id: string
  name: string
  price: number
}

export default function AddToCartButton({ id, name, price }: Props) {
  const addItem = useCartStore((state) => state.addItem)
  const router = useRouter()

  const handleClick = () => {
    addItem({ id, name, price })
    router.push('/cart')
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-yellow-400 text-black font-bold py-3 rounded text-lg hover:bg-yellow-300"
    >
      カートに追加
    </button>
  )
}
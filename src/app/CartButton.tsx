"use client"
import Link from "next/link"
import { useCartStore } from "@/store/cartStore"

export default function CartButton() {
  const getTotalCount = useCartStore((state) => state.getTotalCount)
  const count = getTotalCount()

  return (
    <Link href="/cart" className="relative hover:text-yellow-400">
      🛒
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  )
}
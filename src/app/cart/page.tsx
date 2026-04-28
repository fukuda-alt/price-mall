"use client"
import Link from "next/link"
import { useCartStore } from "@/store/cartStore"

export default function CartPage() {
  const { items, getTotalCount, getTotalPrice } = useCartStore()

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 text-white px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-xl font-bold text-yellow-400 whitespace-nowrap">PriceMall</Link>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">カート</h1>
        {items.length === 0 ? (
          <div className="bg-white rounded p-6 shadow-sm text-center text-gray-500">
            カートに商品がありません
          </div>
        ) : (
          <div className="bg-white rounded p-6 shadow-sm">
            <table className="w-full text-sm mb-6">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-gray-500 font-normal">商品名</th>
                  <th className="text-right py-2 text-gray-500 font-normal">単価</th>
                  <th className="text-right py-2 text-gray-500 font-normal">数量</th>
                  <th className="text-right py-2 text-gray-500 font-normal">小計</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="py-3">{item.name}</td>
                    <td className="text-right py-3">¥{item.price.toLocaleString()}</td>
                    <td className="text-right py-3">{item.quantity}</td>
                    <td className="text-right py-3 font-bold">¥{(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center pt-2 border-t">
              <div className="text-gray-600">合計 {getTotalCount()}点</div>
              <div className="text-2xl font-bold text-red-600">¥{getTotalPrice().toLocaleString()}</div>
            </div>
          </div>
        )}
        <div className="mt-4">
          <Link href="/" className="text-blue-500 hover:underline text-sm">← 買い物を続ける</Link>
        </div>
      </div>
    </div>
  )
}
import Link from "next/link";

const mockProducts = [
  { id: 1, name: "ワイヤレスイヤホン", price: 3980, store: "楽天市場", image: "🎧" },
  { id: 2, name: "スマートウォッチ", price: 12800, store: "Yahoo!ショッピング", image: "⌚" },
  { id: 3, name: "モバイルバッテリー", price: 2480, store: "Amazon", image: "🔋" },
  { id: 4, name: "Bluetoothスピーカー", price: 4980, store: "楽天市場", image: "🔊" },
  { id: 5, name: "USBハブ", price: 1980, store: "Yahoo!ショッピング", image: "🖥️" },
  { id: 6, name: "充電ケーブル", price: 890, store: "Amazon", image: "🔌" },
  { id: 7, name: "webカメラ", price: 6800, store: "楽天市場", image: "📷" },
  { id: 8, name: "キーボード", price: 8900, store: "Yahoo!ショッピング", image: "⌨️" },
];

const recentProducts = [
  { id: 1, name: "ワイヤレスイヤホン", price: 3980, image: "🎧" },
  { id: 3, name: "モバイルバッテリー", price: 2480, image: "🔋" },
  { id: 7, name: "webカメラ", price: 6800, image: "📷" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-gray-900 text-white px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="text-xl font-bold text-yellow-400 whitespace-nowrap">PriceMall</div>
          <input
            type="text"
            placeholder="商品を検索する"
            className="flex-1 px-4 py-2 rounded text-black text-sm"
          />
          <button className="bg-yellow-400 text-black px-4 py-2 rounded text-sm font-medium hover:bg-yellow-300">
            検索
          </button>
          <div className="flex gap-3 text-sm whitespace-nowrap ml-2">
            <Link href="/auth/register" className="hover:text-yellow-400">店舗登録</Link>
            <span className="text-gray-500">|</span>
            <a href="/auth/login" className="hover:text-yellow-400">店舗ログイン</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-yellow-400">ログイン</a>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* 最近見た商品 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3">最近見た商品</h2>
          <div className="flex gap-4">
            {recentProducts.map((p) => (
              <div key={p.id} className="bg-white rounded p-3 w-36 shadow-sm text-center">
                <div className="text-4xl mb-2">{p.image}</div>
                <div className="text-xs text-gray-700 mb-1">{p.name}</div>
                <div className="text-sm font-bold text-red-600">¥{p.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 商品一覧 */}
        <section>
          <h2 className="text-lg font-bold mb-3">商品一覧</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mockProducts.map((p) => (
              <div key={p.id} className="bg-white rounded p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-5xl text-center mb-3">{p.image}</div>
                <div className="text-sm text-gray-800 mb-1">{p.name}</div>
                <div className="text-base font-bold text-red-600 mb-1">¥{p.price.toLocaleString()}</div>
                <div className="text-xs text-gray-400">{p.store}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

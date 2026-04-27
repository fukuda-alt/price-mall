import Link from "next/link";

const mockProducts = [
  { id: 1, name: "ワイヤレスイヤホン", image: "🎧", description: "高音質・ノイズキャンセリング対応のワイヤレスイヤホン。連続再生8時間。" },
  { id: 2, name: "スマートウォッチ", image: "⌚", description: "心拍数・歩数計測対応。防水仕様のスマートウォッチ。" },
  { id: 3, name: "モバイルバッテリー", image: "🔋", description: "20000mAh大容量。USB-C/A対応モバイルバッテリー。" },
  { id: 4, name: "Bluetoothスピーカー", image: "🔊", description: "360度サウンド・防水対応のポータブルスピーカー。" },
  { id: 5, name: "USBハブ", image: "🖥️", description: "USB3.0×4ポート対応の高速USBハブ。" },
  { id: 6, name: "充電ケーブル", image: "🔌", description: "急速充電対応・断線しにくい強化ナイロン素材。" },
  { id: 7, name: "webカメラ", image: "📷", description: "フルHD1080p対応。在宅ワークに最適なwebカメラ。" },
  { id: 8, name: "キーボード", image: "⌨️", description: "静音設計・メカニカルスイッチ採用のワイヤレスキーボード。" },
];

const mockPrices = [
  { productId: 1, priceMall: 3980, rakuten: 4480, amazon: 4280, yahoo: 4380, qoo10: 4180 },
  { productId: 2, priceMall: 12800, rakuten: 14800, amazon: 13900, yahoo: 14200, qoo10: 13500 },
  { productId: 3, priceMall: 2480, rakuten: 2980, amazon: 2780, yahoo: 2880, qoo10: 2680 },
  { productId: 4, priceMall: 4980, rakuten: 5980, amazon: 5480, yahoo: 5680, qoo10: 5280 },
  { productId: 5, priceMall: 1980, rakuten: 2480, amazon: 2280, yahoo: 2180, qoo10: 2080 },
  { productId: 6, priceMall: 890, rakuten: 1280, amazon: 1080, yahoo: 980, qoo10: 950 },
  { productId: 7, priceMall: 6800, rakuten: 7800, amazon: 7200, yahoo: 7500, qoo10: 7100 },
  { productId: 8, priceMall: 8900, rakuten: 10800, amazon: 9800, yahoo: 10200, qoo10: 9500 },
];

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const id = parseInt(rawId);
  const product = mockProducts.find((p) => p.id === id);
  const prices = mockPrices.find((p) => p.productId === id);

  if (!product || !prices) {
    return <div className="p-8 text-center text-gray-500">商品が見つかりません</div>;
  }

  const compareRows = [
    { store: "楽天市場", price: prices.rakuten, url: "#" },
    { store: "Amazon", price: prices.amazon, url: "#" },
    { store: "Yahoo!ショッピング", price: prices.yahoo, url: "#" },
    { store: "Qoo10", price: prices.qoo10, url: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 text-white px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-xl font-bold text-yellow-400 whitespace-nowrap">PriceMall</Link>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded p-6 shadow-sm mb-6">
          <div className="text-7xl text-center mb-4">{product.image}</div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          <div className="text-3xl font-bold text-red-600 mb-1">¥{prices.priceMall.toLocaleString()}</div>
          <div className="text-xs text-gray-400 mb-6">PriceMall最安値</div>
          <button className="w-full bg-yellow-400 text-black font-bold py-3 rounded text-lg hover:bg-yellow-300">
            準備中
          </button>
        </div>
        <div className="bg-white rounded p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4">他モールの価格比較</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-gray-500 font-normal">モール</th>
                <th className="text-right py-2 text-gray-500 font-normal">価格</th>
                <th className="text-right py-2 text-gray-500 font-normal">差額</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr key={row.store} className="border-b last:border-0">
                  <td className="py-3">{row.store}</td>
                  <td className="text-right py-3 font-bold">¥{row.price.toLocaleString()}</td>
                  <td className="text-right py-3 text-red-500">
                    +¥{(row.price - prices.priceMall).toLocaleString()}
                  </td>
                  <td className="text-right py-3">
                    <a href={row.url} className="text-blue-500 hover:underline text-xs">見る</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
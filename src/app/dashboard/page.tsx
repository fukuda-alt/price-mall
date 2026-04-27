import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: seller } = await supabase
    .from('sellers')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* ヘッダー */}
      <header style={{
        backgroundColor: '#1a1a2e',
        color: '#fff',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: '20px', fontWeight: '700', color: '#fbbf24' }}>PriceMall</div>
        <div style={{ fontSize: '14px', color: '#ccc' }}>{seller?.company_name ?? user.email}</div>
      </header>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px', color: '#111' }}>ダッシュボード</h1>

        {/* 店舗情報 */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
          marginBottom: '24px',
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', color: '#333' }}>店舗情報</h2>
          {[
            { label: '会社名', value: seller?.company_name },
            { label: 'モール名', value: seller?.mall_name },
            { label: 'ショップURL', value: seller?.shop_url },
            { label: 'メールアドレス', value: user.email },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', marginBottom: '14px', fontSize: '14px' }}>
              <div style={{ width: '140px', color: '#888', flexShrink: 0 }}>{label}</div>
              <div style={{ color: '#111' }}>{value ?? '未設定'}</div>
            </div>
          ))}
        </div>

        {/* 出品中の商品（モック） */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
          marginBottom: '24px',
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', color: '#333' }}>出品中の商品</h2>
          <p style={{ fontSize: '14px', color: '#aaa' }}>まだ商品が登録されていません</p>
        </div>

        {/* ログアウト */}
        <form action="/auth/logout" method="post">
          <button type="submit" style={{
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#fff',
            backgroundColor: '#e53e3e',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}>
            ログアウト
          </button>
        </form>
      </div>
    </div>
  )
}

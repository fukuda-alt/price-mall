'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [mallName, setMallName] = useState('')
  const [shopUrl, setShopUrl] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async () => {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: undefined }
    })
    if (signUpError) { setError(signUpError.message); return }

    const { error: insertError } = await supabase.from('sellers').insert({
      id: data.user?.id,
      company_name: companyName,
      mall_name: mallName,
      shop_url: shopUrl,
    })
    if (insertError) { setError(insertError.message); return }

    router.push('/')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '48px',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#111' }}>出品者登録</h1>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '32px' }}>必要事項を入力してください</p>

        {[
          { label: 'メールアドレス', value: email, setter: setEmail, type: 'email', placeholder: 'example@company.com' },
          { label: 'パスワード', value: password, setter: setPassword, type: 'password', placeholder: '8文字以上' },
          { label: '会社名', value: companyName, setter: setCompanyName, type: 'text', placeholder: '株式会社サンプル' },
          { label: 'モール名', value: mallName, setter: setMallName, type: 'text', placeholder: '楽天市場' },
          { label: 'ショップURL', value: shopUrl, setter: setShopUrl, type: 'text', placeholder: 'https://...' },
        ].map(({ label, value, setter, type, placeholder }) => (
          <div key={label} style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>{label}</label>
            <input
              type={type}
              value={value}
              onChange={e => setter(e.target.value)}
              placeholder={placeholder}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                outline: 'none',
                boxSizing: 'border-box',
                color: '#111',
              }}
            />
          </div>
        ))}

        {error && <p style={{ color: '#e53e3e', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}

        <button
          onClick={handleRegister}
          style={{
            width: '100%',
            padding: '13px',
            fontSize: '15px',
            fontWeight: '600',
            color: '#fff',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            letterSpacing: '0.5px',
          }}
        >
          登録する
        </button>
      </div>
    </div>
  )
}

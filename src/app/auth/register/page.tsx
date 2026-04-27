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
    <div style={{ padding: 40 }}>
      <h1>Register</h1>
      <input placeholder='email' value={email} onChange={e => setEmail(e.target.value)} /><br/>
      <input placeholder='password' type='password' value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <input placeholder='company name' value={companyName} onChange={e => setCompanyName(e.target.value)} /><br/>
      <input placeholder='mall name' value={mallName} onChange={e => setMallName(e.target.value)} /><br/>
      <input placeholder='shop url' value={shopUrl} onChange={e => setShopUrl(e.target.value)} /><br/>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

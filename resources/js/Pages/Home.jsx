import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import Layout from '../Layouts/Layout'
import Logo from '../../assets/logo.png'


export default function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-between px-8 pt-16 pb-12"
      style={{ background: 'linear-gradient(175deg, #a8c8f0 0%, #c5dff8 35%, #deeeff 65%, #f0f8ff 100%)' }}
    >
      <div className='w-10 flex flex-col items-end justify-center px-3 py-3'>
        <button className='px-2 py-2 border-2 border-black rounded-lg'>
            
        </button>
      </div>
      <div className="flex-1" />
      <div className={`flex flex-col items-center gap-7 transition-all duration-500 ease-out
        ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center px-3 py-3"
          style={{
            background: 'linear-gradient(145deg, #7b96e8 0%, #5b6fd4 40%, #4a5bbf 100%)',
            boxShadow: '0 8px 32px rgba(91,111,212,0.45), 0 2px 8px rgba(91,111,212,0.3), inset 0 1px 1px rgba(255,255,255,0.25)'
          }}
        >
          <img src={Logo}  className='w-full' alt="" />
        </div>

        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight mb-1">
            Facial Recognition System
          </h1>
          <p className="text-sm text-slate-500">
            Secure Attendance Tracking
          </p>
        </div>
      </div>

      <div className="flex-[2]" />

      <div className={`w-full max-w-xs transition-all duration-500 ease-out delay-200
        ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <button
          onClick={() => router.visit('/prof-scanner')}
          className="w-full py-5 bg-gray-900 text-white rounded-2xl text-base font-medium
            tracking-wide shadow-lg active:scale-95 hover:bg-gray-800 transition-all duration-150"
        >
          Next
        </button>
      </div>
    </div>
  )
}

// ✅ Layout is applied here — this is the correct way with Inertia
Home.layout = page => <Layout>{page}</Layout>

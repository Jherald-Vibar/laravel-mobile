import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import Layout from '../Layouts/Layout'

const ShieldIcon = () => (
  <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M50 5 L90 22 L90 55 C90 78 72 98 50 105 C28 98 10 78 10 55 L10 22 Z" fill="white" opacity="0.95" />
    <rect x="18" y="42" width="64" height="16" rx="8" fill="#5B6FD4" />
    <text x="50" y="54" textAnchor="middle" dominantBaseline="middle" fill="white"
      fontFamily="'Barlow Condensed', sans-serif" fontWeight="800" fontSize="13" letterSpacing="2">
      SENTRY
    </text>
    <path d="M38 65 Q50 76 62 65" stroke="#5B6FD4" strokeWidth="3" strokeLinecap="round" fill="none" />
    <ellipse cx="50" cy="70" rx="12" ry="7" fill="#5B6FD4" opacity="0.6" />
  </svg>
)

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    // ✅ No <Layout> wrapper here anymore
    <div
      className="min-h-screen w-full flex flex-col items-center justify-between px-8 pt-16 pb-12"
      style={{ background: 'linear-gradient(175deg, #a8c8f0 0%, #c5dff8 35%, #deeeff 65%, #f0f8ff 100%)' }}
    >
      <div className="flex-1" />

      <div className={`flex flex-col items-center gap-7 transition-all duration-500 ease-out
        ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center p-5"
          style={{
            background: 'linear-gradient(145deg, #7b96e8 0%, #5b6fd4 40%, #4a5bbf 100%)',
            boxShadow: '0 8px 32px rgba(91,111,212,0.45), 0 2px 8px rgba(91,111,212,0.3), inset 0 1px 1px rgba(255,255,255,0.25)'
          }}
        >
          <ShieldIcon />
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

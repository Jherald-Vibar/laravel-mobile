import { useState, useEffect, useRef } from 'react'
import { router } from '@inertiajs/react'
import Layout from '../Layouts/Layout'

const STEPS = [0, 1, 2]

export default function Prof_Scanner() {
  const [currentStep, setCurrentStep] = useState(0)
  const [scanning, setScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [hint, setHint] = useState('Find a good lighting spot')
  const [cameraReady, setCameraReady] = useState(false)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const hints = [
    'Find a good lighting spot',
    'Keep your face centered',
    'Hold still...',
  ]

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => setCameraReady(true)
      }
    } catch (err) {
      console.error('Camera error:', err)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
    }
  }

  const handleScan = () => {
    if (scanning) return
    setScanning(true)
    setScanProgress(0)

    let step = 0
    let progress = 0

    const interval = setInterval(() => {
      progress += 2
      setScanProgress(progress)
      setHint(hints[Math.floor(progress / 34)] || hints[2])

      if (progress >= 33 && step === 0) { step = 1; setCurrentStep(1) }
      if (progress >= 66 && step === 1) { step = 2; setCurrentStep(2) }

      if (progress >= 100) {
        clearInterval(interval)
        setHint('Scan complete!')
        setTimeout(() => {
          stopCamera()
          router.visit('/dashboard')
        }, 800)
      }
    }, 40)
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">

      {/* Camera feed — full background */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: cameraReady ? 1 : 0, transition: 'opacity 0.5s ease' }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Header */}
        <div className="pt-12 pb-4 flex justify-center">
          <span
            className="text-white text-xl tracking-[0.25em] font-bold"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            SENTRY
          </span>
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {STEPS.map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="transition-all duration-300"
                style={{
                  width: i === currentStep ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i <= currentStep ? 'white' : 'rgba(255,255,255,0.3)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Scan label */}
        <p className="text-center text-white/80 text-sm tracking-widest mb-6"
          style={{ fontFamily: "'Barlow', sans-serif" }}>
          Scan your Face
        </p>

        {/* Face frame — circle only */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="relative" style={{ width: 260, height: 260 }}>

            {/* Circle border */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ border: '2px solid rgba(255,255,255,0.6)' }}
            />

            {/* Scan line — always sweeping, clipped inside circle */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: 2,
                background: 'linear-gradient(90deg, transparent, rgba(99,179,237,0.95), transparent)',
                boxShadow: '0 0 10px rgba(99,179,237,1), 0 0 4px rgba(99,179,237,0.7)',
                animation: 'scanLine 2s ease-in-out infinite',
              }} />
            </div>

            {/* Success checkmark */}
            {scanProgress >= 100 && (
              <div className="absolute inset-0 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.3)' }}
              >
                <div className="w-16 h-16 rounded-full bg-green-400/20 flex items-center justify-center border-2 border-green-400">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hint text */}
        <p
          className="text-center text-white/70 text-sm mb-6 px-8 transition-all duration-300"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {hint}
        </p>

        {/* Progress bar (visible during scan) */}
        {scanning && (
          <div className="mx-12 mb-4 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-400 rounded-full transition-all duration-75"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="px-8 pb-10 flex flex-col gap-3">
          <button
            onClick={handleScan}
            disabled={scanning}
            className="w-full py-4 bg-white text-gray-900 rounded-2xl text-base font-semibold
              tracking-wide transition-all duration-150 active:scale-95
              disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            {scanning ? (scanProgress >= 100 ? 'Done!' : 'Scanning...') : 'Scan'}
          </button>

          <button
            onClick={() => { stopCamera(); router.visit('/') }}
            className="w-full py-4 bg-white/10 text-white rounded-2xl text-base font-medium
              tracking-wide border border-white/20 transition-all duration-150 active:scale-95"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Back
          </button>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@400;500;600&display=swap');

        @keyframes scanLine {
          0%   { top: 5%; }
          50%  { top: 90%; }
          100% { top: 5%; }
        }
      `}</style>
    </div>
  )
}

Prof_Scanner.layout = page => <Layout>{page}</Layout>

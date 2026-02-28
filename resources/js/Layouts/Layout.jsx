import { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import Logo from '../../assets/logo.png'

export default function Layout({ children }) {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval

    const start = router.on('start', () => {
      setLoading(true)
      setProgress(0)

      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 85) {
            clearInterval(interval)
            return 85
          }
          return prev + 10
        })
      }, 100)
    })

    const finish = router.on('finish', () => {
      clearInterval(interval)
      setProgress(100)
      setTimeout(() => {
        setLoading(false)
        setProgress(0)
      }, 400)
    })

    return () => {
      start()
      finish()
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(175deg, #a8c8f0 0%, #c5dff8 35%, #deeeff 65%, #f0f8ff 100%)' }}
        >
         <img src={Logo} className='w-10 mb-3' alt="" />
          <div className="w-48 h-1.5 bg-blue-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-sm text-blue-400 font-medium tracking-widest">
            Loading...
          </p>
        </div>
      )}
      <div className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  )
}

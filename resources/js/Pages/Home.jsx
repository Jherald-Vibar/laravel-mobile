import React, { useState, useEffect } from 'react'

export default function Home() {
    const [time, setTime] = useState(new Date())
    const [activeAction, setActiveAction] = useState(null)
    const [scanPulse, setScanPulse] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const pulse = setInterval(() => setScanPulse(p => !p), 1800)
        return () => clearInterval(pulse)
    }, [])

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        })
    }

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    const handleAction = (action) => {
        setActiveAction(action)
        setTimeout(() => setActiveAction(null), 2000)
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0f1e',
            fontFamily: "'Courier New', monospace",
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Grid background */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(0,255,180,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,255,180,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                pointerEvents: 'none',
            }} />

            {/* Top glow */}
            <div style={{
                position: 'absolute', top: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: '600px', height: '300px',
                background: 'radial-gradient(ellipse, rgba(0,255,180,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Header bar */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 28px',
                borderBottom: '1px solid rgba(0,255,180,0.15)',
                background: 'rgba(0,255,180,0.03)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: '#00ffb4',
                        boxShadow: '0 0 8px #00ffb4',
                        animation: 'blink 1.5s ease-in-out infinite',
                    }} />
                    <span style={{ color: '#00ffb4', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>
                        System Online
                    </span>
                </div>
                <span style={{ color: 'rgba(0,255,180,0.4)', fontSize: '11px', letterSpacing: '2px' }}>
                    ATTENDANCE KIOSK v1.0
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                    {['NET', 'CAM', 'SYS'].map(tag => (
                        <span key={tag} style={{
                            fontSize: '9px', padding: '2px 6px',
                            border: '1px solid rgba(0,255,180,0.3)',
                            color: 'rgba(0,255,180,0.5)',
                            letterSpacing: '1px',
                        }}>{tag} ✓</span>
                    ))}
                </div>
            </div>

            {/* Main content */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '32px 20px', gap: '40px',
            }}>

                {/* Clock */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        fontSize: 'clamp(52px, 12vw, 96px)',
                        fontWeight: '700',
                        color: '#00ffb4',
                        letterSpacing: '6px',
                        textShadow: '0 0 40px rgba(0,255,180,0.4)',
                        lineHeight: 1,
                        fontFamily: "'Courier New', monospace",
                    }}>
                        {formatTime(time)}
                    </div>
                    <div style={{
                        marginTop: '10px',
                        color: 'rgba(0,255,180,0.5)',
                        fontSize: '13px',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                    }}>
                        {formatDate(time)}
                    </div>
                </div>

                {/* Scan zone */}
                <div style={{
                    position: 'relative',
                    width: '220px', height: '220px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    {/* Corner brackets */}
                    {[
                        { top: 0, left: 0, borderTop: '3px solid #00ffb4', borderLeft: '3px solid #00ffb4' },
                        { top: 0, right: 0, borderTop: '3px solid #00ffb4', borderRight: '3px solid #00ffb4' },
                        { bottom: 0, left: 0, borderBottom: '3px solid #00ffb4', borderLeft: '3px solid #00ffb4' },
                        { bottom: 0, right: 0, borderBottom: '3px solid #00ffb4', borderRight: '3px solid #00ffb4' },
                    ].map((style, i) => (
                        <div key={i} style={{
                            position: 'absolute', width: '28px', height: '28px', ...style
                        }} />
                    ))}

                    {/* Scan line */}
                    <div style={{
                        position: 'absolute', left: '8px', right: '8px', height: '2px',
                        background: 'linear-gradient(90deg, transparent, #00ffb4, transparent)',
                        boxShadow: '0 0 12px #00ffb4',
                        top: scanPulse ? '15%' : '80%',
                        transition: 'top 1.8s ease-in-out',
                    }} />

                    {/* Center icon */}
                    <div style={{ textAlign: 'center', zIndex: 1 }}>
                        <div style={{ fontSize: '52px', marginBottom: '8px' }}>👤</div>
                        <div style={{
                            color: 'rgba(0,255,180,0.6)', fontSize: '10px',
                            letterSpacing: '3px', textTransform: 'uppercase',
                        }}>
                            SCAN FACE / ID
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {[
                        { label: 'TIME IN', icon: '→', color: '#00ffb4' },
                        { label: 'TIME OUT', icon: '←', color: '#ff6b6b' },
                        { label: 'MANUAL', icon: '⌨', color: '#ffd93d' },
                    ].map(({ label, icon, color }) => (
                        <button
                            key={label}
                            onClick={() => handleAction(label)}
                            style={{
                                padding: '16px 32px',
                                background: activeAction === label
                                    ? `${color}22`
                                    : 'transparent',
                                border: `1px solid ${color}`,
                                color: color,
                                fontSize: '13px',
                                letterSpacing: '3px',
                                cursor: 'pointer',
                                fontFamily: "'Courier New', monospace",
                                textTransform: 'uppercase',
                                transition: 'all 0.2s',
                                boxShadow: activeAction === label
                                    ? `0 0 20px ${color}44`
                                    : 'none',
                                minWidth: '140px',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = `${color}15`
                                e.currentTarget.style.boxShadow = `0 0 16px ${color}33`
                            }}
                            onMouseLeave={e => {
                                if (activeAction !== label) {
                                    e.currentTarget.style.background = 'transparent'
                                    e.currentTarget.style.boxShadow = 'none'
                                }
                            }}
                        >
                            <span style={{ marginRight: '8px' }}>{icon}</span>
                            {label}
                        </button>
                    ))}
                </div>

                {/* Status message */}
                <div style={{
                    height: '28px',
                    color: activeAction ? '#00ffb4' : 'rgba(0,255,180,0.3)',
                    fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase',
                    transition: 'color 0.3s',
                    textShadow: activeAction ? '0 0 10px #00ffb4' : 'none',
                }}>
                    {activeAction ? `[ ${activeAction} REGISTERED ]` : '[ READY — PLEASE SCAN OR SELECT ACTION ]'}
                </div>
            </div>

            {/* Footer */}
            <div style={{
                padding: '14px 28px',
                borderTop: '1px solid rgba(0,255,180,0.1)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
                <span style={{ color: 'rgba(0,255,180,0.3)', fontSize: '10px', letterSpacing: '2px' }}>
                    ADMIN
                </span>
                <span style={{ color: 'rgba(0,255,180,0.2)', fontSize: '10px', letterSpacing: '2px' }}>
                    © 2026 ATTENDANCE KIOSK SYSTEM
                </span>
                <span style={{ color: 'rgba(0,255,180,0.3)', fontSize: '10px', letterSpacing: '2px' }}>
                    HELP
                </span>
            </div>

            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.2; }
                }
            `}</style>
        </div>
    )
}

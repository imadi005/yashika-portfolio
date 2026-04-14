import { useEffect } from 'react'

export default function VideoModal({ item, onClose }) {
  const open = !!item

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Determine if modal should be vertical (portrait) for Reel and Event edits
  const isVertical = item && (item.cat === 'Reel Edit' || item.cat === 'Event Edit')

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.96)',
        zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.25s',
      }}
    >
      <div style={{
        background: 'var(--bg3)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '6px',
        width: '100%',
        maxWidth: isVertical ? '480px' : '920px',
        maxHeight: '90vh',
        transform: open ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(24px)',
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '14px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: item?.platform === 'yt' ? '#ff0000' : 'var(--pink)',
              display: 'inline-block', flexShrink: 0,
            }} />
            <span style={{ fontSize: '14px', fontWeight: 600 }}>{item?.title}</span>
            <span style={{
              fontSize: '10px', padding: '2px 8px',
              border: '1px solid var(--border)',
              borderRadius: '2px', color: 'var(--muted)',
              letterSpacing: '2px', textTransform: 'uppercase',
            }}>{item?.cat}</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--white)', cursor: 'pointer', fontSize: '16px',
              width: '34px', height: '34px', borderRadius: '2px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.borderColor = 'rgba(255,255,255,0.3)' }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'var(--border)' }}
          >✕</button>
        </div>

        {/* Embed - Vertical aspect ratio for Reels & Events, 16:9 for Videos */}
        <div style={{ 
          position: 'relative', 
          paddingTop: isVertical ? '177.77%' : '56.25%',
          background: '#000',
          flexShrink: 0,
        }}>
          {item && (
            <iframe
              key={item.embedUrl}
              src={item.embedUrl}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              allowFullScreen
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          )}
        </div>
      </div>
    </div>
  )
}
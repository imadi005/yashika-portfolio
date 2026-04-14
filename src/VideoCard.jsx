import { useState } from 'react'

const styles = {
  card: {
    position: 'relative',
    borderRadius: '4px',
    overflow: 'hidden',
    cursor: 'pointer',
    background: 'var(--bg3)',
    border: '1px solid var(--border)',
    transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s, box-shadow 0.3s',
  },
  cardHover: {
    transform: 'translateY(-8px) scale(1.01)',
    borderColor: 'rgba(232,255,60,0.35)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(232,255,60,0.1)',
  },
  thumb: {
    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
    transition: 'transform 0.5s, filter 0.3s',
  },
  thumbHover: { transform: 'scale(1.07)', filter: 'brightness(0.45)' },
  thumbNormal: { filter: 'brightness(0.7)' },
  overlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)',
    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    padding: '20px', transition: 'background 0.3s',
  },
  overlayHover: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 100%)',
  },
  playBtn: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%) scale(0)',
    width: '60px', height: '60px',
    background: 'var(--accent)', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
  },
  playBtnHover: { transform: 'translate(-50%, -50%) scale(1)' },
  playIcon: {
    width: 0, height: 0,
    borderTop: '11px solid transparent',
    borderBottom: '11px solid transparent',
    borderLeft: '18px solid #000',
    marginLeft: '4px',
  },
  platform: {
    display: 'inline-block', padding: '3px 10px',
    borderRadius: '2px', fontSize: '10px',
    letterSpacing: '2px', textTransform: 'uppercase',
    fontWeight: 700, marginBottom: '8px',
  },
  title: { fontSize: '14px', fontWeight: 600, lineHeight: 1.3 },
  sub: { fontSize: '11px', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px', opacity: 0.8 },
}

export default function VideoCard({ item, onPlay, isVertical = false }) {
  const [hovered, setHovered] = useState(false)
  const isYT = item.platform === 'yt'

  return (
    <div
      style={{ 
        ...styles.card, 
        aspectRatio: isVertical ? '9/16' : '16/10',
        ...(hovered ? styles.cardHover : {})
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(item)}
    >
      <img
        src={item.thumb}
        alt={item.title}
        style={{ ...styles.thumb, ...(hovered ? styles.thumbHover : styles.thumbNormal) }}
        onError={e => {
          if (isYT && e.target.src.includes('maxresdefault')) {
            e.target.src = e.target.src.replace('maxresdefault', 'hqdefault')
          }
        }}
      />
      <div style={{ ...styles.overlay, ...(hovered ? styles.overlayHover : {}) }}>
        <div style={{ ...styles.playBtn, ...(hovered ? styles.playBtnHover : {}) }}>
          <div style={styles.playIcon} />
        </div>
        <span style={{
          ...styles.platform,
          background: isYT ? 'rgba(255,0,0,0.85)' : 'linear-gradient(135deg,rgba(214,41,118,0.85),rgba(255,159,28,0.85))',
          color: '#fff',
        }}>
          {isYT ? 'YouTube' : 'Instagram'}
        </span>
        <div style={styles.title}>{item.title}</div>
        <div style={styles.sub}>{item.sub || item.cat}</div>
      </div>
    </div>
  )
}
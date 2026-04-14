import { useState, useEffect, useRef } from 'react'
import VideoCard from './VideoCard'
import VideoModal from './VideoModal'
import { useInView } from './useInView'
import { VIDEOS, REELS, EVENTS, SKILLS } from './data'

/* ─── FADE-UP WRAPPER ─── */
function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ─── SKILL BAR ─── */
function SkillBar({ name, pct }) {
  const [ref, inView] = useInView(0.3)
  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
      <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', width: '130px', flexShrink: 0, fontFamily: "'Space Mono', monospace" }}>{name}</span>
      <div style={{ flex: 1, height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: 'var(--accent)', borderRadius: '1px', width: inView ? `${pct}%` : '0%', transition: 'width 1.6s cubic-bezier(0.4,0,0.2,1) 0.2s' }} />
      </div>
      <span style={{ fontSize: '12px', color: 'var(--accent)', fontFamily: "'Space Mono', monospace", width: '36px', textAlign: 'right' }}>{pct}%</span>
    </div>
  )
}

/* ─── MARQUEE ─── */
const MARQUEE_ITEMS = ['Video Editing', 'Reel Editing', 'Event Films', 'Motion Graphics', 'Color Grading', 'Sound Design', 'Adobe Premiere Pro', 'Visual Storytelling']

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '16px 0', background: 'var(--bg2)' }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 22s linear infinite' }}>
        {items.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', padding: '0 24px', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)' }}>
            <span style={{ width: '5px', height: '5px', background: 'var(--accent)', borderRadius: '50%', flexShrink: 0 }} />
            {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  )
}

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '18px 40px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(5,5,5,0.92)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.3s',
    }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '4px', color: 'var(--accent)' }}>YA</div>
      <ul style={{ display: 'flex', gap: '36px', listStyle: 'none', margin: 0 }}>
        {['Work', 'About', 'Contact'].map(item => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} style={{
              color: 'rgba(245,245,240,0.55)', fontSize: '12px',
              letterSpacing: '3px', textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'rgba(245,245,240,0.55)'}
            >{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(100px,12vw,140px) 40px 80px',
    }}>
      {/* Background effects */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 68% 50%, rgba(232,255,60,0.055) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 18% 80%, rgba(255,60,110,0.04) 0%, transparent 60%)' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', position: 'relative' }}>
        {/* LEFT */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(232,255,60,0.07)', border: '1px solid rgba(232,255,60,0.18)', padding: '6px 18px', borderRadius: '100px', marginBottom: '28px', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent)', animation: 'fadeIn 0.8s 0.1s both' }}>
            <span style={{ width: '7px', height: '7px', background: 'var(--accent)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
            Available for work
          </div>

          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(64px,9vw,110px)', lineHeight: 0.9, letterSpacing: '2px', marginBottom: '10px', animation: 'fadeUp 0.8s 0.2s both' }}>
            YASHIKA<br />
            <span style={{ WebkitTextStroke: '2px var(--accent)', color: 'transparent' }}>AGRAWAL</span>
          </h1>

          <p style={{ fontSize: '13px', letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '28px', fontFamily: "'Space Mono', monospace", animation: 'fadeUp 0.8s 0.3s both' }}>
            Video Editor · Motion Designer · A&M Production
          </p>

          <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(245,245,240,0.5)', maxWidth: '440px', marginBottom: '40px', animation: 'fadeUp 0.8s 0.4s both' }}>
            Crafting visually stunning narratives through creative storytelling, motion graphics, and cinematic editing. Based in Jharkhand, India.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', animation: 'fadeUp 0.8s 0.5s both' }}>
            <a href="#work" style={{ background: 'var(--accent)', color: '#000', padding: '14px 32px', borderRadius: '3px', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 800, transition: 'all 0.2s', display: 'inline-block' }}
              onMouseEnter={e => { e.target.style.background = '#fff'; e.target.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.target.style.background = 'var(--accent)'; e.target.style.transform = 'translateY(0)' }}>
              View My Work
            </a>
            <a href="#contact" style={{ background: 'transparent', color: 'var(--white)', padding: '14px 32px', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.18)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 500, transition: 'all 0.2s', display: 'inline-block' }}
              onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; e.target.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)'; e.target.style.color = 'var(--white)'; e.target.style.transform = 'translateY(0)' }}>
              Get In Touch
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '40px', marginTop: '52px', animation: 'fadeUp 0.8s 0.6s both' }}>
            {[['50+', 'Projects'], ['30%', 'Avg. Engagement ↑'], ['100%', 'On-Time']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '34px', color: 'var(--white)', lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - Photo */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', animation: 'fadeIn 1s 0.3s both' }}>
          <div style={{ position: 'relative', width: 'min(340px, 90%)', aspectRatio: '3/4' }}>
            <div style={{ position: 'absolute', top: '-14px', left: '-14px', right: '14px', bottom: '14px', border: '1px solid rgba(232,255,60,0.12)', borderRadius: '2px', pointerEvents: 'none' }} />
            <div style={{ width: '100%', height: '100%', borderRadius: '2px', overflow: 'hidden', border: '1px solid rgba(232,255,60,0.12)' }}>
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80"
                alt="Yashika Agrawal"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', filter: 'grayscale(15%) contrast(1.1)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(5,5,5,0.75))' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '-18px', right: '-18px', background: 'var(--bg3)', border: '1px solid var(--border)', padding: '14px 18px', borderRadius: '2px' }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', color: 'var(--accent)', display: 'block', lineHeight: 1 }}>A&M</span>
              <span style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>Production</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
        @media(max-width:768px){
          section#home > div > div { grid-template-columns:1fr !important; }
          section#home > div > div > div:last-child { display:none !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── WORK SECTION ─── */
const TABS = [
  { id: 'videos', label: '📹 Video Edits', data: VIDEOS },
  { id: 'reels', label: '🎞 Reel Edits', data: REELS },
  { id: 'events', label: '🎬 Event Edits', data: EVENTS },
]

function Work({ onPlay }) {
  const [activeTab, setActiveTab] = useState('videos')
  const current = TABS.find(t => t.id === activeTab)

  return (
    <section id="work" style={{ padding: 'clamp(70px,10vw,100px) clamp(20px,5vw,40px)', maxWidth: '1300px', margin: '0 auto' }}>
      <FadeUp>
        <div style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: "'Space Mono', monospace", marginBottom: '12px' }}>— Selected Work</div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(44px,7vw,80px)', lineHeight: 1, marginBottom: '14px' }}>The Reel Deal</h2>
        <p style={{ fontSize: '15px', color: 'rgba(245,245,240,0.4)', maxWidth: '480px', lineHeight: 1.7, marginBottom: '48px' }}>From cinematic YouTube edits to viral reels and unforgettable event films.</p>
      </FadeUp>

      {/* Tabs */}
      <FadeUp delay={0.1}>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '10px 28px', background: activeTab === tab.id ? 'var(--accent)' : 'transparent',
              border: `1px solid ${activeTab === tab.id ? 'var(--accent)' : 'var(--border)'}`,
              color: activeTab === tab.id ? '#000' : 'var(--muted)',
              fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s', borderRadius: '3px',
              fontWeight: activeTab === tab.id ? 700 : 400,
            }}
              onMouseEnter={e => { if (activeTab !== tab.id) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--white)' } }}
              onMouseLeave={e => { if (activeTab !== tab.id) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' } }}
            >{tab.label}</button>
          ))}
        </div>
      </FadeUp>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,300px), 1fr))', gap: '20px' }}>
        {current.data.map((item, i) => (
          <FadeUp key={`${activeTab}-${item.id}`} delay={i * 0.07}>
            <VideoCard item={item} onPlay={onPlay} />
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

/* ─── ABOUT ─── */
function About() {
  return (
    <section id="about" style={{ padding: 'clamp(70px,10vw,100px) clamp(20px,5vw,40px)', background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '70px', alignItems: 'center' }}>
        {/* Photo */}
        <FadeUp>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-14px', left: '-14px', right: '14px', bottom: '14px', border: '1px solid rgba(232,255,60,0.12)', borderRadius: '2px' }} />
            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80"
              alt="Yashika"
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'top', borderRadius: '2px', border: '1px solid var(--border)', filter: 'grayscale(10%) contrast(1.1)' }}
            />
          </div>
        </FadeUp>

        {/* Text */}
        <FadeUp delay={0.15}>
          <div style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: "'Space Mono', monospace", marginBottom: '12px' }}>— About Me</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(38px,5vw,64px)', lineHeight: 1, marginBottom: '24px' }}>Behind<br />The Timeline</h2>
          <p style={{ color: 'rgba(245,245,240,0.5)', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
            Creative and detail-oriented BCA student at <strong style={{ color: 'var(--accent)' }}>Birla Institute of Technology, Lalpur</strong>. Currently editing at <strong style={{ color: 'var(--accent)' }}>A &amp; M Production</strong> — crafting reels, ads, and short-form content that actually stops the scroll.
          </p>
          <p style={{ color: 'rgba(245,245,240,0.5)', fontSize: '15px', lineHeight: 1.8, marginBottom: '32px' }}>
            Also serving as <strong style={{ color: 'var(--white)' }}>General Secretary</strong> of the CS Society — managing events with 300+ attendees and leading a team of 15. I bridge creative and technical worlds.
          </p>

          {/* Skills */}
          <div style={{ marginBottom: '28px' }}>
            {SKILLS.map(s => <SkillBar key={s.name} name={s.name} pct={s.pct} />)}
          </div>

          {/* Chips */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['Premiere Pro', 'Color Grading', 'Motion GFX', 'Sound Design', 'Canva', 'VFX', 'Reels', 'Events'].map(chip => (
              <span key={chip} style={{ padding: '7px 16px', border: '1px solid var(--border)', borderRadius: '100px', fontSize: '12px', letterSpacing: '1px', color: 'rgba(245,245,240,0.5)' }}>{chip}</span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─── CONTACT ─── */
function Contact() {
  const links = [
    { icon: '✉', label: 'Email', val: 'yashika.agrawal@email.com', href: 'mailto:yashika.agrawal@email.com' },
    { icon: '📞', label: 'Phone', val: '+91 78580 74691', href: 'tel:+917858074691' },
    { icon: '📸', label: 'Instagram Reels', val: 'View Reels on Instagram →', href: 'https://www.instagram.com/reel/DRcxZwXjWwg/' },
    { icon: '🎬', label: 'Portfolio Drive', val: 'Full Portfolio on Google Drive →', href: 'https://drive.google.com/drive/folders/1Zj6nmpsyda6QJkfpQWJ0cruu2IQGMip-?usp=drive_link' },
  ]

  return (
    <section id="contact" style={{ padding: 'clamp(70px,10vw,100px) clamp(20px,5vw,40px)', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '70px', alignItems: 'start' }}>
        <FadeUp>
          <div style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: "'Space Mono', monospace", marginBottom: '12px' }}>— Let's Work Together</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(38px,5vw,64px)', lineHeight: 1, marginBottom: '20px' }}>
            Got a<br />Project?<br />
            <span style={{ color: 'var(--accent)' }}>Let's Talk.</span>
          </h2>
          <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '15px', lineHeight: 1.7, maxWidth: '360px' }}>
            Whether it's a brand video, viral reel, or a full event film — I'm here to make it look absolutely cinematic.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {links.map(l => (
              <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '18px 22px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--white)', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,255,60,0.3)'; e.currentTarget.style.background = 'rgba(232,255,60,0.03)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg3)' }}
              >
                <div style={{ width: '42px', height: '42px', background: 'rgba(232,255,60,0.08)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{l.icon}</div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>{l.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: 500, marginTop: '3px' }}>{l.val}</div>
                </div>
              </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ padding: '32px clamp(20px,5vw,40px)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', letterSpacing: '4px', color: 'var(--accent)' }}>YASHIKA AGRAWAL</span>
      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>© 2025 · Video Editor · A&M Production</span>
      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Jharkhand, India</span>
    </footer>
  )
}

/* ─── APP ─── */
export default function App() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Work onPlay={setActiveVideo} />
      <About />
      <Contact />
      <Footer />
      <VideoModal item={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  )
}

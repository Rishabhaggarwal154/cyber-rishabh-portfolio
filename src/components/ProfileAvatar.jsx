import { useState } from 'react'
import { portfolio } from '../data/portfolio'

/**
 * Profile photo with a CSS/SVG fallback.
 * Change `portfolio.media.profileImage` once; every usage follows.
 */
export default function ProfileAvatar({ size = 200, className = '', priority = false }) {
  const [failed, setFailed] = useState(false)
  const initials = portfolio.identity.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border border-neon/35 bg-card ${className}`}
      style={{ width: size, height: size }}
    >
      {!failed ? (
        <img
          src={portfolio.media.profileImage}
          alt={`${portfolio.identity.name} — profile`}
          width={size}
          height={size}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${portfolio.identity.name} — default avatar`}
          className="relative grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,#1d3326_0%,#101a14_55%,#0b120e_100%)]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full opacity-[0.16]"
          >
            <defs>
              <pattern id="avatar-grid" width="18" height="18" patternUnits="userSpaceOnUse">
                <path d="M18 0H0V18" fill="none" stroke="#39FF88" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#avatar-grid)" />
            <circle cx="100" cy="100" r="66" fill="none" stroke="#39FF88" strokeWidth="0.8" strokeDasharray="3 6" />
            <circle cx="100" cy="100" r="48" fill="none" stroke="#39FF88" strokeWidth="0.6" />
            <path d="M100 22v28M100 150v28M22 100h28M150 100h28" stroke="#39FF88" strokeWidth="0.8" />
          </svg>

          <div className="relative flex flex-col items-center gap-1">
            <span
              className="font-mono font-bold leading-none tracking-[0.06em] text-neon"
              style={{ fontSize: Math.max(size * 0.28, 18) }}
            >
              {initials}
            </span>
            {size >= 120 ? (
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted">
                profile
              </span>
            ) : null}
          </div>

          <span
            aria-hidden="true"
            className="absolute inset-x-6 bottom-4 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent"
          />
        </div>
      )}
    </div>
  )
}

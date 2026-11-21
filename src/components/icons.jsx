/**
 * Brand icons are inlined because lucide-react no longer ships brand marks.
 * They inherit the current text color and are decorative by default.
 */

export function GithubIcon({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.9 3.17 9.05 7.57 10.52.55.1.75-.24.75-.53v-1.87c-3.08.67-3.73-1.48-3.73-1.48-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.67.08-.67 1.1.08 1.68 1.14 1.68 1.14.99 1.69 2.59 1.2 3.22.92.1-.71.39-1.2.7-1.48-2.46-.28-5.05-1.23-5.05-5.47 0-1.21.43-2.2 1.14-2.97-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.03 1.13a10.5 10.5 0 0 1 5.51 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.71.77 1.14 1.76 1.14 2.97 0 4.25-2.6 5.18-5.07 5.46.4.35.76 1.03.76 2.08v3.09c0 .29.2.64.76.53a11.1 11.1 0 0 0 7.56-10.51C23.1 5.33 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function BrandMark({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`grid place-items-center rounded-lg border border-neon/30 bg-neon/[0.07] font-mono text-neon ${className}`}
    >
      <span className="translate-y-px text-[13px] font-bold tracking-tighter">&gt;_</span>
    </span>
  );
}

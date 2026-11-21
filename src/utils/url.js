/**
 * Returns the URL only when it is an absolute HTTP(S) URL.
 * This keeps configuration mistakes such as `javascript:` links from ever
 * becoming active anchors.
 */
export function safeHttpUrl(value) {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (!trimmed) return ''

  try {
    const url = new URL(trimmed)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : ''
  } catch {
    return ''
  }
}

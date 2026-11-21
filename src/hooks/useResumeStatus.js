import { useEffect, useState } from 'react'
import { portfolio } from '../data/portfolio'

let cachedStatus = null
let pendingRequest = null

/**
 * Checks whether the configured resume PDF is actually present.
 * A dev-server SPA fallback can return HTML for missing files, so the content
 * type is verified as well as the HTTP status.
 */
async function checkResume() {
  try {
    const response = await fetch(portfolio.media.resume, {
      method: 'HEAD',
      cache: 'no-store',
    })
    const contentType = response.headers.get('content-type') ?? ''
    return response.ok && contentType.toLowerCase().includes('pdf') ? 'available' : 'missing'
  } catch {
    return 'missing'
  }
}

export function useResumeStatus() {
  const [status, setStatus] = useState(cachedStatus ?? 'checking')

  useEffect(() => {
    let mounted = true

    if (!pendingRequest) {
      pendingRequest = checkResume().then((result) => {
        cachedStatus = result
        return result
      })
    }

    pendingRequest.then((result) => {
      if (mounted) setStatus(result)
    })

    return () => {
      mounted = false
    }
  }, [])

  return status
}

import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { publicUrl } from '../lib/env'

export type CvStatus = 'checking' | 'available' | 'missing'

export const cvUrl = publicUrl(profile.cvPath)

let pending: Promise<boolean> | undefined

/** One shared check per page load. Dev servers answer unknown paths with HTML, so require a PDF. */
function checkCv(): Promise<boolean> {
  pending ??= fetch(cvUrl, { method: 'HEAD' })
    .then((res) => res.ok && (res.headers.get('content-type') ?? '').includes('pdf'))
    .catch(() => false)
  return pending
}

/** Reports whether the CV PDF exists so the UI can fall back gracefully when it does not. */
export function useCvAvailable(): CvStatus {
  const [status, setStatus] = useState<CvStatus>('checking')

  useEffect(() => {
    let cancelled = false
    void checkCv().then((ok) => {
      if (!cancelled) setStatus(ok ? 'available' : 'missing')
    })
    return () => {
      cancelled = true
    }
  }, [])

  return status
}

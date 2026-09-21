import { profile } from '../data/profile'
import { publicUrl } from '../lib/env'

export type CvStatus = 'available' | 'missing'

export const cvUrl = publicUrl(profile.cvPath)

/**
 * Whether the CV PDF was present in `public/cv/` when the site was built. Decided at build time,
 * so a missing file never causes a failed network request; the UI falls back to "Request CV".
 */
export function useCvAvailable(): CvStatus {
  return __CV_AVAILABLE__ ? 'available' : 'missing'
}

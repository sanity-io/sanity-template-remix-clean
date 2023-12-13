import { useLocation, useNavigate } from '@remix-run/react'
import type { HistoryUpdate } from '@sanity/overlays'
import { enableOverlays } from '@sanity/overlays'
import { useLiveMode } from '@sanity/react-loader'
import { useEffect, useRef } from 'react'

import { client } from '~/sanity/client'

export default function VisualEditing() {
  const navigateRemix = useNavigate()
  const navigateComposerRef = useRef<null | ((update: HistoryUpdate) => void)>(
    null,
  )

  useEffect(() => {
    const disable = enableOverlays({
      history: {
        subscribe: (navigate) => {
          navigateComposerRef.current = navigate
          return () => {
            navigateComposerRef.current = null
          }
        },
        update: (update) => {
          if (update.type === 'push' || update.type === 'replace') {
            navigateRemix(update.url, { replace: update.type === 'replace' })
          } else if (update.type === 'pop') {
            navigateRemix(-1)
          }
        },
      },
    })
    return () => disable()
  }, [navigateRemix])

  const location = useLocation()
  useEffect(() => {
    if (navigateComposerRef.current) {
      navigateComposerRef.current({
        type: 'push',
        url: `${location.pathname}${location.search}${location.hash}`,
      })
    }
  }, [location.hash, location.pathname, location.search])

  // Enable live queries using the client configuration
  useLiveMode({ client })

  return null
}

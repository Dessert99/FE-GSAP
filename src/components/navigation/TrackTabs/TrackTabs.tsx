import type { MouseEvent } from 'react'
import { getTrackHref } from '../../../app/routes'
import type { TrackDefinition, TrackId } from '../../../app/routes'

type Props = {
  tracks: TrackDefinition[]
  activeTrackId: TrackId
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, path: string) => void
}

export function TrackTabs({ tracks, activeTrackId, onNavigate }: Props) {
  return (
    <nav className="track-tabs" aria-label="학습 트랙">
      {tracks.map((track) => {
        const href = getTrackHref(track)

        return (
          <a
            key={track.id}
            className="track-tabs__link"
            href={href}
            aria-current={track.id === activeTrackId ? 'page' : undefined}
            onClick={(event) => onNavigate(event, href)}
          >
            {track.label}
          </a>
        )
      })}
    </nav>
  )
}

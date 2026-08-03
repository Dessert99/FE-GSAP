/** 학습 관점을 전환하면서 브라우저 기본 링크 동작도 보존하는 탭을 제공한다. */
import type { MouseEvent } from 'react'
import { getTrackHref, toHref } from '../../../app/routes'
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
        const path = getTrackHref(track)

        return (
          <a
            key={track.id}
            className="track-tabs__link"
            href={toHref(path)}
            aria-current={track.id === activeTrackId ? 'page' : undefined}
            onClick={(event) => onNavigate(event, path)}
          >
            {track.label}
          </a>
        )
      })}
    </nav>
  )
}

import { describe, expect, it } from 'vitest'
import { getTrackHref, resolveRoute, tracks } from './routes'

describe('learning routes', () => {
  it('resolves the first fundamentals lesson from the root path', () => {
    expect(resolveRoute('/')).toMatchObject({
      trackId: 'fundamentals',
      lessonSlug: 'gsap-to',
      canonicalPath: '/fundamentals/gsap-to',
    })
  })

  it('keeps overview routes for tracks without a lesson', () => {
    expect(resolveRoute('/patterns')).toMatchObject({
      trackId: 'patterns',
      lessonSlug: null,
      canonicalPath: '/patterns',
    })
  })

  it('falls back to the first lesson when a fundamentals slug is unknown', () => {
    expect(resolveRoute('/fundamentals/not-found').canonicalPath).toBe('/fundamentals/gsap-to')
  })

  it('uses a track first lesson as its tab destination', () => {
    expect(getTrackHref(tracks[0])).toBe('/fundamentals/gsap-to')
    expect(getTrackHref(tracks[1])).toBe('/patterns')
  })
})

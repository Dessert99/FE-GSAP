/** P38이 소유한 여섯 canonical을 item-level coverage 기준으로 고정한다. */
export const scrollSmootherControlCatalog = [
  {
    id: 'SSC-145',
    officialItem:
      'getVelocity() returns the current smoothed scroll velocity in pixels per second.',
    sectionId: 'state-reads',
  },
  {
    id: 'SSC-146',
    officialItem:
      'kill() kills the whole ScrollSmoother and applied effects; installed cleanup restores owned wrapper/content state.',
    sectionId: 'cleanup',
  },
  {
    id: 'SSC-147',
    officialItem:
      'offset(target, position) calculates the numeric pixel position; installed 3.15 adds ignoreSpeed? and divides st.start by smoother speed when true.',
    sectionId: 'state-reads',
  },
  {
    id: 'SSC-148',
    officialItem:
      'paused() gets or sets the input gate, blocking the scrollbar while instance scrollTop() and scrollTo() commands remain available.',
    sectionId: 'pause-command',
  },
  {
    id: 'SSC-150',
    officialItem:
      'scrollTo(target, smooth, position) accepts a number or target, uses configured smoothing only when requested, supports two-part positions, and works while paused.',
    sectionId: 'scroll-command',
  },
  {
    id: 'SSC-151',
    officialItem:
      'scrollTop() reads pixels or sets them immediately while paused; rendered docs type the setter as void while installed 3.15 source and declarations return this.',
    sectionId: 'scroll-command',
  },
] as const

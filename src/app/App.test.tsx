import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from './App'

describe('App learning shell', () => {
  beforeEach(() => window.history.replaceState(null, '', '/fundamentals/gsap-to'))

  it('shows all three learning tracks without a code panel', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: '기본' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: '패턴' })).toBeVisible()
    expect(screen.getByRole('link', { name: '실무' })).toBeVisible()
    expect(screen.queryByLabelText(/코드/)).not.toBeInTheDocument()
  })

  it('changes tracks without a page reload', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: '패턴' }))

    expect(window.location.pathname).toBe('/patterns')
    expect(await screen.findByRole('heading', { name: '패턴' })).toBeVisible()
  })
})

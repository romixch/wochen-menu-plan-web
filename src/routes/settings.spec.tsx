import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Settings from './settings'
import { act } from 'react-dom/test-utils'

describe('Settings', () => {
  it('should provide link to go back to root', async () => {
    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    )
    const backButton = screen.getByRole('link', { name: 'Zurück' })
    expect(backButton).toBeInTheDocument()
    expect(backButton.getAttribute('href')).toBe('/')
  })

  it('should show login and register section when not logged in', async () => {
    localStorage.setItem('LoginState', 'not logged in')
    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    )
    const loginButton = await screen.findByText('Login')
    expect(loginButton).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Settings from './settings'

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

  it('should show cancel button when waiting for onetime token', async () => {
    localStorage.setItem('LoginState', 'waiting for onetime token')
    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    )
    const cancelButton = await screen.findByText('Abbrechen')
    userEvent.click(cancelButton)
    const loginButton = await screen.findByText('Login')
    expect(loginButton).toBeInTheDocument()
  })
})

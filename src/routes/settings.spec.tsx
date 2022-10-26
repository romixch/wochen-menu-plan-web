import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Settings from "./settings"

describe('Settings', () => {
    it('should provide link to go back to root', async () => {
        render(<MemoryRouter><Settings /></MemoryRouter>)
        const backButton = screen.getByRole('link', { name: 'Zurück' })
        expect(backButton).toBeInTheDocument();
        expect(backButton.getAttribute("href")).toBe('/')
    })

    it('should show login and register section when not logged in', async () => {
        render(<MemoryRouter><Settings /></MemoryRouter>)
        expect(screen.getByText('Login')).toBeInTheDocument()
    })
})
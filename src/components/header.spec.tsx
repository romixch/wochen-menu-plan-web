import { render, screen } from "@testing-library/react"
import Header from "./header"

describe('header', () => {
    it('should display a title', async () => {
        render(<Header title="Header Title" />)
        expect(screen.getByText(/Header Title/)).toBeInTheDocument()
    })

    it('should render left and right element', async () => {
        render(<Header title="bla" Left={<div>This is left</div>} Right={<div>This is right</div>} />)
        expect(screen.getByText(/This is left/)).toBeInTheDocument()
        expect(screen.getByText(/This is right/)).toBeInTheDocument()
    })
})
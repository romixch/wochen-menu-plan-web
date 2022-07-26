import { render } from "@testing-library/react"
import { screen } from '@testing-library/dom'
import WeekSelector from "./week-selector"
import { act } from "react-dom/test-utils"
import { click } from "@testing-library/user-event/dist/click"

describe('week-selector', () => {
    afterEach(() => {
        jest.useRealTimers()
    })

    it('should initially display current week', async () => {
        render(<WeekSelector />)
        expect(await screen.findByText(/Diese Woche/)).toBeInTheDocument()
    })

    it('should have a left arrow to move to last week', async () => {
        render(<WeekSelector />)
        const left = await screen.findByRole('button', { name: /links/ })
        expect(left).toBeInTheDocument()
        act(() => {
            click(left)
        })
        expect(await screen.findByText(/Letzte Woche/)).toBeInTheDocument()
    })

    it('should have a right arrow to move to next week', async () => {
        render(<WeekSelector />)
        const right = await screen.findByRole('button', { name: /rechts/ })
        expect(right).toBeInTheDocument()
        act(() => {
            click(right)
        })
        expect(await screen.findByText(/Nächste Woche/)).toBeInTheDocument()
    })

    it('should jump to this week when clicking the title', async () => {
        render(<WeekSelector />)
        const left = await screen.findByRole('button', { name: /links/ })
        act(() => click(left))
        act(() => click(left))
        expect(await screen.findByText(/Vorletzte Woche/)).toBeInTheDocument()
        const title = await screen.findByText("Vorletzte Woche")
        act(() => click(title))
        expect(await screen.findByText(/Diese Woche/)).toBeInTheDocument()
    })

    it('should display date', async () => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date('2022-07-20'))
        render(<WeekSelector />)
        expect(await screen.findByText(/18.7. - 24.7./)).toBeInTheDocument()
    })

})
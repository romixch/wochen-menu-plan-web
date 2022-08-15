import { render, screen } from "@testing-library/react"
import { click } from "@testing-library/user-event/dist/click"
import { act } from "react-dom/test-utils"
import { MenuDailyPlan } from "../model/model"
import MenuCard from "./menu-card"

describe('MenuCard', () => {

    const emptyDailyPlan: MenuDailyPlan = {
        date: '2022-07-26',
        courses: []
    }

    const simpleDailyPlan: MenuDailyPlan = {
        date: '2022-07-26',
        courses: [
            { id: 0, meal: 'breakfast', description: 'Pancakes', sequence: 0 }
        ]
    }

    it('should show a summary of a day', async () => {
        render(<MenuCard dailyPlan={simpleDailyPlan} />)
        expect(await screen.findByText(/Di/)).toBeInTheDocument()
        expect(await screen.getAllByText(/Pancakes/).length).toBeGreaterThanOrEqual(1)
    })

    it('should open when summary is clicked', async () => {
        render(<MenuCard dailyPlan={simpleDailyPlan} />)
        const title = await screen.findByText(/Di/)
        act(() => { click(title) })

        expect(await screen.findByText(/Dienstag/)).toBeInTheDocument()
    })

    it('should show add button when open', async () => {
        render(<MenuCard dailyPlan={simpleDailyPlan} />)
        const title = await screen.findByText(/Di/)
        act(() => { click(title) })
        expect(await screen.findByRole('button', { name: 'hinzufügen' }))
    })

    it('should show meal selection when add button is clicked', async () => {
        render(<MenuCard dailyPlan={simpleDailyPlan} />)
        const title = await screen.findByText(/Di/)
        act(() => { click(title) })
        const addButton = await screen.findByRole('button', { name: 'hinzufügen' })
        act(() => { click(addButton) })
        expect(await screen.findByRole('button', { name: /Morgen/ }))
        expect(await screen.findByRole('button', { name: /Mittag/ }))
        expect(await screen.findByRole('button', { name: /Abend/ }))
    })

    it('should display add button right away when there is no course yet', async () => {
        render(<MenuCard dailyPlan={emptyDailyPlan} />)
        const addButton = await screen.findByRole('button', { name: 'hinzufügen' })
        expect(addButton).toBeInTheDocument()
    })
})
import { render, screen } from "@testing-library/react"
import { click } from "@testing-library/user-event/dist/click"
import { act } from "react-dom/test-utils"
import { MenuDailyPlan } from "../model/model"
import useDailyPlanStore from "../storage/daily-plan-store"
import MenuCard from "./menu-card"

describe('MenuCard', () => {

    const emptyDailyPlan: MenuDailyPlan = {
        date: '2022-07-26',
        courses: []
    }

    const simpleDailyPlan: MenuDailyPlan = {
        date: '2022-07-27',
        courses: [
            { id: 0, meal: 'breakfast', description: 'Pancakes', sequence: 0 }
        ]
    }

    beforeEach(() => {
        useDailyPlanStore.setState({ plans: [emptyDailyPlan, simpleDailyPlan] })
    })

    it('should show a summary of a day', async () => {
        render(<MenuCard dailyPlanDate={simpleDailyPlan.date} />)
        expect(await screen.findByText(/Mi/)).toBeInTheDocument()
        expect(screen.getAllByText(/Pancakes/).length).toBeGreaterThanOrEqual(1)
    })

    it('should open when summary is clicked', async () => {
        render(<MenuCard dailyPlanDate={simpleDailyPlan.date} />)
        const title = await screen.findByText(/Mi/)
        act(() => { click(title) })

        expect(await screen.findByText(/Mittwoch/)).toBeInTheDocument()
    })

    it('should not close when there is no course yet', async () => {
        render(<MenuCard dailyPlanDate={emptyDailyPlan.date} />)
        const title = await screen.findByText(/Dienstag/)
        act(() => click(title))
        expect(await screen.findByText(/Dienstag/)).toBeInTheDocument()
    })

    it('should show add button when open', async () => {
        render(<MenuCard dailyPlanDate={simpleDailyPlan.date} />)
        const title = await screen.findByText(/Mi/)
        act(() => { click(title) })
        expect(await screen.findByRole('button', { name: 'hinzufügen' }))
    })

    it('should show meal selection when add button is clicked', async () => {
        render(<MenuCard dailyPlanDate={simpleDailyPlan.date} />)
        const title = await screen.findByText(/Mi/)
        act(() => click(title))
        const addButton = await screen.findByRole('button', { name: 'hinzufügen' })
        act(() => click(addButton))
        expect(await screen.findByRole('button', { name: /Morgen/ }))
        expect(await screen.findByRole('button', { name: /Mittag/ }))
        expect(await screen.findByRole('button', { name: /Abend/ }))
    })

    it('should display add button right away when there is no course yet', async () => {
        render(<MenuCard dailyPlanDate={emptyDailyPlan.date} />)
        const addButton = await screen.findByRole('button', { name: 'hinzufügen' })
        expect(addButton).toBeInTheDocument()
    })
})
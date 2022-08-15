import { render, screen } from "@testing-library/react"
import { MenuDailyPlan } from "../model/model"
import MenuCardEdit from "./menu-card-edit"

describe('MenuCardEdit', () => {

    const simpleDailyPlan: MenuDailyPlan = {
        date: '2022-07-26',
        courses: [
            { id: 0, meal: 'breakfast', description: 'Pancakes', sequence: 0 },
            { id: 1, meal: 'lunch', description: 'Spaghetti', sequence: 0 }
        ]
    }

    it('should display titles', async () => {
        render(<MenuCardEdit dailyPlan={simpleDailyPlan} />)

        expect(await screen.findByText(/Morgen/)).toBeInTheDocument()
        expect(await screen.findByText(/Mittag/)).toBeInTheDocument()
    })
})
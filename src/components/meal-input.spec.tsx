import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Course } from "../model/model"
import MealInput from "./meal-input"

describe('MealInput', () => {
    it('should display the title of the meal', async () => {
        const courses: Course[] = [
            { id: 0, meal: 'breakfast', description: 'Pancakes', sequence: 0 },
        ]
        render(<MealInput meal="breakfast" courses={courses} onCourseChange={() => { }} />)
    })

    it('should call back when course changed', async () => {
        const callback = jest.fn()
        const courses: Course[] = [
            { id: 0, meal: 'breakfast', description: 'Pancakes', sequence: 0 },
        ]
        render(<MealInput meal="breakfast" courses={courses} onCourseChange={callback} />)
        const textBox = await screen.findByRole('textbox')

        userEvent.type(textBox, '{selectall}Birchermüesli')
        fireEvent.blur(textBox)

        expect(callback).toBeCalledWith({ id: 0, meal: 'breakfast', description: 'Birchermüesli', sequence: 0 })
    })
})
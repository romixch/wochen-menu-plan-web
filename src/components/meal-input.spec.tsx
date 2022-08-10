import { render } from "@testing-library/react"
import { Course } from "../model/model"
import MealInput from "./meal-input"

describe('MealInput', () => {
    it('should display the title of the meal', async () => {
        const courses: Course[] = [
            { id: 0, meal: 'breakfast', description: 'Pancakes', sequence: 0 },
        ]
        render(<MealInput meal="breakfast" courses={courses} />)
    })
})
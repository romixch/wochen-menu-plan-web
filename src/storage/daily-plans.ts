import { MenuPlan } from "../model/model"

const getMenuPlan = async (from: Date, to: Date): Promise<MenuPlan> => {
    return Promise.resolve({
        dailyPlans: [{
            date: '2022-07-25',
            courses: [
                { id: 1, meal: 'breakfast', description: "Pancakes", sequence: 0, },
                { id: 2, meal: 'lunch', description: 'Spaghetti mit Zucchetti -Zitronensauce', sequence: 1 },
                { id: 3, meal: 'lunch', description: 'Ravioli-Herzen', sequence: 2 }
            ]
        },
        { date: '2022-07-26', courses: [] },
        { date: '2022-07-27', courses: [] },
        { date: '2022-07-28', courses: [] },
        { date: '2022-07-29', courses: [] },
        { date: '2022-07-30', courses: [] },
        { date: '2022-07-31', courses: [] },
        ]
    })
}

export { getMenuPlan }
import create from 'zustand'
import { MenuDailyPlan } from '../model/model';

interface DailyPlanStore {
    weekOffset: number,
    incrementWeekOffset: () => void
    decrementWeekOffset: () => void
    resetWeekOffset: () => void
    plans: MenuDailyPlan[]
}

const useDailyPlanStore = create<DailyPlanStore>((set) => ({
    weekOffset: 0,
    incrementWeekOffset: () => set((state) => ({ weekOffset: state.weekOffset + 1 })),
    decrementWeekOffset: () => set((state) => ({ weekOffset: state.weekOffset - 1 })),
    resetWeekOffset: () => set((state) => ({ weekOffset: 0 })),
    plans: [{
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
}))

export default useDailyPlanStore;
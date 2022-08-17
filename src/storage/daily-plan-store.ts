import { addDays, addWeeks, format, startOfWeek } from 'date-fns';
import create from 'zustand'
import { MenuDailyPlan } from '../model/model';

interface DailyPlanStore {
    weekOffset: number,
    incrementWeekOffset: () => void
    decrementWeekOffset: () => void
    resetWeekOffset: () => void
    getCurrentWeekDates: (now: Date) => string[]
    plans: MenuDailyPlan[]
    getPlan: (date: string) => MenuDailyPlan
}

const useDailyPlanStore = create<DailyPlanStore>((set, get) => ({
    weekOffset: 0,
    incrementWeekOffset: () => set((state) => ({ weekOffset: state.weekOffset + 1 })),
    decrementWeekOffset: () => set((state) => ({ weekOffset: state.weekOffset - 1 })),
    resetWeekOffset: () => set(() => ({ weekOffset: 0 })),
    getCurrentWeekDates: (now) => {
        const startDate = startOfWeek(addWeeks(now, get().weekOffset), { weekStartsOn: 1 })
        return [
            format(startDate, "yyyy-MM-dd"),
            format(addDays(startDate, 1), "yyyy-MM-dd"),
            format(addDays(startDate, 2), "yyyy-MM-dd"),
            format(addDays(startDate, 3), "yyyy-MM-dd"),
            format(addDays(startDate, 4), "yyyy-MM-dd"),
            format(addDays(startDate, 5), "yyyy-MM-dd"),
            format(addDays(startDate, 6), "yyyy-MM-dd")
        ]
    },
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
    ],
    getPlan: (dateString) => {
        const dailyPlan = get().plans.find(p => p.date === dateString)
        if (dailyPlan) {
            return dailyPlan
        } else {
            return { date: dateString, courses: [] }
        }
    }
}))

export default useDailyPlanStore;
import { addDays, addWeeks, format, startOfWeek } from 'date-fns';
import create from 'zustand'
import { Course, MenuDailyPlan } from '../model/model';

interface DailyPlanStore {
    weekOffset: number,
    incrementWeekOffset: () => void
    decrementWeekOffset: () => void
    resetWeekOffset: () => void
    getCurrentWeekDates: (now: Date) => string[]

    plans: MenuDailyPlan[]
    setPlan: (dailyPlan: MenuDailyPlan) => void
    updateCourse: (date: string, course: Course) => void
}

const calculateCurrentWeekDates = (now: Date, weekOffset: number) => {
    const startDate = startOfWeek(addWeeks(now, weekOffset), { weekStartsOn: 1 })
    return [
        format(startDate, "yyyy-MM-dd"),
        format(addDays(startDate, 1), "yyyy-MM-dd"),
        format(addDays(startDate, 2), "yyyy-MM-dd"),
        format(addDays(startDate, 3), "yyyy-MM-dd"),
        format(addDays(startDate, 4), "yyyy-MM-dd"),
        format(addDays(startDate, 5), "yyyy-MM-dd"),
        format(addDays(startDate, 6), "yyyy-MM-dd")
    ]
}

const useDailyPlanStore = create<DailyPlanStore>((set, get) => ({
    weekOffset: 0,
    incrementWeekOffset: () => {
        const currentWeekDates = calculateCurrentWeekDates(new Date(), get().weekOffset + 1)
        const plans: MenuDailyPlan[] = currentWeekDates.map(weekDate => ({ date: weekDate, courses: [] }))
        set((state) => ({ weekOffset: state.weekOffset + 1, plans }))

    },
    decrementWeekOffset: () => {
        const currentWeekDates = calculateCurrentWeekDates(new Date(), get().weekOffset - 1)
        const plans: MenuDailyPlan[] = currentWeekDates.map(weekDate => ({ date: weekDate, courses: [] }))
        set((state) => ({ weekOffset: state.weekOffset - 1, plans }))

    },
    resetWeekOffset: () => {
        const currentWeekDates = calculateCurrentWeekDates(new Date(), 0)
        const plans: MenuDailyPlan[] = currentWeekDates.map(weekDate => ({ date: weekDate, courses: [] }))
        set(() => ({ weekOffset: 0, plans }))

    },
    getCurrentWeekDates: (now) => {
        return calculateCurrentWeekDates(now, get().weekOffset)
    },

    plans: calculateCurrentWeekDates(new Date(), 0).map(date => ({ date, courses: [] })),
    setPlan: (dailyPlan) => {
        const plans = get().plans
        const planIndex = plans.findIndex(p => p.date === dailyPlan.date)
        const newPlans = [...plans]
        newPlans[planIndex] = dailyPlan
        set({ plans: newPlans })
    },
    updateCourse(date, course) {
        const plan = getPlan(date)(get())
        const newCourses = [...plan.courses]
        const newCourseIndex = newCourses.findIndex(c => c.id === course.id)
        newCourses[newCourseIndex] = course
        const newPlans = [...get().plans]
        const newPlanIndex = newPlans.findIndex(p => p.date === date)
        newPlans[newPlanIndex] = { date, courses: newCourses, revision: plan.revision }
        set({ plans: newPlans })
    },
}))

const getPlan = (date: string) => (state: DailyPlanStore) => {
    const dailyPlan = state.plans.find(p => p.date === date)
    if (dailyPlan) {
        return dailyPlan
    } else {
        return { date, courses: [] }
    }
}

export default useDailyPlanStore;
export { getPlan }
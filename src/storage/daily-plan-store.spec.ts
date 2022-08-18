import useDailyPlanStore from "./daily-plan-store"

describe('DailyPlanStore', () => {
    afterEach(() => {
        useDailyPlanStore.getState().resetWeekOffset()
    })

    it('should increment week offset', () => {
        useDailyPlanStore.getState().incrementWeekOffset()
        expect(useDailyPlanStore.getState().weekOffset).toBe(1)
    })

    it('should load empty plans when incrementing week offset', () => {
        useDailyPlanStore.getState().incrementWeekOffset()

        const plans = useDailyPlanStore.getState().plans
        const coursesCount = plans.map(p => p.courses.length).reduce((acc, curr) => acc + curr)
        expect(plans.length).toBe(7)
        expect(coursesCount).toBe(0)
    })

    it('should decrement week offset', () => {
        useDailyPlanStore.getState().decrementWeekOffset()
        expect(useDailyPlanStore.getState().weekOffset).toBe(-1)
    })

    it('should reset week offset', () => {
        useDailyPlanStore.getState().decrementWeekOffset()
        useDailyPlanStore.getState().decrementWeekOffset()
        useDailyPlanStore.getState().decrementWeekOffset()
        useDailyPlanStore.getState().decrementWeekOffset()
        useDailyPlanStore.getState().resetWeekOffset()
        expect(useDailyPlanStore.getState().weekOffset).toBe(0)
    })

    it('should return current week dates', () => {
        const currentWeekDates = useDailyPlanStore.getState().getCurrentWeekDates(new Date('2022-08-16'))
        expect(currentWeekDates[0]).toBe('2022-08-15')
        expect(currentWeekDates[1]).toBe('2022-08-16')
        expect(currentWeekDates[2]).toBe('2022-08-17')
        expect(currentWeekDates[3]).toBe('2022-08-18')
        expect(currentWeekDates[4]).toBe('2022-08-19')
        expect(currentWeekDates[5]).toBe('2022-08-20')
        expect(currentWeekDates[6]).toBe('2022-08-21')
    })

    it('should return next week dates', () => {
        useDailyPlanStore.getState().incrementWeekOffset()
        const currentWeekDates = useDailyPlanStore.getState().getCurrentWeekDates(new Date('2022-08-16'))
        expect(currentWeekDates[0]).toBe('2022-08-22')
        expect(currentWeekDates[1]).toBe('2022-08-23')
        expect(currentWeekDates[2]).toBe('2022-08-24')
        expect(currentWeekDates[3]).toBe('2022-08-25')
        expect(currentWeekDates[4]).toBe('2022-08-26')
        expect(currentWeekDates[5]).toBe('2022-08-27')
        expect(currentWeekDates[6]).toBe('2022-08-28')
    })

    it('should return daily plan for a date', () => {
        useDailyPlanStore.setState({
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
        })

        const plan25 = useDailyPlanStore.getState().getPlan('2022-07-25')
        const plan26 = useDailyPlanStore.getState().getPlan('2022-07-26')

        expect(plan25.date).toBe('2022-07-25')
        expect(plan25.courses.length).toBe(3)
        expect(plan26.date).toBe('2022-07-26')
        expect(plan26.courses.length).toBe(0)
    })

    it('should update plan', () => {
        const firstDate = useDailyPlanStore.getState().plans[0].date
        const secondDate = useDailyPlanStore.getState().plans[1].date
        useDailyPlanStore.getState().setPlan({
            date: firstDate,
            courses: [{ id: 1, meal: 'breakfast', description: 'Zmörgele', sequence: 0 }]
        })
        useDailyPlanStore.getState().setPlan({
            date: secondDate,
            courses: [{ id: 1, meal: 'dinner', description: 'Nachtessen', sequence: 0 }]
        })

        const firstPlan = useDailyPlanStore.getState().getPlan(firstDate)
        expect(firstPlan.date).toBe(firstDate)
        expect(firstPlan.courses.length).toBe(1)
        const secondPlan = useDailyPlanStore.getState().getPlan(secondDate)
        expect(secondPlan.date).toBe(secondDate)
        expect(secondPlan.courses.length).toBe(1)
    })

    it('should update a course', async () => {
        const firstDate = useDailyPlanStore.getState().plans[0].date
        const planFirstDate = useDailyPlanStore.getState().getPlan(firstDate)
        useDailyPlanStore.getState().setPlan({ ...planFirstDate, courses: [{ id: 1, meal: 'lunch', description: 'Spaghetti', sequence: 1 }] })
        useDailyPlanStore.getState().updateCourse(firstDate, { id: 1, meal: 'lunch', description: 'Risotto', sequence: 1 })
        const plan = useDailyPlanStore.getState().getPlan(firstDate)
        const course = plan.courses.find(course => course.id === 1)

        expect(course?.description).toBe('Risotto')
    })
})
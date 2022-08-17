import useDailyPlanStore from "./daily-plan-store"

describe('DailyPlanStore', () => {
    afterEach(() => {
        useDailyPlanStore.setState({ weekOffset: 0 })
    })

    it('should increment week offset', () => {
        useDailyPlanStore.getState().incrementWeekOffset()
        expect(useDailyPlanStore.getState().weekOffset).toBe(1)
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
    })
})
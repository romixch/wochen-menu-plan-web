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
})
import { getMenuPlan } from "./daily-plans"

describe('Fake daily plans', () => {
    it('should return some fake daily plan for now', async () => {
        const menuPlan = await getMenuPlan(new Date('2022-07-25'), new Date('2022-07-31'))
        expect(menuPlan).toBeDefined()
    })
})
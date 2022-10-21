import { getId } from "./cloud-auth"

describe('Cloud authentication', () => {
    it('should generate a new id if none exists and constantly return that', async () => {
        const id1 = await getId()
        const id2 = await getId();
        const id3 = await getId();

        expect(id2).toEqual(id1);
        expect(id3).toEqual(id1);
    })
})
import { setupServerMock } from "./server-mock"
import { fetchMenus as fetchServerMenus } from "./server"

describe('Server', () => {

    const server = setupServerMock()

    beforeAll(() => {
        server.listen()
    })

    afterEach(() => {
        server.resetHandlers()
    })

    afterAll(() => {
        server.close()
    })

    it('should return all menus', async () => {
        const serverMenus = await fetchServerMenus("roman.schaller@gmail.com", "0", "the-correct-access-token")
        expect(serverMenus.dailyPlans.length).toEqual(1)
        expect(serverMenus.dailyPlans[0].date).toEqual('2022-10-19')
        expect(serverMenus.dailyPlans[0].courses[0].description).toEqual('Pizza Diavola')
        expect(serverMenus.dailyPlans[0].courses[1].description).toEqual('Kartoffelgratin')
    })

    it('should throw Exception when access token does not match', async () => {
        const serverMenusResponse = fetchServerMenus("roman.schaller@gmail.com", "0", "total-nonsense-access-token")
        await expect(serverMenusResponse).rejects.toEqual(new Error('Wrong access token'))
    })
})
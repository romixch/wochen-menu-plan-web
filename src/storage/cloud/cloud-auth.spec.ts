import { getAccessToken, getAccountEmail, getId, getLoginState, getShareData, loginByShareData, logout, registerAccount, requestAccessToken, setAccountEmail } from "./cloud-auth"
import { setupServerMock } from "./server-mock"

describe('Cloud authentication', () => {

    const server = setupServerMock()

    beforeAll(() => {
        server.listen()
    })

    afterEach(async () => {
        server.resetHandlers()
        await logout()
    })

    afterAll(() => {
        server.close()
    })

    it('should generate a new id if none exists and constantly return that', async () => {
        const id1 = await getId()
        const id2 = await getId();
        const id3 = await getId();

        expect(id2).toEqual(id1);
        expect(id3).toEqual(id1);
    })

    it('should set and get account id correctly', async () => {
        await setAccountEmail('roman.schaller@gmail.com');

        expect(await getAccountEmail()).toEqual('roman.schaller@gmail.com')
    })

    it('should handle a happy register process correctly', async () => {
        await setAccountEmail('roman.schaller@gmail.com')
        expect(await getLoginState()).toEqual('not logged in')
        await registerAccount()
        expect(await getLoginState()).toEqual('waiting for onetime token')
        expect(await requestAccessToken('123456')).toBeTruthy()
        expect(await getLoginState()).toEqual('logged in')
        expect(await getAccessToken()).toEqual('the-correct-access-token')
    })

    it('should return false on requestAccessToken when it is wrong', async () => {
        await setAccountEmail('roman.schaller@gmail.com')
        expect(await getLoginState()).toEqual('not logged in')
        await registerAccount()
        expect(await getLoginState()).toEqual('waiting for onetime token')
        expect(await requestAccessToken('wrongg')).toBeFalsy()
        expect(await getLoginState()).toEqual('not logged in')
        expect(await getAccessToken()).toBeNull()
    })

    it('should handle a happy login by share data correctly', async () => {
        await setAccountEmail('roman.schaller@gmail.com')
        await registerAccount()
        await requestAccessToken('123456')

        const shareData = JSON.parse(await getShareData())

        logout()
        expect(await getLoginState()).toEqual('not logged in')

        await loginByShareData(shareData)

        expect(await getAccessToken()).toEqual('the-correct-access-token')
        expect(await getLoginState()).toEqual('logged in')
    })

    it('should handle a wrong login by share data', async () => {
        await setAccountEmail('roman.schaller@gmail.com')
        await registerAccount()
        await requestAccessToken('123456')

        const shareData = JSON.parse(await getShareData())
        shareData.accessToken = 'wrong-access-token'

        logout()
        expect(await getLoginState()).toEqual('not logged in')

        await loginByShareData(shareData)

        expect(await getLoginState()).toEqual('not logged in')
        expect(await getAccessToken()).toBeNull()
    })
})
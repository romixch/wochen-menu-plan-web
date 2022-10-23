import { PathParams, rest, RestRequest } from "msw";
import { setupServer } from "msw/node";
import { BASE_URL } from "./cloud-conf";
import { ServerMenuPlan } from "./server";


export const setupServerMock = () => {
    const handlers = [
        rest.get('https://wochenmenuplan.romix.ch/menu/roman.schaller@gmail.com/0', async (req, res, ctx) => {
            if (isHeaderCorrect(req)) {
                const data: ServerMenuPlan = {
                    dailyPlans: [{
                        date: '2022-10-19',
                        revision: 0,
                        serverUpdateTimestamp: 1666211958,
                        courses: [
                            {
                                id: 0,
                                sequence: 0,
                                description: 'Pizza Diavola',
                                meal: 'dinner'
                            },
                            {
                                id: 1,
                                sequence: 1,
                                description: 'Kartoffelgratin',
                                meal: 'dinner'
                            }
                        ]
                    }]
                }
                return res(ctx.status(200), ctx.json(data))
            } else {
                return res(ctx.status(403, 'Access denied'))
            }
        }),
        rest.post(`${BASE_URL}register/roman.schaller@gmail.com`, async (req, res, ctx) => {
            return res(ctx.status(201))
        }),
        rest.get(`${BASE_URL}register/roman.schaller@gmail.com/123456`, async (req, res, ctx) => {
            return res(ctx.status(200), ctx.text('the-correct-access-token'))
        }),
        rest.get(`${BASE_URL}user/roman.schaller@gmail.com`, async (req, res, ctx) => {
            if (isHeaderCorrect(req)) {
                return res(ctx.status(200), ctx.json({ mail: 'roman.schaller@gmail.com', sharingAllowed: true }))
            } else {
                return res(ctx.status(403), ctx.text(''))
            }
        }),
    ]

    return setupServer(...handlers)
}
const isHeaderCorrect = (req: RestRequest<never, PathParams<string>>) => {
    if (req.headers.get('accessToken') === 'the-correct-access-token') {
        return true
    } else {
        return false
    }
}
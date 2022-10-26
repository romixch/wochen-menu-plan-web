import { render } from "@testing-library/react"
import { NotLoggedIn } from "./not-logged-in"

describe('NotLoggedIn', () => {

    it('should show people that they are not logged in', () => {
        render(<NotLoggedIn />)
    })
})
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { click } from "@testing-library/user-event/dist/click"
import { act } from "react-dom/test-utils"
import useSettings from "../../storage/settings-store"
import Login from "./login"

describe('Login', () => {

    beforeEach(() => {
        useSettings.setState({ login: undefined })
    })

    it('should display form to login if not logged in', async () => {
        render(<Login />)
        expect(screen.getByText('Login')).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: 'E-Mail' })).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: 'Access-Key' })).toBeInTheDocument()
    })

    it('should save login into zustand store', async () => {
        render(<Login />)
        const emailInput = screen.getByRole('textbox', { name: 'E-Mail' })
        const accessKeyInput = screen.getByRole('textbox', { name: 'Access-Key' })

        userEvent.type(emailInput, '{selectall}roman.schaller@gmail.com')
        fireEvent.blur(emailInput)

        userEvent.type(accessKeyInput, '{selectall}secret-access-key')
        fireEvent.blur(accessKeyInput)

        act(() => click(screen.getByRole('button', { name: "Speichern" })))

        expect(useSettings.getState().login).toStrictEqual({
            email: 'roman.schaller@gmail.com',
            accessKey: 'secret-access-key'
        })

    })
})
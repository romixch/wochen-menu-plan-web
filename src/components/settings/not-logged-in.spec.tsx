import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NotLoggedIn } from './not-logged-in'

describe('NotLoggedIn', () => {
  it('should show people that they are not logged in', () => {
    render(
      <NotLoggedIn
        getAccountEmail={async () => ''}
        registerAccount={async () => {}}
        setAccountEmail={async (email) => {}}
      />
    )
    expect(screen.getByRole('button', { name: 'Anmelden' })).toBeInTheDocument()
  })

  it('should execute a registration', () => {
    const getAccountEmailMock = jest.fn(async () => null)
    const registerPromise = new Promise<void>((resolve) => {})
    const registerAccountMock = jest.fn(() => registerPromise)
    const setAccountEmailMock = jest.fn()
    render(
      <NotLoggedIn
        getAccountEmail={getAccountEmailMock}
        registerAccount={registerAccountMock}
        setAccountEmail={setAccountEmailMock}
      />
    )
    userEvent.type(screen.getByLabelText(/E-Mail/), 'roman.schaller@gmail.com')
    userEvent.click(screen.getByText('Anmelden'))
    expect(setAccountEmailMock).toBeCalledWith('roman.schaller@gmail.com')
    expect(registerAccountMock).toBeCalled()
    expect(screen.getByText(/Anmelden/)).toBeDisabled()
  })
})

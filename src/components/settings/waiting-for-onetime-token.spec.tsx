import { render, screen } from '@testing-library/react'
import { WaitingForOnetimeToken } from './waiting-for-onetime-token'
import userEvent from '@testing-library/user-event'

describe('WaitingForOneTimeToken', () => {
  it('should call cancel when clicked', async () => {
    const cancelMock = jest.fn()
    render(<WaitingForOnetimeToken cancel={cancelMock} setOnetimeToken={() => Promise.resolve()} />)
    const cancelButton = await screen.findByText('Abbrechen')
    userEvent.click(cancelButton)
    expect(cancelMock).toBeCalled()
  })

  it('should call setOnetimeToken when code is completely entered', async () => {
    const setOnetimeTokenMock = jest.fn()
    render(<WaitingForOnetimeToken cancel={() => {}} setOnetimeToken={setOnetimeTokenMock} />)
    const input = await screen.findByRole('textbox')
    userEvent.type(input, '123456')
    expect(setOnetimeTokenMock).toBeCalledWith('123456')
  })
})

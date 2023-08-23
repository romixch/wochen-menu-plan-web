import { render, screen } from '@testing-library/react'
import { WaitingForOnetimeToken } from './waiting-for-onetime-token'
import userEvent from '@testing-library/user-event'

describe('WaitingForOneTimeToken', () => {
  it('should show a cancel button', () => {
    render(<WaitingForOnetimeToken cancel={() => {}} />)
    expect(screen.getByRole('button', { name: 'Abbrechen' })).toBeInTheDocument()
  })

  it('should call cancel when clicked', async () => {
    const cancelMock = jest.fn()
    render(<WaitingForOnetimeToken cancel={cancelMock} />)
    const cancelButton = await screen.findByText('Abbrechen')
    userEvent.click(cancelButton)
    expect(cancelMock).toBeCalled()
  })
})

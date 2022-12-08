import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// 1) Rendering the component we want to test
// 2) Finding the elements
// 3)Assertion
// test driven development approach

test('inputs should be initially empty', () => {
  render(<App />)
  const emailInputElement = screen.getByRole('textbox')
  const passwordInputElement = screen.getByLabelText('Password')
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i)
  expect(emailInputElement.value).toBe('')
  expect(passwordInputElement.value).toBe('')
  expect(confirmPasswordInputElement.value).toBe('')
})

test('should be able to type an email', () => {
  render(<App />)
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  })
  userEvent.type(emailInputElement, 'selena@gmail.com')
  expect(emailInputElement.value).toBe('selena@gmail.com')
})
test('should be able to type an password', () => {
  render(<App />)
  const emailInputElement = screen.getByLabelText('Password')
  userEvent.type(emailInputElement, 'password!')
  expect(emailInputElement.value).toBe('password!')
})

test('should be able to type an confirm password', () => {
  render(<App />)
  const confirmEmailPassword = screen.getByLabelText(/confirm password/i)
  userEvent.type(confirmEmailPassword, 'password!')
  expect(confirmEmailPassword.value).toBe('password!')
})

test('should show email error massage on invalid email', () => {
  render(<App />)
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  ) //null

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  })

  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  })

  expect(emailErrorElement).not.toBeInTheDocument()

  userEvent.type(emailInputElement, 'selenagmail.com')

  userEvent.click(submitBtnElement)

  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  )

  expect(emailErrorElementAgain).toBeInTheDocument()
})

test('should show password error if password is less than 5 characters ', () => {
  render(<App />)
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  })
  const passwordInputElement = screen.getByLabelText('Password')
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  )

  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  })

  userEvent.type(emailInputElement, 'selena@gmail.com')
  expect(passwordErrorElement).not.toBeInTheDocument()

  userEvent.type(passwordInputElement, '123')
  userEvent.click(submitBtnElement)

  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  )
  expect(passwordErrorElementAgain).toBeInTheDocument()
})

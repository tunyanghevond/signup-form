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
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  })
  userEvent.type(emailInputElement, 'selenagmail.com')
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  })
  userEvent.click(submitBtnElement)
  const emailErrorElement = screen.getByText(/the email you input is invalid/i)
  expect(emailErrorElement).toBeInTheDocument
})

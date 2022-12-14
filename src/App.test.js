import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type } from '@testing-library/user-event/dist/type'
import App from './App'

// 1) Rendering the component we want to test
// 2) Finding the elements
// 3) Assertion
// test driven development approach

// This will run before each test
beforeEach(() => {
  render(<App />)
})

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  })
  const passwordInputElement = screen.getByLabelText('Password')
  const confirmEmailPassword = screen.getByLabelText(/confirm password/i)

  if (email) {
    userEvent.type(emailInputElement, email)
  }

  if (password) {
    userEvent.type(passwordInputElement, password)
  }
  if (confirmPassword) {
    userEvent.type(confirmEmailPassword, confirmPassword)
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmEmailPassword,
  }
}

const clickOnSubmitButton = () => {
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  })
  userEvent.click(submitBtnElement)
}

describe('App', () => {
  test('inputs should be initially empty', () => {
    expect(screen.getByRole('textbox').value).toBe('')
    expect(screen.getByLabelText('Password').value).toBe('')
    expect(screen.getByLabelText(/confirm password/i).value).toBe('')
  })
  // email
  test('should be able to type an email', () => {
    const { emailInputElement } = typeIntoForm({ email: 'selena@gmail.com' })
    expect(emailInputElement.value).toBe('selena@gmail.com')
  })
  //password
  test('should be able to type an password', () => {
    const { passwordInputElement } = typeIntoForm({ password: 'password!' })
    expect(passwordInputElement.value).toBe('password!')
  })
  //confirm password
  test('should be able to type an confirm password', () => {
    const { confirmEmailPassword } = typeIntoForm({
      confirmPassword: 'password!',
    })
    expect(confirmEmailPassword.value).toBe('password!')
  })
  describe('Error Handling', () => {
    //invalid email
    test('should show email error massage on invalid email', () => {
      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).not.toBeInTheDocument()

      typeIntoForm({ email: 'selenagmail.com' })
      clickOnSubmitButton()

      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).toBeInTheDocument()
    })
    //password is less
    test('should show password error if password is less than 5 characters ', () => {
      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i
        )
      ).not.toBeInTheDocument()

      typeIntoForm({ email: 'selena@gmail.com' })

      typeIntoForm({ password: '123' })

      clickOnSubmitButton()

      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i
        )
      ).toBeInTheDocument()
    })
    //confirm password
    test("should show confirm password error if password is don't match", () => {
      typeIntoForm({ email: 'selena@gmail.com', password: '12345' })

      expect(
        screen.queryByText(/the password don't match. try again/i)
      ).not.toBeInTheDocument()

      typeIntoForm({ confirmPassword: '123456' })

      clickOnSubmitButton()

      expect(
        screen.queryByText(/the password don't match. try again/i)
      ).toBeInTheDocument()
    })
    //no error message
    test('should show no error message if every input is valid', () => {
      typeIntoForm({
        email: 'selena@gmail.com',
        password: '12345',
        confirmPassword: '12345',
      })
      clickOnSubmitButton()

      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText(/the password don't match. try again/i)
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText(/the password don't match. try again/i)
      ).not.toBeInTheDocument()
    })
  })
})

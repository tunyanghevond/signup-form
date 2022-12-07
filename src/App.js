import './App.css'

function App() {
  return (
    <div className='container my-5'>
      <form>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            id='email'
            className='form-control'
            name='email'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            id='password'
            className='form-control'
            name='password'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='confirm-password' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            id='confirm-password'
            className='form-control'
            name='confirm-password'
          />
        </div>
      </form>
    </div>
  )
}

export default App

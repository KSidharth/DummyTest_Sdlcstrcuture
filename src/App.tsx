
import LoginForm from './components/LoginForm'

function App() {
  return (
    <div className="min-h-full flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back user</h1>
          <p className="text-gray-600">Please enter your details to continue</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default App

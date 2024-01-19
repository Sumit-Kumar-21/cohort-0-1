import { useState } from 'react'
import Otp from './components/Otp'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Otp />
    </div>
  )
}

export default App

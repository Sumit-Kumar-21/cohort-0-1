import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TakeName from './component/TakeName'
import "./index.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TakeName />
    </>
  )
}



export default App

import { useState } from 'react'
import BusinessCard from './components/BusinessCard'
import CreatingCard from './components/CreatingCard'


function App() {
  const [card, setCard] = useState({
    name: "Sumit Kumar",
    description: "B.Sc IT hons. graduate",
    interests: ["eat", "sleep", "repeat"],
    socialMedia:{
      Linkdin: "https://www.linkedin.com/in/sumit-kumar-341979284",
      Twitter: "https://twitter.com/Sumit_Kumar2104"
    }
  })


  return (
    <>
      {/* <CreatingCard /> */}

      {/* {"card.hasOwnProperty("interests")"} this is written for security check if server not respond anything */}
      { card.hasOwnProperty("interests") && <BusinessCard value={card}></BusinessCard>}
    </>
  )
}

export default App

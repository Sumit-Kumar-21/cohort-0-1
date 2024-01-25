import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [count, setCount] = useState(0);
  const [dCount, setDCount]= useState(0);
  const [tCount, setTCount]= useState(0);


  
  const mydebounce = (cb, d)=>{
    let timer;

    return ()=>{
      if(timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb()
      }, d);
    }
  }
  
  const debounce = mydebounce(()=>{
    setDCount(c=>c+1)
  }, 1000)



  const mythrottle =(cb, d)=>{
    let startTime = new Date().getTime();

    return ()=>{
      let nowTime = new Date().getTime();
      console.log(nowTime-startTime);
      if (nowTime-startTime < d) return;
      startTime = nowTime;
      return cb();
    }
  }

  const throttle = mythrottle(()=>{
    setTCount(c=>c+1)
  }, 1000)
  
  const increaseCount = ()=>{
    setCount(count => count+1);
  }

  

  return (
    <>
      <button onClick={increaseCount}>count {count}</button>
      <div>
        the debounced Count: <button onClick={debounce}>count {dCount}</button>
      </div>
      <div>
        <button onClick={throttle}> click </button>
        the throttled Count:  {tCount}
      </div>
    </>
  )
}

export default App

import { useState } from 'react'


function App() {
  const [color, setcolor] = useState("olive")

  return (
    <>
    <div className='w-full h-screen duration-200' style={{backgroundColor: color}}></div>
    <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
      <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-slate-400 px-3 py-2 rounded-3xl">
        <button className='outline-none px-4 py-1 rounded-full bg-red-600 text-slate-200' onClick={()=> setcolor("red")}>red</button>
        <button className='outline-none px-4 py-1 rounded-full bg-black text-slate-200' onClick={()=> setcolor("black")}>black</button>
        <button className='outline-none px-4 py-1 rounded-full bg-white text-black' onClick={()=> setcolor("white")}>white</button>
        <button className='outline-none px-4 py-1 rounded-full bg-green-600 text-slate-200' onClick={()=> setcolor("green")}>green</button>
        <button className='outline-none px-4 py-1 rounded-full bg-yellow-600 text-slate-200' onClick={()=> setcolor("yellow")}>yellow</button>
        <button className='outline-none px-4 py-1 rounded-full bg-blue-600 text-slate-200' onClick={()=> setcolor("blue")}>blue</button>
        <button className='outline-none px-4 py-1 rounded-full bg-gray-600 text-slate-200' onClick={()=> setcolor("gray")}>gray</button>
      </div>
    </div>
    </>
  )
}

export default App


import { useCallback, useState, memo, Children } from 'react'


function App() {
  const [input, setInput]= useState(8);
  const [paragraph, setParagraph]= useState("")

  const paraGenerator = useCallback(()=>{
    const words = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipisicing', 'elit.', 'Vitae', 'repellat', 'aliquam', 'quidem', 'minima,', 'quisquam', 'ducimus', 'sapiente', 'ab', 'provident', 'perspiciatis', 'sunt,', 'velit', 'quos', 'itaque', 'eaque', 'placeat', 'atque', 'eius', 'ratione', 'iusto', 'consequatur', 'quis.', 'Aliquid', 'minus,', 'mollitia', 'nesciunt', 'fugiat', 'laborum,', 'culpa', 'necessitatibus', 'totam', 'non', 'tempora', 'in', 'suscipit', 'libero.', 'Deserunt', 'sint', 'ad', 'necessitatibus', 'enim', 'minus', 'saepe,', 'quo', 'cumque', 'earum', 'voluptate', 'voluptatibus', 'rem', 'vel', 'obcaecati', 'sequi,', 'officia', 'rerum', 'repellat', 'delectus', 'modi', 'labore', 'cum', 'dolore', 'hic!', 'Quaerat', 'voluptatum', 'possimus', 'accusamus', 'odit', 'dolorem', 'quasi', 'corrupti', 'perspiciatis,', 'cum', 'sequi', 'hic', 'magnam', 'doloribus', 'quod', 'ipsa', 'doloremque', 'maxime', 'pariatur', 'sunt', 'porro', 'quam', 'quae', 'eum', 'asperiores', 'officia', 'consequatur!', 'Magni,', 'qui', 'laborum']
    
    const wordLimit = input;
    let para;
    for(let i=1; i<=wordLimit; i++){
      para += words[Math.floor(Math.random()*words.length)];
      para += " ";
    }
    setParagraph(para)
  },[input])

  return (
    <div>
      <div style={{height:"200px"}}>
        <WrapperOne>
        <div>Paragraph Generator:</div>
        <div>
          <input type="text" id="inputNum" placeholder='Enter Number of words' onChange={(e)=>{
            setInput(Number(e.target.value))
          }}/>
          <button onClick={paraGenerator}>Generator</button>
        </div>
      </WrapperOne>
      </div>
      <div><WrapperTwo>
        <Paragraph para={paragraph}/>
      </WrapperTwo>
      </div>
      
      
    </div>
  )
}

const Paragraph= memo(({para})=>(
  <div>
    {para}
  </div>
));

function WrapperOne({children}){
  return <div style={{border:"2px solid black", width:"200px", position:"relative", marginLeft:"auto", marginRight:"auto", marginTop:"50px"}}>
    {children}
  </div>
}

function WrapperTwo({children}){
  return <div style={{border:"2px solid black", width:"50%", position:"relative", marginLeft:"auto", marginRight:"auto"}}>
    {children}
  </div>
}

export default App

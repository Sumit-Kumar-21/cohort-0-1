
const reactElement ={
  type: "a",
  props: {
    href: "https://www.google.com",
    target: "_blank"
  },
  childern: 'click me to Visit Google'
}

const container = document.getElementById('root');

function generateHtml(elementObj){
  const element = document.createElement(elementObj.type);
  element.innerHTML=elementObj.childern;
  for(let prop in elementObj.props){
    element.setAttribute(prop, elementObj.props[prop])
  }

  return element;
}


container.append(generateHtml(reactElement));


















// ReactDOM.createRoot(document.getElementById('root')).render(
//     <App />
// )

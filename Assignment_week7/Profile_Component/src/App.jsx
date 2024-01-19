import profile from "./images/profile-image.jpg";
import bg from "./images/bg-image.jpg";
import { useState } from "react";
import Profile from "./component/Profile";

function App() {
  const[data, setData]=useState([
    {
      Name: "Sumit Kumar",
      age: 22,
      profile: profile,
      background: bg,
      likes: "22k",
      follower: '22k',
      following: "22k",
      origin: "india"
    }
  ])

  return <Profile  data={data[0]}/>
}



export default App;

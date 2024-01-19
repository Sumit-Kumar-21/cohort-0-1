import { useEffect, useRef, useState } from "react";
import bg from "./../images/bg.jpg";

function TakeName() {
  const input = useRef();
  const [value, setValue] = useState("");
  const [wish, setWish]= useState("")

  useEffect(() => {
    input.current.focus();
  }, []);

  async function action() {
    const response = await fetch("http://localhost:3000/wishes", {
      method: "POST",
      body: JSON.stringify({
        name: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const wish = await response.json();
    setWish(wish.wish)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          border: "2px solid black",
          height: "250px",
          width: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "5% 0 0 0",
          backgroundColor: "rgba(10, 12, 33, 0.8)",
        }}
      >
        <div
          style={{
            marginTop: "30px",
            fontWeight: "900",
            fontSize: "30px",
            color: "white",
          }}
        >
          Enter Name Here
        </div>
        <input
          type="text"
          placeholder="Enter Name Here"
          style={{ width: "50%", marginTop: "40px", height: "30px", fontSize:"25px", fontWeight:"bold", outline:"none"}}
          ref={input}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button
          style={{
            marginTop: "30px",
            backgroundColor: "#1877f2",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            outline: "none",
            transition: "background-color 0.3s ease",
          }}
          onClick={action}
        >
          Done
        </button>
      </div>
      <Wish  value={wish}/>
    </div>
  );
}

function Wish({value}){
    return <div  style={{border:"2px solid black", width:"30%", padding:"30px", margin:"50px 0 0 0", borderRadius:"5px", backgroundColor:"#000033", color:"white", fontWeight:"bold", fontFamily:"cursive",fontSize:"25px"}}>
    {value}
</div>
}



export default TakeName;

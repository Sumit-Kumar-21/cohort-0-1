import { useState } from "react";

function CreatingCard() {
    const [name, setName]= useState("");
    const [description, setDescription]= useState("");
    const [interest, setInterest]= useState([]);
    const [linkdin, setLinkdin]= useState("");
    const [twitter, setTwitter]= useState("");

    const [value, setValue]=useState("")


  return (
    <div
      style={{
        margin: "50px auto 0 auto",
        display: "flex",
        flexDirection: "column",
        padding: "40px 0 0 20px",
        width: "400px",
        height: "250px",
        borderRadius: "5%",
        boxShadow: "0 0 6px grey",
      }}
    >
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="Your Name"
          style={{ margin: "0 0 0 46px", width: "70%", height: "20px" }}
          onChange={(e)=>{
            setName(e.target.value)
          }}
        />
      </div>

      <div style={{ margin: "10px 0 0 0" }}>
        <label htmlFor="desc">Description:</label>
        <input
          id="desc"
          type="text"
          placeholder="Enter short Bio"
          style={{ margin: "0 0 0 9px", width: "70%", height: "20px" }}
          onChange={(e)=>{
            setDescription(e.target.value)
          }}
        />
      </div>

      <div style={{ margin: "10px 0 0 0" }}>
        <label htmlFor="interest">Interests:</label>
        <input
          id="interest"
          type="text"
          placeholder="separated by comma (,)"
          style={{ margin: "0 0 0 30px", width: "70%", height: "20px" }}
          onChange={(e)=>{
            let timeoutId = true;

            // Clear the previous timeout
            clearTimeout(timeoutId);

            // Set a new timeout
            timeoutId = setTimeout(() => {
                setValue(e.target.value);
                console.log(value); // Note: This will log the previous value due to closure
            }, 5000);
        }}
        />
      </div>

      <div style={{ margin: "10px 0 0 0" }}>
        <label htmlFor="linkedin">LinkedIn:</label>
        <input
          id="linkdin"
          type="text"
          placeholder="Linkdin url"
          style={{ margin: "0 0 0 25px", width: "70%", height: "20px" }}
          onChange={(e)=>{
            setLinkdin(e.target.value)
          }}
        />
      </div>

      <div style={{ margin: "10px 0 0 0" }}>
        <label htmlFor="twitter">Twitter:</label>
        <input
          id="twitter"
          type="text"
          placeholder="Twitter url"
          style={{ margin: "0 0 0 38px", width: "70%", height: "20px" }}
          onChange={(e)=>{
            setTwitter(e.target.value)
          }}
        />
      </div>
      <button style={{ width: "30%", margin: "30px auto 0 auto" }}>
        Submit
      </button>
    </div>
  );
}

export default CreatingCard;

export default function BusinessCard(props) {
    const Bcard = props.value;
    return (
    <div style={{margin:"50px auto 0 auto", display:"flex", flexDirection:"column",padding:"40px 0 0 20px", width:"400px", height:"300px", borderRadius:"5%", boxShadow:"0 0 6px grey"}}>

        <div style={{fontWeight:"bold", fontSize:"30px"}}>{Bcard.name}</div>
        <div style={{color:"grey", marginTop:"20px"}}>{Bcard.description}</div><br />
        <div>
            <div style={{fontWeight:"bold"}}>
            Interests
            </div>
            <ul style={{listStyle:"none", color:"grey", paddingLeft:"0"}}>
                {Bcard.interests.map((interest, index)=>{
                    return (<li style={{marginTop:"5px"}} key={index}>{interest}</li>)
                })}
            </ul>
        </div>
        <div style={{display:"flex", height:"20%", alignItems:"center"}}>
            
            {Object.keys(Bcard.socialMedia).map((key, index)=>(
                <a key={index} href={Bcard.socialMedia[key]} target="_blank" style={{textDecoration:"none", color:"white"}}>
                <div style={{backgroundColor:"#007BFF", height:"40px", width:"100px", borderRadius:"10%", display:"flex", justifyContent:"center", alignItems:"center", marginRight:"20px"}}>{key}</div>
            </a>
            ))}
            
            {/* <a href={Bcard.socialMedia.twitter} target="_blank" style={{textDecoration:"none", color:"white"}}>
                <div style={{backgroundColor:"#007BFF",marginLeft:"20px", height:"40px", width:"100px", borderRadius:"10%", display:"flex", justifyContent:"center", alignItems:"center"}}>Twitter</div>
            </a> */}

        </div>
    </div>
    );
}

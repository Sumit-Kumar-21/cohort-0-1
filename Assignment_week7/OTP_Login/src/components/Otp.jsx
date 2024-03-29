import { useEffect, useRef } from "react";

function Otp() {

    const first = useRef();
    const sec = useRef();
    const third = useRef();
    const forth = useRef();
    const button = useRef();

    useEffect(()=>{
        first.current.focus();
    },[])

    function onListenFirst(e) {
        if(e.target.value === ""){
            first.current.focus()
        }else{
            sec.current.focus();
        }
    }
    
    function onListenSec(e) {
        if(e.target.value === ""){
            first.current.focus()
        }else{
            third.current.focus();
        }
    }

    function onListenThird(e){
        if(e.target.value === ""){
            sec.current.focus()
        }else{
            forth.current.focus();
        }
    }

    function onListenFourth(e) {
        if(e.target.value === ""){
            third.current.focus()
        }
    }

    return <div style={{display:"flex", justifyContent:"center",}}>
        
        <div  style={{border:"2px solid black", height:"300px", width:"300px", display:"flex", justifyContent:"center", alignItems:"center", margin:"50px 0 0 0", borderRadius:"10%", backgroundColor:"#000033"}}>
            <div style={{width:"250px", height:"250px",boxShadow:"0 0 6px white", borderRadius:"10%", color:"white", display:"flex", flexDirection:"column", alignItems:"center"}}>

                <div style={{fontWeight:"bold", fontSize:"20px", marginTop:"15%"}}>Login via OTP</div>


                <div style={{display:"flex", marginTop:"10%"}}>
                    <input style={{height:"30px", backgroundColor:"white", width:"30px", margin:"0 5px 0 0", textAlign:"center", fontSize:"20px", fontWeight:"bold", borderRadius:"20%"}} onChange={onListenFirst} ref={first} />
                    <input style={{height:"30px", backgroundColor:"white", width:"30px", margin:"0 5px 0 0", textAlign:"center", fontSize:"20px", fontWeight:"bold", borderRadius:"20%"}} onChange={onListenSec}  ref={sec}/>
                    <input style={{height:"30px", backgroundColor:"white", width:"30px", margin:"0 5px 0 0", textAlign:"center", fontSize:"20px", fontWeight:"bold", borderRadius:"20%"}} onChange={onListenThird} ref={third}/>
                    <input style={{height:"30px", backgroundColor:"white", width:"30px", margin:"0 5px 0 0", textAlign:"center", fontSize:"20px", fontWeight:"bold", borderRadius:"20%"}}  onChange={onListenFourth} ref={forth}/>
                </div>


                <button style={{marginTop:"10%", backgroundColor:"#000033", borderRadius:"20%", boxShadow:"0 0 6px white", color:'white', cursor:"pointer", height:"35px", width:"30%", fontWeight:"bold", fontSize:"20px"}} ref={button}>Login</button>

            </div>
        </div>

    </div>;
}

export default Otp;
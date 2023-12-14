// create a counter in js (count down from 30-0)

"use strict"

let a =30
function counter() {
    if (a>=0){
        console.log(a);
        a--;   
    }else{
        clearInterval(interval);
    }
}
let interval = setInterval(counter, 500);
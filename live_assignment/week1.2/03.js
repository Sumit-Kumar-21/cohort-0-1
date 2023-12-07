// create a terminal clock(HH:MM:SS)

function terminalClock() {
    let time = new Date();
    console.log(time.toLocaleTimeString());
    setTimeout(terminalClock, 1000);
}
terminalClock();



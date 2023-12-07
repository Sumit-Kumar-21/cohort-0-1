// calculate the time it takes between a setTimeout call and the inner function actually running
setTimeout(timetake, 1000)

function timetake() {
    console.log("hello world")
}

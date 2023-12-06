var fs = require("fs")

try {
    var data = fs.readFileSync("day06/input.txt").toString().split("\n")
} catch (error) {
    console.log('Error:', e.stack);
}

time_data = parseInt(data[0].split(" ").slice(1).filter(v=>v.length>0).reduce((acc,curr)=>acc+curr,""))
distance_data = parseInt(data[1].split(" ").slice(1).filter(v=>v.length>0).reduce((acc,curr)=>acc+curr,""))

// console.log(time_data)
// console.log(distance_data)



let win=0
for (let i=1; i<time_data; i++){
    if (distance_data<i*(time_data-i))
        win++
}

console.log(win)
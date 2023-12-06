var fs = require("fs")

try {
    var data = fs.readFileSync("day06/input.txt").toString().split("\n")
} catch (error) {
    console.log('Error:', e.stack);
}

time_data = data[0].split(" ").slice(1).filter(v=>v.length>0).map(v=>parseInt(v))
distance_data = data[1].split(" ").slice(1).filter(v=>v.length>0).map(v=>parseInt(v))

// console.log(time_data)
// console.log(distance_data)

result = time_data.map((value, index)=>{
    let record_dist = distance_data[index]
    let win=0
    for (let i=1; i<value; i++){
        if (record_dist< i*(value-i))
            win++
    }
    return win
}).reduce((acc,curr)=>acc*curr,1)

console.log(result)
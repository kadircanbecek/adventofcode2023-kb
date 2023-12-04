var fs = require("fs")

try {
    var data = fs.readFileSync("day04/input.txt").toString().split("\n")
} catch (error) {
    console.log('Error:', e.stack);
}

peek = v=>{
    console.log(v)
    return v
}

data = data.map(value =>{
    numbers = value.split(": ")[1]
    let [oncard, winning] = numbers.split(" | ")
    oncard = oncard.trim().split(" ").filter(v=>v.length>0)
    winning = winning.trim().split(" ").filter(v=>v.length>0)
    oncard = oncard.filter(v=> winning.includes(v))
    return oncard
}).map(v=>v.length>0?(2**(v.length-1)) : 0).map(peek).reduce((acc,curr)=>acc+curr,0)

console.log(data)
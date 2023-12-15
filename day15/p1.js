var fs = require("fs")

try {
    var data = fs.readFileSync("day15/input.txt").toString().split(",")
} catch (error) {
    console.log('Error:', e.stack);
}

data = data.map(value=>{
    let start = 0;
    while(value.length>0){
        start+=value.charCodeAt(0);
        start*=17;
        start%=256;
        value=value.slice(1);
    }
    return start
}).reduce((acc,curr)=>acc+curr,0)

console.log(data)
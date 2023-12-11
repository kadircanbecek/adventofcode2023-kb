var fs = require("fs")

try {
    var data = fs.readFileSync("day11/input.txt").toString().split("\n")
} catch (error) {
    console.log('Error:', e.stack);
}
peek = v=>{
    console.log(v)
    return v
}
empty_counter=0;
expand_factor=1000000;
data = data.map(value=>value.split("").every(s=>s==".")?value.replaceAll(".","E"):value).flat()
.map(value=>value.split(""))

data_transpose = data[0].map((_, colIndex) => data.map(row => row[colIndex]))
.map(value=>value.join("").replaceAll("E",".").split("").every(s=>s==".")?value.join("").replaceAll(".","E"):value.join(""))
.flat()
// console.log(data_transpose)
data = data_transpose.map(v=>v.split(""))[0].map((_, colIndex) => data_transpose.map(row => row[colIndex])).map(v=>v.join(""))//.map(peek)
.map((v,i)=>{
    coords=[]
    if (v.split("").every(s=>s=="E")){
        empty_counter+=(expand_factor-1);
        return []
    }
    while (v.indexOf("#")>-1){
        idx = v.indexOf("#")
        empty_counter_col=v.slice(0,idx).split("").filter(v=>v=="E").length*(expand_factor-1);
        coords.push([empty_counter+i,empty_counter_col+idx])
        v = v.replace("#",".")
    }
    return coords
}).flat().map((v,i,arr)=>{
    let total = 0;
    for (let a=i+1;a<arr.length; a++){
        next = arr[a];
        total+=(Math.abs(next[0]-v[0])+Math.abs(next[1]-v[1]));
    }
    return total
}).reduce((acc,curr)=>acc+curr,0)

console.log(data)
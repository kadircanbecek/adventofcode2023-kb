var fs = require("fs")

try {
    var data = fs.readFileSync("day11/input.txt").toString().split("\n")
} catch (error) {
    console.log('Error:', e.stack);
}

galaxy_ind=1
data = data.map(value=>value.split("").every(s=>s==".")?[value,value]:value).flat()
.map(value=>value.split(""))

data_transpose = data[0].map((_, colIndex) => data.map(row => row[colIndex])).map(value=>value.every(s=>s==".")?[value.join(""),value.join("")]:value.join("")).flat()
// console.log(data_transpose)
data = data_transpose.map(v=>v.split(""))[0].map((_, colIndex) => data_transpose.map(row => row[colIndex])).map(v=>v.join(""))
.map((v,i)=>{
    coords=[]
    while (v.indexOf("#")>-1){
        coords.push([i,v.indexOf("#")])
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
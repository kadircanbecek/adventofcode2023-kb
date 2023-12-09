var fs = require("fs");

try {
    var data = fs.readFileSync("day09/input.txt").toString().split("\n");
} catch (error) {
    console.log('Error:', e.stack);
}
function find_and_add(series){
    diff = series.slice(1).reduce((acc,curr,index)=>[...acc,curr-series[index]], [])
    // console.log(diff)
    if (diff.every(v=>v==diff[0]))
        return series[series.length-1] + diff[0]
    else
        return series[series.length-1] + find_and_add(diff)
}

data = data.map(v=>v.trim().split(" ")).map(v=>v.map(val=>parseInt(val))).map(find_and_add).reduce((acc,curr)=>acc+curr,0)
console.log(data)
var fs = require("fs")

try {
    var data = fs.readFileSync("day13/input.txt").toString().split("\n\n")
} catch (error) {
    console.log('Error:', e.stack);
}
peek = v=>{
    console.log(v)
    return v
}
findMirror = wholeData=>{
    let splitlength = 0;
    let row_split_1 = [];
    let row_split_2 = [];
    let matches = [];
    let check_value = false;
    let split_start = 0;
    let err_counter = 0;
    for (let i = 0; i<wholeData[0].length-1; i++){
        splitlength=Math.min(i+1, wholeData[0].length-i-1);
        split_start = Math.max(0,i+1-splitlength)
        split_end = split_start+splitlength*2;
        err_counter = 0;
        wholeData.forEach(row => {
            row_split_1 = row.slice(split_start,split_start+splitlength);
            // console.log("row_split_1",row_split_1);
            row_split_2 = row.slice(split_start+splitlength,split_end);
            row_split_1.forEach((value, index)=>{
                if (value!==row_split_2[row_split_2.length-1-index])
                    err_counter++;
            })
        
        }
        );
        if (err_counter===1)
            matches.push(i+1);
    }
    return matches
}

reduceMirrors = (common, mirror) =>  common.filter(v=> mirror.includes(v))
data_transpose = data.map(val=>val.split("\n"))
data_transpose = data_transpose.map(val=>val.map(v=>v.split(""))).map(val=>val[0].map((_, colIndex) => val.map(row => row[colIndex])))
// data_transpose = [data_transpose[2]]
horizontal_mirrors = data_transpose.map(findMirror)
.flat().reduce((acc,curr)=>acc+curr*100,0)
console.log(horizontal_mirrors)
vertical_mirrors = data.map(value=>value.split("\n").map(v=>v.split(""))).map(findMirror)
.flat().reduce((acc,curr)=>acc+curr,0)
console.log(horizontal_mirrors+vertical_mirrors)

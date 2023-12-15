var fs = require("fs")

try {
    var data = fs.readFileSync("day15/input.txt").toString().split(",")
} catch (error) {
    console.log('Error:', e.stack);
}

data = data.map(value=>{
    let start = 0;
    let op = ""
    if (value.includes("-"))
        op="-";
    else op="=";

    let [lens, focus] =value.split(op)
    let i=0;
    while(i<lens.length){
        start+=lens.charCodeAt(i);
        start*=17;
        start%=256;
        i++
    }
    return [start, op, lens, focus]
}).reduce((acc,curr)=>{
    let [start, op, lens, focus] = curr;
    if (!acc.hasOwnProperty(start)){
        acc[start]={}
    }
    
    if (op=="="){
        acc[start][lens]=parseInt(focus);
    }
    else 
        {
            
        delete acc[start][lens];
        if (Object.keys(acc[start]).length===0)
            delete acc[start];
    }
    // console.log(acc)
    return acc
},{})
data = Object.entries(data)
.reduce((acc,curr)=>{
    let [box_id, lenses ] = curr;
    box_id=parseInt(box_id)
    lenses = Object.values(lenses);
    // console.log(lenses)
    lens_str = lenses.reduce((acc_l,curr_l,idx_l)=>(curr_l*(idx_l+1))+acc_l,0);
    // console.log(lens_str)
    // console.log(box_id)
    return acc+(box_id+1)*lens_str;
},0)

console.log(data)
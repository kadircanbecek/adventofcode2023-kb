var fs = require("fs");

try {
    var data = fs.readFileSync("day08/input.txt").toString().split("\n\n");
} catch (error) {
    console.log('Error:', e.stack);
}

let [instructions, network] = data;
instructions = instructions.trim().split("").map(v=>v=='L'?0:1);
// console.log(instructions);

network = network.split("\n").map(value=>{
    let [start, dirs] = value.split(" = ")
    dirs = dirs.slice(1, dirs.length-1).split(", ")
    return [start,dirs]
});
network = Object.fromEntries(network);
// console.log(network)
let curr_val = "AAA";
steps = 0;
while (curr_val!="ZZZ"){
    // console.log(curr_val)
    curr_val=network[curr_val][instructions[steps%instructions.length]]
    steps++
}
console.log(steps);
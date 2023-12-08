var fs = require("fs");

try {
    var data = fs.readFileSync("day08/input.txt").toString().split("\n\n");
} catch (error) {
    console.log('Error:', e.stack);
}

let [instructions, network] = data;
instructions = instructions.trim().split("").map(v=>v=='L'?0:1);
// console.log(instructions);
function lcm(a, b) 
{
	return a * (b / gcd(a,b));
}
function gcd(a, b)
{ 
	return !b ? a : gcd(b, a % b);
} 
network = network.split("\n").map(value=>{
    let [start, dirs] = value.split(" = ")
    dirs = dirs.slice(1, dirs.length-1).split(", ")
    return [start,dirs]
});
network = Object.fromEntries(network);
// console.log(network)
let curr_vals = Object.keys(network).filter(v=>v.charAt(v.length-1)=="A");
// console.log(curr_vals)
// console.log(curr_vals.length)
steps = [];
let curr_val = ''
for (i in curr_vals){
    curr_val = curr_vals[i];
    step=0
    while (curr_val.charAt(curr_val.length-1)!='Z'){
        // console.log(curr_val)
        curr_val=network[curr_val][instructions[step%instructions.length]]
        step++;
    }
    steps.push(step)
}
console.log(steps.reduce((acc,curr)=>lcm(acc,curr),1));
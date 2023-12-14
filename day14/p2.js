var fs = require("fs")

try {
    var data = fs.readFileSync("day14/input.txt").toString().split("\n")
} catch (error) {
    console.log('Error:', e.stack);
}
data = data.map(v=>v.split(""));
function rollNorth(dataInput)
    {
        dataInput.forEach((value, idx)=>{
            dataInput[idx] = value.map((v, valind)=>{
                if ("O#".indexOf(v)>-1){
                    return v
                }
                let item =".";
                for (let i = idx+1; i<dataInput.length; i++){
                    item = dataInput[i][valind];
                    if (item=="O"){
                        dataInput[i][valind]=".";
                        break;
                    }
                    if (item=="#") {
                        item=".";
                        break;
                    }
                }
                return item;
            })
    })
    return dataInput
}

function rollSouth(dataInput)
    {   
        dataInput = dataInput.reverse();
        dataInput = rollNorth(dataInput);
        dataInput = dataInput.reverse();

        return dataInput
    }
let rollWestMap = (value)=>{
    value.forEach((v,i)=>{
        if ("O#".indexOf(v)>-1){
            return 
        }
        let rest = value.slice(i+1);
        
        if (rest.includes("O")){
            let o_index = rest.findIndex(r=>r=="O");
            if(rest.includes("#")&&rest.findIndex(r=>r=="#")<o_index){
                return
            }
            value[i] ="O"
            value[i+1+o_index] = "."
        }
    })
    return value
}
function rollWest(dataInput)
    {   
        return dataInput.map(rollWestMap)
    }
function rollEast(dataInput)
{   
    dataInput = dataInput.map(v=>v.reverse())
    dataInput.map(rollWestMap)
    dataInput = dataInput.map(v=>v.reverse())
    return dataInput
}
let cache2 = []
let cache = []
let dataN = []
let dataW = []
let dataS = []
let dataE = []
let found_cycle = -1;
let found_cycle2 = -1;
let cycle_start_str = "";
data_first_str = JSON.stringify(data)

let total_cycle = 1000000000;
for (let cycle=0; cycle<1000000000; cycle++){
    data_org_str = JSON.stringify(data)
    if (cache.includes(data_org_str)) {
        // console.log("here", cycle);
        if (found_cycle<0){
            // console.log("here");
            found_cycle=cycle
            cycle_start_str = data_org_str;
            // break;
        }
        if (cache2.includes(data_org_str)) {
            if (found_cycle2)
                found_cycle2=cycle;
            break;
        }
        cache2.push(data_org_str);
        // console.log("found", cycle)
        // continue;
    }
    cache.push(data_org_str);
    dataN = rollNorth(data);
    dataW = rollWest(dataN);
    dataS = rollSouth(dataW);
    dataE = rollEast(dataS);
    data=dataE;
}
// data_new_str = JSON.stringify(data);

// // console.log(data.map(v=>v.join("")).join("\n"))
// result = data.map(v=>v.filter(s=>s=="O").length).reverse().reduce((acc,curr,idx)=>acc+curr*(idx+1),0)
// console.log("result", result)

let i = 1000000000;
data = JSON.parse(cache2[(i-found_cycle)%(cache2.length)]);
// console.log(found_cycle)
// console.log(found_cycle2)
// console.log(cache2.length)
// console.log(data.map(v=>v.join("")).join("\n"))
result = data.map(v=>v.filter(s=>s=="O").length).reverse().reduce((acc,curr,idx)=>acc+curr*(idx+1),0)
console.log(result)
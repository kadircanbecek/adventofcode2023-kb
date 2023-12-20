var fs = require("fs");

try {
    var data = fs.readFileSync("day20/input.txt").toString().split("\n");
} catch (error) {
    console.log(error.stack);
}

class FlipFlop{
    constructor(){
        this.on=false;
    }

    processSignal(isHigh, source=""){
        if (isHigh)
            return -1 
        else if(this.on){
            this.on =false;
            return 0;
        } else {
            this.on = true;
            return 1;
        }
    }
}

class Conjunction{
    constructor(connectedInputs){
        this.memory={};
        connectedInputs.forEach(element => {
            this.memory[element]=0;
        });
    }

    processSignal(isHigh, source=""){
        this.memory[source]=isHigh;
        if (Object.values(this.memory).every(v=>v===1))
            return 0;
        else return 1;

    }
}

data = data.map(value=>{
    let [module_name, dest] = value.split(" -> ");
    dest = dest.split(", ");
    return [module_name, dest]
}).map((value,idx, arr)=>{
    if (value[0]==="broadcaster")
        return value
    else {
        let [module_type_name, dest] = value;
        let module_name = module_type_name.slice(1);
        let module_type = module_type_name.charAt(0);
        let module_object = undefined;
        if (module_type==="%"){
            module_object = new FlipFlop();
        } else {
            let sources = [];
            arr.forEach(element => {
                let [module_name_el, dest_el] = element;
                if (Array.isArray(dest_el)){
                    if (element[1].includes(module_name)){
                        sources.push(module_name_el.replace("%","").replace("&",""));
                    }
                }
            });
            module_object = new Conjunction(sources);
        }
        return [module_name, [module_object, dest]]
    }
});
// let first_state = data[0][0]
data = Object.fromEntries(data);
// console.log("data", data)
let lowsig=0;
let highsig = 0;
let cache = []
let cycle = 0;
for(let i=0;i<1000;i++){
    let str_data = JSON.stringify(data);
    if (cache.filter(v=>v[0]==str_data).length>0){
        cycle = i
        break;
    }
    let states = [["broadcaster", 0, ""]]
    lowsig++;
    while (states.length>0){
        let new_states = []
        // console.log(states);
        for (let [module_name, signal, source] of states){
            if (module_name === "broadcaster"){
                let dests = data[module_name];
                for (let dest of dests){
                    new_states.push([dest, signal, module_name])
                    if (signal){
                        highsig++;
                    } else{
                        lowsig++
                    }
                }
            } else {
                let [module_object, dests] = data[module_name];
                let next_signal = module_object.processSignal(signal, source);
                if (next_signal>=0){
                    for (let dest of dests){
                        new_states.push([dest, next_signal, module_name])
                        if (next_signal){
                            highsig++;
                        } else{
                            lowsig++
                        }
                    }
                }
            }
        }
        // console.log(data);
        // console.log(new_states.filter(ns=>data.hasOwnProperty(ns[0])))
        states = new_states.filter(ns=>data.hasOwnProperty(ns[0]));
    }
    cache.push([str_data, lowsig, highsig])
}
console.log(cycle)
if (cycle>0){
    let remainder = 1000%cycle;
    let repeat = Math.floor(1000/cycle);
    // console.log(cache);
    lowsig = cache[cache.length-1][1]*repeat + (remainder>0?cache[remainder-1][1]:0)
    highsig = cache[cache.length-1][2]*repeat + (remainder>0?cache[remainder-1][2]:0)
} else {
    lowsig = cache[cache.length-1][1]
    highsig = cache[cache.length-1][2]
}
console.log(lowsig* highsig)
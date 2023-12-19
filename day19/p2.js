var fs = require("fs")

try {
    var data = fs.readFileSync("day19/input.txt").toString().split("\n\n");
} catch (error) {
    console.log('Error:', error.stack);
}

let [workflows, parts] = data;

// console.log(workflows)
workflows = workflows.split("\n").map(value=>{
    let [wf_name, wf] = value.split("{");
    wf = wf.slice(0, wf.length-1);
    wf=wf.split(",");
    let conds = wf.slice(0, wf.length-1);
    let final_dest = wf[wf.length-1];
    conds = conds.map(v=>{
        let [cond, dest] = v.split(":");
        let category = cond[0];
        let cond_comp = cond[1];
        let cond_number = parseInt(cond.slice(2))
        return [[category, cond_comp, cond_number], dest]
    })
    conds.push([[], final_dest]);
    return [wf_name, conds]
});
workflows = Object.fromEntries(workflows)
// console.log(workflows)
let newparts = [[{x:[1,4000],m:[1,4000],a:[1,4000],s:[1,4000]},"in"]]
let accepted = []
while(newparts.filter(v=>v[1]!="A").length>0){
    let part_ways = [] 
    for (let [xmas, wf_name] of newparts){
        let wflow = workflows[wf_name];
        // console.log(wf_name)
        // console.log(wflow)
        for (let [cond,dest] of wflow){
            if (cond.length===0){
                new_wf = dest;
                part_ways.push([xmas, dest])
                break;
            }else{
                let [cond_cat, cond_comp, cond_number] = cond;
                let range = xmas[cond_cat];
                if (cond_comp==="<"){
                    if (range[0]<cond_number){
                        if (range[1]<cond_number){
                            part_ways.push([xmas, dest]);
                            break;
                        } else {
                            let xmas_splitted = JSON.parse(JSON.stringify(xmas));
                            xmas_splitted[cond_cat] = [range[0], cond_number-1];
                            xmas[cond_cat] = [cond_number, range[1]];
                            part_ways.push([xmas_splitted, dest]);
                        }
                    }
                } else {
                    if (range[1]>cond_number){
                        if (range[0]>cond_number){
                            part_ways.push([xmas, dest]);
                            break;
                        } else {
                            let xmas_splitted = JSON.parse(JSON.stringify(xmas));
                            xmas_splitted[cond_cat] = [cond_number+1, range[1]];
                            xmas[cond_cat] = [range[0], cond_number];
                            part_ways.push([xmas_splitted, dest]);
                        }
                    }
                }
            }
        }
    }
    newparts = part_ways.filter(v=>v[1]!=="R");
    accepted.push(JSON.parse(JSON.stringify(newparts.filter(v=>v[1]==="A"))));
    newparts = newparts.filter(v=>v[1]!=="A");
}

let result = accepted.flat().map(value=>{
    let xmas = value[0];
    // console.log(xmas)
    let vals = Object.values(xmas).reduce((acc,curr)=>acc*(curr[1]-curr[0]+1), 1);
    return vals
}).reduce((acc,curr)=>acc+curr,0);
console.log(result);


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

parts = parts.split("\n").map(value=>{
    let xmas = value.slice(1,value.length-1).split(",");
    xmas = xmas.map(v=>{
        let [category, cat_val] = v.split("=");
        return [category, parseInt(cat_val)]
    });
    return Object.fromEntries(xmas);
}).map(xmas=>{
    let start = "in";
    while(!["A","R"].includes(start)){
        let conds = workflows[start];
        for (let [cond,dest] of conds){
            if (cond.length===0){
                start = dest;
                break;
            } else{
                let [cond_cat, cond_comp, cond_number] = cond;
                if ((cond_comp==="<"&& xmas[cond_cat]<cond_number)||(cond_comp===">"&& xmas[cond_cat]>cond_number)){
                    start = dest;
                    break;
                }
            }
        }
    }
    return [Object.values(xmas).reduce((acc,curr)=>acc+curr,0), start]
}).filter(v=>v[1]==="A").reduce((acc,curr)=>acc+curr[0],0);

console.log(parts)
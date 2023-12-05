let startTime = performance.now();
var fs = require("fs");
const { exit } = require("process");
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
try {
    var data = fs.readFileSync("day05/input.txt").toString().split("\n\n")
} catch (error) {
    // console.log('Error:', e.stack);
}

seeds = data[0].split(" ").slice(1).map(v=>parseInt(v,10))
let new_seeds = [];
while(seeds.length) new_seeds.push(seeds.splice(0,2));
seeds = new_seeds
// console.log(seeds)
curr_heading = ""
data_maps =  data.slice(1).map((val)=>{
    let [map_name, map_data] = val.split(" map:\n")
    map_data = map_data.split("\n")
    map_data = map_data.map(v=>{
        let [dest, source, range] = v.split(" ")
        source = parseInt(source, 10)
        dest = parseInt(dest, 10)
        range = parseInt(range, 10)
        return [source, dest-source, range] 
    })
    return map_data
})
// console.log(data_maps)
minval = Infinity
data_maps.forEach(element => {
    // console.log(element)
    seeds = seeds.map(valuearr=>{ 
        // console.log(valuearr)
        let [value, range] = valuearr 
        found = element.filter(v=>{
            return value+range-1>=v[0] & value<=v[0]+v[2]-1
        }).sort((a,b)=>a[0]-b[0])
        values = [[value, range]]
        // console.log("found", found)
        if (found.length)
        {
            // console.log("----------------------------------------");
            
            // console.log("values before",values);
            found.forEach(v=>{
                // console.log("processing range", v);
                [value, range] = values.pop()
                // console.log("value",value)
                // console.log("v[0]",v[0])
                if (v[0]>value){
                    values.push([value, v[0]-value])
                    value = v[0]
                    range -= (v[0]-value)
                }
                values.push([value+v[1], Math.min(v[0]+v[2]-value,range)])
                if (v[0]+v[2]-value<range){
                    values.push([v[0]+v[2], range-(v[2]+v[0]-value)])
                }
                // console.log("values ",values);
                // console.log("----------------------------------------");
            })
            // console.log(value+range-1)
            // console.log(found.map(v=>[v[0], v[0]+ v[2]-1]))
        }
        // console.log(values)
        return values
        
    }).flat().filter(v=>v[1]>0)
    // console.log("seeds",seeds)

});
let endTime = performance.now();
seeds = Math.min(...seeds.map(v=>v[0]))
console.log(endTime-startTime)
console.log(seeds)
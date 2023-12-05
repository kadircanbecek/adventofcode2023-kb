var fs = require("fs")
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
try {
    var data = fs.readFileSync("day05/input.txt").toString().split("\n\n")
} catch (error) {
    console.log('Error:', e.stack);
}

seeds = data[0].split(" ").slice(1).map(v=>parseInt(v,10))
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

seeds = seeds.map(value=>{ 
    data_maps.forEach(element => {
        // console.log(element)
        found = element.filter(v=>{
            return value>=v[0] & value<=v[0]+v[2]-1
        })
        if (found.length)
        {
            // console.log(value)
            // console.log(found)
            value = value + found[0][1]
        }
        // console.log(value)
    });
    return value
})
console.log(Math.min(...seeds))
// console.log(data_maps)
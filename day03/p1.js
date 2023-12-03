var fs = require("fs")

try {
    var data = fs.readFileSync("day03/input.txt").toString().split("\n")
} catch (error) {
    console.log('Error:', e.stack);
}

peek = v=>{
    console.log(v)
    return v
}
data = data.map((value)=>{
    let symbols = value.replaceAll("\.","").replaceAll(/\d+/g,"").split("")
    let symbol_idx = symbols.map(s=>{
        idx = value.indexOf(s)
        value = value.replace(s, ".".repeat(s.length))
        return idx 
    })

    let numbers = value.split(".")
    
    numbers = numbers.filter(v => v.match(/\d+/g)).map(v=>v.split("").filter(v => v.match(/\d+/g)).join(""))
    console.log(numbers)
    let number_idx = numbers.map(n => {
        idx = value.indexOf(n)
        value = value.replace(n, ".".repeat(n.length))
        return idx 
    })
    
    // console.log(symbol_idx)
    return [numbers, number_idx, symbol_idx]
}).map((value, index, array)=>{
    let prev_symbol_idx = []
    let next_symbol_idx = []
    if (index > 0){
        prev_symbol_idx = array[index-1][2]
    }
    if (index < array.length-1){
        next_symbol_idx = array[index+1][2]
    }
    let [numbers, number_idx, symbol_idx] = value

    numbers = numbers.filter((val, idx, arr) => {
        nstart = number_idx[idx]
        nend = nstart + val.length-1
        checkRange = v => (v<=(nend+1) & v>=(nstart-1))
        return prev_symbol_idx.some(checkRange) | symbol_idx.some(checkRange) | next_symbol_idx.some(checkRange)
    })
    // console.log(numbers)
    return numbers
}).filter(v=>v.length).flat(Infinity)
// .map(peek)
.map(v=>parseInt(v,10))
// .map(peek)
.reduce((acc, curr)=>acc+curr, 0)
console.log(data)
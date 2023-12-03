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
    symbol_idx = symbol_idx.filter((v,i)=>symbols[i].match(/\*/))
    symbols = symbols.filter(v=>v.match(/\*/))
    let numbers = value.split(".")
    
    numbers = numbers.filter(v => v.match(/\d+/g)).map(v=>v.split("").filter(v => v.match(/\d+/g)).join(""))
    // console.log(numbers)
    let number_idx = numbers.map(n => {
        idx = value.indexOf(n)
        value = value.replace(n, ".".repeat(n.length))
        return idx 
    })
    
    // console.log(symbol_idx)
    return [numbers, number_idx, symbol_idx]
}).map((value, index, array)=>{
    // console.log(index)
    let prev_numbers = []
    let prev_number_idx = []
    let next_numbers = []
    let next_number_idx = []
    if (index > 0){
        prev_numbers = array[index-1][0]
        prev_number_idx = array[index-1][1]
    }
    if (index < array.length-1){
        next_numbers = array[index+1][0]
        next_number_idx = array[index+1][1]
    }
    let [numbers, number_idx, symbol_idx] = value

    let gear_numbers = symbol_idx.map((val, idx, arr) => {
        let symbol_range = [val-1, val, val+1]
        checkRange = v => (v<=(val+1) & v>=(val-1))
        checkRangeWL = (v,l) => checkRange(v) | checkRange(v+l-1)
        
        gear_prev = prev_numbers.filter((v,i)=>{
            return checkRangeWL(prev_number_idx[i],v.length)
        })
        // console.log("prev",gear_prev)
        gear_curr = numbers.filter((v,i)=>{
            return checkRangeWL(number_idx[i],v.length)
        })
        // console.log("curr",gear_curr)
        gear_next = next_numbers.filter((v,i)=>{
            return checkRangeWL(next_number_idx[i],v.length)
        })
        // console.log("next",gear_next)

        return [gear_prev, gear_curr, gear_next].flat(Infinity)
    })
    // console.log("gear_numbers",gear_numbers)
    return gear_numbers
}).map(v=>v.filter(i=>i.length==2))//.map(Infinity)
// .map(peek)
.filter(v=>v.length)
// .map(peek)
.map(v=>(v.map(i=>i.map(j=>parseInt(j,10)))))
// .map(peek)
.map(v=>v.map(i=>i[0]*i[1]))
// .map(peek)
.flat(Infinity)
.reduce((acc, curr)=>acc+curr, 0)
console.log(data)
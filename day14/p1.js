var fs = require("fs")

try {
    var data = fs.readFileSync("day14/input.txt").toString().split("\n")
} catch (error) {
    console.log('Error:', e.stack);
}
data = data.map(v=>v.split(""));
data.forEach((value, idx)=>{
        data[idx] = value.map((v, valind)=>{
            if ("O#".indexOf(v)>-1){
                return v
            }
            let item =".";
            for (let i = idx+1; i<data.length; i++){
                item = data[i][valind];
                if (item=="O"){
                    data[i][valind]=".";
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
result = data.map(v=>v.filter(s=>s=="O").length).reverse().reduce((acc,curr,idx)=>acc+curr*(idx+1),0)
console.log(result)
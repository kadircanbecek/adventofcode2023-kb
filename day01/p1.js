var fs = require('fs');
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
try {  
    var data = fs.readFileSync('day01/p1_input.txt', 'utf8');
    stringdata=data.toString() 
    listdata = stringdata.split("\n")
    // console.log(listdata)
} catch(e) {
    console.log('Error:', e.stack);
}
total = 0
for (i in listdata){
    iteri = listdata[i]
    
    numbers = []
    for (let i = 0; i < iteri.length; i++) {
        noi = iteri.charAt(i)
        if (isNumeric(noi)){
            numbers.push(parseInt(noi))
        }
    }
    total+=(numbers[0]*10+numbers[numbers.length-1])
} 
console.log(total)
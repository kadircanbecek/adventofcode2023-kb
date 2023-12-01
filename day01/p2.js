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
numberstr = {'one': 1, 'two':2,'three':3,'four':4,'five':5,'six':6,'seven':7,'eight':8,'nine':9}
for (i in listdata){
    iteri = listdata[i]

    numbers = []
    let j = 0;
    // console.log(iteri)
    while ( j < iteri.length) {
        let found = false
        iterislice = iteri.slice(j)
        for (numstr in numberstr){
            if (iterislice.slice(0, numstr.length) == numstr){
                numbers.push(numberstr[numstr])
                j++
                found = true
                break
            }
        }
        if (!found){
            noi = iteri.charAt(j)
            if (isNumeric(noi)){
                numbers.push(parseInt(noi))
            }
            j++
        }
    }
    // console.log(numbers)
    total+=(numbers[0]*10+numbers[numbers.length-1])
} 
console.log(total)
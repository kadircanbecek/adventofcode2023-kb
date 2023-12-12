var fs = require("fs")

try {
    var data = fs.readFileSync("day12/input.txt").toString().split("\n")
} catch (error) {
    console.log('Error:', e.stack);
}


// function nextChar(serie, damaged_amount,depth=0, old="",damaged_amount_org=[]){
//     // console.log("depth", depth);
//     // console.log("damaged_amount",damaged_amount)
//     if (damaged_amount.length==0 ||(damaged_amount.length==1 && damaged_amount[0]==0)){
        
//         // console.log("exxxxxxxxxxhare");
//         let found = old.split(".").filter(v=>v.length>0).map(v=>v.length)
//         if(serie.split("").filter(v=>v=="#").length==0&&JSON.stringify(found)===JSON.stringify(damaged_amount_org))
//             {   
                
//                 // console.log("hare", old);
//                 // console.log("serie",[serie])
//                 return 1;
//             }
//         return 0;
//     }
//     if (serie.length==0){
//         if  (damaged_amount.length==1 && damaged_amount[0]==0)
//             {
//                 // console.log("damaged_amount",damaged_amount)
//                 // console.log("here");
//                 return 1;
//             }
//         return 0;
//     }
//     let ch = serie.charAt(0)
//     // console.log("depth", depth);
//     // console.log("ch", " ".repeat(depth)+ch)
//     if (ch=="."){
//         if (damaged_amount[0]==0)
//             return nextChar(serie.slice(1), JSON.parse(JSON.stringify(damaged_amount)).slice(1),depth+1, old+ch,damaged_amount_org);

//         return nextChar(serie.slice(1), JSON.parse(JSON.stringify(damaged_amount)),depth+1, old+ch,damaged_amount_org);
//     }
//     else if (ch=="#"){
//         if (damaged_amount[0]==0)
//             return 0;
//         let new_damaged_amount = JSON.parse(JSON.stringify(damaged_amount));
//         new_damaged_amount[0]-=1;
//         return nextChar(serie.slice(1),new_damaged_amount,depth+1, old+ch,damaged_amount_org)
//     }
//     else {
//         let count_1=0;
//         if(!(old.charAt(old.length-1)=="#"&&damaged_amount[0]>0))
//             count_1 = nextChar("."+serie.slice(1), JSON.parse(JSON.stringify(damaged_amount)),depth, old,damaged_amount_org);
//         // console.log("depth", depth);
//         // console.log("count_1",count_1);
//         let count_2 = nextChar("#"+serie.slice(1), JSON.parse(JSON.stringify(damaged_amount)),depth, old,damaged_amount_org);
//         // console.log("depth", depth);
//         // console.log("count_2",count_2);
//         return count_1+count_2;
//     }
// }

let cache = {};
function memoized_collect_amounts(serie_n_damaged_amount){
    // console.log(serie_n_damaged_amount)
    if (serie_n_damaged_amount in cache) {
        return cache[serie_n_damaged_amount];
    }
    let [serie, damaged_amount] = JSON.parse(serie_n_damaged_amount)
    if(damaged_amount.length == 0){
        if(serie.split("").filter(v=>v=="#").length==0)
            return 1;
        else return 0;
    }
    let serie_new = ""+serie;
    while (serie_new.charAt(0)=="."){
        serie_new = serie_new.slice(1)
    }
    let count = 0;
    ch = serie_new.charAt(0)
    if ((ch == "#") && 
    (serie_new.length>=(damaged_amount.reduce((acc,curr)=>acc+curr, 0)+damaged_amount.length-1)) &&
    (serie_new.slice(0, damaged_amount[0]).split("").every(v=>v=="#" || v=="?"))&&(serie_new.charAt(damaged_amount[0])!="#")){
        serie_new = serie_new.slice(damaged_amount[0]+1);
        // console.log("here")
        count+=memoized_collect_amounts(JSON.stringify([serie_new, damaged_amount.slice(1)]))
    } else if (ch=='?'){
        count+=memoized_collect_amounts(JSON.stringify(["#"+serie_new.slice(1), damaged_amount]))
        count+=memoized_collect_amounts(JSON.stringify([serie_new.slice(1), damaged_amount]))
    }
    cache[serie_n_damaged_amount] = count
    // console.log("count",count)
    return count
}

const memoize = (fn) => {
    console.log(cache)
    return (...args) => {
      let n = args[0];  // just taking one argument here
      console.log(n)
      if (n in cache) {
        return cache[n];
      }
      else {
        let result = fn(n);
        cache[n] = result;
        return result;
      }
    }
  }

// data=[data[29]]
data = data.map((value,idx)=>{
    let [cond_map, damaged_amount] = value.split(" ");
    damaged_amount = damaged_amount.split(",").map(v=>parseInt(v));
    da = Array(damaged_amount.length*5).fill(0).map((v,i)=>damaged_amount[i%damaged_amount.length])
    // console.log(da)
    cond_map = Array(5).fill(cond_map).join("?")
    
    let count = memoized_collect_amounts(JSON.stringify([cond_map,da]));
    // count = nextChar(cond_map,da,0,"",da);
    // console.log(idx, count)
    return count
}).reduce((acc,curr)=>acc+curr,0);
console.log("result", data)
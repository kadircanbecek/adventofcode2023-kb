var fs = require("fs")

try {
    var data = fs.readFileSync("day12/input.txt").toString().split("\n")
} catch (error) {
    console.log('Error:', e.stack);
}
// function combinationcreator(N, amount) {
//     return (N >>> 0).toString(2).padStart(amount, '0').split("").map(v=>v=="1"?"#":".");
// }
// function nextChar(serie, damaged_amount,depth=0, old="",damaged_amount_org=[]){
//     // console.log("depth", depth);
//     // console.log("damaged_amount",damaged_amount)
//     if (damaged_amount.length==0 ||(damaged_amount.length==1 && damaged_amount[0]==0)){
        
//         // console.log("exxxxxxxxxxhare");
//         found = old.split(".").filter(v=>v.length>0).map(v=>v.length)
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
//         let count_1 = nextChar("."+serie.slice(1), JSON.parse(JSON.stringify(damaged_amount)),depth, old,damaged_amount_org);
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
data = data.map((value,idx)=>{
    let [cond_map, damaged_amount] = value.split(" ");
    damaged_amount = damaged_amount.split(",").map(v=>parseInt(v));
    // damaged_amount = JSON.stringify(damaged_amount)
    unk_chars = cond_map.split("").filter(v=>v=="?").length
    let count = 0;
    // let count_2 = nextChar(cond_map,damaged_amount,0,"",damaged_amount);
    // if(count!=count_2)
    // count_a = count.split("").filter(v=>v==1).length
    // count_b = count.split("").filter(v=>v=="b").length
    // for (let i = 0; i<(2**unk_chars); i++){
    //     next_comb=combinationcreator(i,unk_chars);
    //     let unk_idx = 0;
    //     cond_map_redone = cond_map.split("").map(v=>{
    //         if (v=="?"){
    //             toReturn = next_comb[unk_idx];
    //             unk_idx++;
    //             return toReturn
    //         }
    //         return v;
    //     }).join("").split(".").filter(v=>v.length>0).map(v=>v.length);
    //     if (JSON.stringify(damaged_amount)===JSON.stringify(cond_map_redone))
    //         count++;
    //     // console.log(cond_map_redone)
    // }
    count= memoized_collect_amounts(JSON.stringify([cond_map,damaged_amount]))
    return count//Math.max(count_a,count_b)
}).reduce((acc,curr)=>acc+curr,0);
console.log(data)
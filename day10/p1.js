var fs = require("fs");
const { nextTick } = require("process");

try {
    var data = fs.readFileSync("day10/input.txt").toString().split("\n");
} catch (error) {
    console.log('Error:', e.stack);
}
s_point = undefined;
data.forEach((value,index)=>{
    if (value.indexOf("S") != -1){
        s_point = [index, value.indexOf("S")]
    }
})

// console.log(s_point)
data = data.map(v=>v.split(""))
score_map = data.map(v=>v.map(s=>0))
score_map[s_point[0]][s_point[1]]=0
// console.log(score_map)
function traverse(ugmap, sc_map, startpoint, pos_move){
    
    let next_pos_move = "";
    // console.log("pos_move",pos_move)
    switch(pos_move){
        case "u":
            next_pos = ugmap[startpoint[0]-1][startpoint[1]];
            if (next_pos =='S')
                return ["f", (sc_map[startpoint[0]][startpoint[1]]+1)/2]
            if ("|F7".indexOf(next_pos)>-1){
                switch(next_pos){
                    case "|":
                        next_pos_move = "u";
                        break;
                    case "F":
                        next_pos_move = "r";
                        break;
                    case "7":
                        next_pos_move = "l";
                        break;
                }
                // console.log("curr u");
                // console.log("next_pos_move", next_pos_move);
                sc_map_copy = JSON.parse(JSON.stringify(sc_map));
                sc_map_copy[startpoint[0]-1][startpoint[1]]=sc_map_copy[startpoint[0]][startpoint[1]]+1;
                let new_start_point = [startpoint[0]-1, startpoint[1]];
                return [next_pos_move, new_start_point, sc_map_copy]
            }
            return ["n", [-1,-1]]
        case "l":
            next_pos = ugmap[startpoint[0]][startpoint[1]-1];
            if (next_pos =='S')
                return ["f", (sc_map[startpoint[0]][startpoint[1]]+1)/2]
            if ("-LF".indexOf(next_pos)>-1){
                switch(next_pos){
                    case "-":
                        next_pos_move = "l";
                        break;
                    case "L":
                        next_pos_move = "u";
                        break;
                    case "F":
                        next_pos_move = "d";
                        break;
                }
                // console.log("curr l");
                // console.log("next_pos_move", next_pos_move);
                sc_map_copy = JSON.parse(JSON.stringify(sc_map));
                sc_map_copy[startpoint[0]][startpoint[1]-1]=sc_map_copy[startpoint[0]][startpoint[1]]+1;
                let new_start_point = [startpoint[0],startpoint[1]-1];
                return [next_pos_move, new_start_point, sc_map_copy]
            }
            return ["n", [-1,-1]]
        case "d":
            next_pos = ugmap[startpoint[0]+1][startpoint[1]];
            if (next_pos =='S')
            return ["f", (sc_map[startpoint[0]][startpoint[1]]+1)/2]
            if ("|JL".indexOf(next_pos)>-1){
                switch(next_pos){
                    case "|":
                        next_pos_move = "d";
                        break;
                    case "J":
                        next_pos_move = "l";
                        break;
                    case "L":
                        next_pos_move = "r";
                        break;
                }
                // console.log("curr d");
                // console.log("next_pos_move", next_pos_move);
                sc_map_copy = JSON.parse(JSON.stringify(sc_map));
                sc_map_copy[startpoint[0]+1][startpoint[1]]=sc_map_copy[startpoint[0]][startpoint[1]]+1;
                let new_start_point = [startpoint[0]+1,startpoint[1]];
                return [next_pos_move, new_start_point, sc_map_copy]
            }
            return ["n", [-1,-1]]
        case "r":
            next_pos = ugmap[startpoint[0]][startpoint[1]+1];
            if (next_pos =='S')
                return ["f", (sc_map[startpoint[0]][startpoint[1]]+1)/2]
            if ("-J7".indexOf(next_pos)>-1){
                switch(next_pos){
                    case "-":
                        next_pos_move = "r";
                        break;
                    case "J":
                        next_pos_move = "u";
                        break;
                    case "7":
                        next_pos_move = "d";
                        break;
                }
                // console.log("curr r");
                // console.log("next_pos_move", next_pos_move);
                sc_map_copy = JSON.parse(JSON.stringify(sc_map));
                sc_map_copy[startpoint[0]][startpoint[1]+1]=sc_map_copy[startpoint[0]][startpoint[1]]+1;
                let new_start_point = [startpoint[0],startpoint[1]+1];
                return [next_pos_move, new_start_point, sc_map_copy]
            }
            return ["n", [-1,-1]]  
        default:        
            return sc_map[startpoint[0]][startpoint[1]]/2;
}}
all_dirs = "ulrd".split("").map(v=>[v,s_point,JSON.parse(JSON.stringify(score_map))])
while (true){
    all_dirs = all_dirs.map(v=>traverse(data, v[2], v[1], v[0])).filter(v=>v[0]!="n")
    // console.log(all_dirs)
    found = all_dirs.filter(v=>v[0]=="f")
    if (found.length>0){
        console.log(found[0][1])
        break;
    }
}
// console.log(all_dirs)
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
function ccw_rotate(torotate){
    return [torotate[3]].concat(torotate.slice(0,3));
}

function cw_rotate(torotate){
    return torotate.slice(1).concat([torotate[0]]);
}
console.log(cw_rotate([0,1,2,3]))
console.log(ccw_rotate([0,1,2,3]))
function traverse(ugmap, sc_map, startpoint, polypoints, pos_move){
    
    let next_pos_move = "";
    let new_polypoints = [];
    // console.log("polypoints_before",polypoints[polypoints.length-1]);
    // console.log("pos_move",pos_move)
    switch(pos_move){
        case "u":
            next_pos = ugmap[startpoint[0]-1][startpoint[1]];
            if (next_pos =='S')
                return ["f", (sc_map[startpoint[0]][startpoint[1]]+1)/2, polypoints]
            if ("|F7".indexOf(next_pos)>-1){
                
                new_polypoints = polypoints.concat([polypoints[polypoints.length-1].map(s=>[s[0]-1,s[1]])]);
                // console.log("curr u");
                // console.log("new_polypoints_before",new_polypoints[new_polypoints.length-1]);
                switch(next_pos){
                    case "|":
                        next_pos_move = "u";
                        break;
                    case "F":
                        next_pos_move = "r";
                        new_polypoints.push(cw_rotate(new_polypoints[new_polypoints.length-1]));  
                        break;
                    case "7":
                        next_pos_move = "l";                        
                        new_polypoints.push(ccw_rotate(new_polypoints[new_polypoints.length-1]));  

                        break;
                }
                
                // console.log("new_polypoints",new_polypoints[new_polypoints.length-1])
                // console.log("next_pos_move", next_pos_move);
                sc_map_copy = JSON.parse(JSON.stringify(sc_map));
                sc_map_copy[startpoint[0]-1][startpoint[1]]=sc_map_copy[startpoint[0]][startpoint[1]]+1;
                let new_start_point = [startpoint[0]-1, startpoint[1]];
                return [next_pos_move, new_start_point, new_polypoints, sc_map_copy]
            }
            return ["n", [-1,-1]]
        case "l":
            next_pos = ugmap[startpoint[0]][startpoint[1]-1];
            if (next_pos =='S')
                return ["f", (sc_map[startpoint[0]][startpoint[1]]+1)/2, polypoints]
            if ("-LF".indexOf(next_pos)>-1){
                new_polypoints = polypoints.concat([polypoints[polypoints.length-1].map(s=>[s[0],s[1]-1])]);
                // console.log("curr l");
                // console.log("new_polypoints_before",new_polypoints[new_polypoints.length-1]);
                switch(next_pos){
                    case "-":
                        next_pos_move = "l";
                        break;
                    case "L":
                        next_pos_move = "u";
                        new_polypoints.push(cw_rotate(new_polypoints[new_polypoints.length-1]));  
                        break;
                    case "F":
                        next_pos_move = "d";
                        new_polypoints.push(ccw_rotate(new_polypoints[new_polypoints.length-1]));  
                        break;
                }
                
                // console.log("new_polypoints",new_polypoints[new_polypoints.length-1])
                // console.log("next_pos_move", next_pos_move);
                sc_map_copy = JSON.parse(JSON.stringify(sc_map));
                sc_map_copy[startpoint[0]][startpoint[1]-1]=sc_map_copy[startpoint[0]][startpoint[1]]+1;
                let new_start_point = [startpoint[0],startpoint[1]-1];
                return [next_pos_move, new_start_point, new_polypoints, sc_map_copy]
            }
            return ["n", [-1,-1]]
        case "d":
            next_pos = ugmap[startpoint[0]+1][startpoint[1]];
            if (next_pos =='S')
                return ["f", (sc_map[startpoint[0]][startpoint[1]]+1)/2, polypoints]
            if ("|JL".indexOf(next_pos)>-1){
                new_polypoints = polypoints.concat([polypoints[polypoints.length-1].map(s=>[s[0]+1,s[1]])]);
                // console.log("curr d");
                // console.log("new_polypoints_before",new_polypoints[new_polypoints.length-1]);
                switch(next_pos){
                    case "|":
                        next_pos_move = "d";
                        break;
                    case "J":
                        next_pos_move = "l";
                        new_polypoints.push(cw_rotate(new_polypoints[new_polypoints.length-1]));  
                        break;
                    case "L":
                        next_pos_move = "r";
                        new_polypoints.push(ccw_rotate(new_polypoints[new_polypoints.length-1]));  
                        break;
                }
                
                // console.log("new_polypoints",new_polypoints[new_polypoints.length-1])
                // console.log("next_pos_move", next_pos_move);
                sc_map_copy = JSON.parse(JSON.stringify(sc_map));
                sc_map_copy[startpoint[0]+1][startpoint[1]]=sc_map_copy[startpoint[0]][startpoint[1]]+1;
                let new_start_point = [startpoint[0]+1,startpoint[1]];
                return [next_pos_move, new_start_point, new_polypoints, sc_map_copy]
            }
            return ["n", [-1,-1]]
        case "r":
            next_pos = ugmap[startpoint[0]][startpoint[1]+1]; 
            // console.log("polypoints",polypoints)
            // console.log("new_polypoints",new_polypoints)
            if (next_pos =='S')
                return ["f", (sc_map[startpoint[0]][startpoint[1]]+1)/2, polypoints]
            if ("-J7".indexOf(next_pos)>-1){
                
                new_polypoints = polypoints.concat([polypoints[polypoints.length-1].map(s=>[s[0],s[1]+1])]);
                // console.log("curr r");
                // console.log("new_polypoints_before",new_polypoints[new_polypoints.length-1]);
                switch(next_pos){
                    case "-":
                        next_pos_move = "r";
                        break;
                    case "J":
                        next_pos_move = "u";
                        new_polypoints.push(ccw_rotate(new_polypoints[new_polypoints.length-1])); 
                        break;
                    case "7":
                        next_pos_move = "d";
                        new_polypoints.push(cw_rotate(new_polypoints[new_polypoints.length-1]));  
                        break;
                }
                
                // console.log("new_polypoints",new_polypoints[new_polypoints.length-1])
                // console.log("next_pos_move", next_pos_move);
                sc_map_copy = JSON.parse(JSON.stringify(sc_map));
                sc_map_copy[startpoint[0]][startpoint[1]+1]=sc_map_copy[startpoint[0]][startpoint[1]]+1;
                let new_start_point = [startpoint[0],startpoint[1]+1];
                return [next_pos_move, new_start_point, new_polypoints, sc_map_copy]
            }
            return ["n", [-1,-1]]  
        default:        
            return ["n", [-1,-1]]
}}
transpose = m => m[0].map((x,i) => m.map(x => x[i]))
let [y,x] = s_point
all_dirs = "ulrd".split("").map(v=>[v,s_point,[[[y+0.5,x-0.5],[y-0.5,x-0.5],[y-0.5,x+0.5],[y+0.5,x+0.5]]],JSON.parse(JSON.stringify(score_map))]);
while (true){
    all_dirs = all_dirs.map(v=>traverse(data, v[3], v[1], v[2], v[0])).filter(v=>v[0]!="n")
    // console.log("pooly",(all_dirs[0][2]))
    found = all_dirs.filter(v=>v[0]=="f")
    polygons = [[],[],[],[]]
    if (found.length>0){
        raw_polys = found[0][2]
        raw_polys.forEach(v=>{
            let [p1,p2,p3,p4] = v;
            polygons[0].push(p1);
            polygons[1].push(p2);
            polygons[2].push(p3);
            polygons[3].push(p4);
        })
        break;
    }
}
function calculateArea(coords) {
    let area = 0;
  
    for (let i = 0; i < coords.length; i++) {
      const [x1, y1] = coords[i];
      const [x2, y2] = coords[(i + 1) % coords.length];
  
      area += x1 * y2 - x2 * y1
    }
  
    return area / 2;
    // replace with
    // return Math.abs(area) / 2;
  }
// polygons.forEach(poly=>{
//     console.log(poly.map(p=>"(".concat((p[1]).toString()).concat(",").concat((-p[0]).toString()).concat(")")).reduce((acc,curr)=>acc.concat(",").concat(curr)),"")
// })
// console.log()
console.log(polygons.map(calculateArea).map(v=>Math.abs(v)))
// console.log(all_dirs)
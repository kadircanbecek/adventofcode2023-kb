var fs = require("fs")

try {
    var data = fs.readFileSync("day18/input.txt").toString().split("\n")
} catch (error) {
    console.log('Error:', e.stack);
}

function ccw_rotate(torotate){
    return [torotate[3]].concat(torotate.slice(0,3));
}

function cw_rotate(torotate){
    return torotate.slice(1).concat([torotate[0]]);
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
let [y,x]=[0,0]
let poly=[[[y+0.5,x-0.5],[y-0.5,x-0.5],[y-0.5,x+0.5],[y+0.5,x+0.5]]];
prev_dir = "";
dirs_str = "RDLU";
data.forEach(value=>{
    let [dir, range, color] = value.split(" ");
    range = parseInt(color.slice(2,7),16);
    // console.log(color)
    dir = dirs_str.charAt(parseInt(color.charAt(7)));
    // range = parseInt(range);
    last_edge = JSON.parse(JSON.stringify(poly[poly.length-1]))
    next_edge = []
    // console.log(dir)
    switch (dir) {
        case "U":
            if (prev_dir=="R"){
                last_edge = ccw_rotate(last_edge);
            } else if (prev_dir == "L"){
                last_edge = cw_rotate(last_edge);
            }
            next_edge=last_edge.map(le=>[le[0]-range, le[1]]);
            
            break;
        case "D":
            if (prev_dir=="L"){
                last_edge = ccw_rotate(last_edge);
            } else if (prev_dir == "R"){
                last_edge = cw_rotate(last_edge);
            }
            next_edge=last_edge.map(le=>[le[0]+range, le[1]]);
            
            break;
        case "L":
            if (prev_dir=="U"){
                last_edge = ccw_rotate(last_edge);
            } else if (prev_dir == "D"){
                last_edge = cw_rotate(last_edge);
            }
            next_edge=last_edge.map(le=>[le[0], le[1]-range]);
            
            break;
        case "R":
            if (prev_dir=="D"){
                last_edge = ccw_rotate(last_edge);
            } else if (prev_dir == "U"){
                last_edge = cw_rotate(last_edge);
            }
            next_edge=last_edge.map(le=>[le[0], le[1]+range]);
            
            break;
        default:
            break;
    }
    prev_dir = dir;
    poly.push(last_edge)
    poly.push(next_edge)
})
polygons = [[],[],[],[]]
poly.forEach(v=>{
    let [p1,p2,p3,p4] = v;
    polygons[0].push(p1);
    polygons[1].push(p2);
    polygons[2].push(p3);
    polygons[3].push(p4);
})
console.log(Math.max(...polygons.map(calculateArea).map(v=>Math.abs(v))))
// console.log(poly)
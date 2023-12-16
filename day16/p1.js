var fs = require("fs");
const { join } = require("path");

try {
    var data = fs.readFileSync("day16/input.txt").toString().split("\n");
} catch (error) {
    console.log('Error:', e.stack);
}
right = ([r,c])=>[r,c+1,"r"]
left = ([r,c])=>[r,c-1,"l"]
up = ([r,c])=>[r-1,c,"u"]
down = ([r,c])=>[r+1,c,"d"]
let dir_cache = []
function directional(direction, maze){
    let [r,c,direct] = direction[2](direction.slice(0,2));
    let original_direct = direction[2]
    // console.log(r,c)
    if (r<0 | c<0 | r>=maze.length | c>=maze[0].length){
        return []
    }
    let tile = maze[r][c] 
    let cache_in = JSON.stringify([r,c,direct]) 
    if (dir_cache.includes(cache_in)){
        return []
    }
    dir_cache.push(cache_in)
    // console.log(moved_dir)
    let new_dirs = []
    if (tile=="|"){
        if ("rl".indexOf(direct)>-1){
            new_dirs.push([r,c,up]);
            new_dirs.push([r,c,down]);
        } else {
            new_dirs.push([r,c,original_direct]);
        } 
    } else if (tile=="-"){
        if ("ud".indexOf(direct)>-1){
            new_dirs.push([r,c,right]);
            new_dirs.push([r,c,left]);
        } else {
            new_dirs.push([r,c,original_direct]);
        } 
    } else if (tile=="/"){
        if (direct=="u"){
            new_dirs.push([r,c,right]);
        } else if (direct=="d"){
            new_dirs.push([r,c,left]);
        } else if (direct=="r"){
            new_dirs.push([r,c,up]);
        } else {
            new_dirs.push([r,c,down]);
        }
    } else if (tile=='\\'){
        if (direct=="u"){
            new_dirs.push([r,c,left]);
        } else if (direct=="d"){
            new_dirs.push([r,c,right]);
        } else if (direct=="r"){
            new_dirs.push([r,c,down]);
        } else {
            new_dirs.push([r,c,up]);
        }
    } else {
        new_dirs.push([r,c,original_direct])
    }
    // console.log(new_dirs)
    new_dirs = new_dirs.filter(([r,c])=>r>-1&&c>-1&&r<maze.length&&c<maze[0].length);
    return new_dirs
}
data = data.map(v=>v.split(""));
let energized = JSON.parse(JSON.stringify(data));
// energized[0][0]="#";
let dirs = [[0,-1,right]]
dirs = directional(dirs[0], data)
// directional(dirs[0])
while (dirs.length>0){
    new_dirs = []
    for ([r,c,light_dir] of dirs){
        energized[r][c]="#";
        new_dirs.push(directional([r,c,light_dir], data));
    }
    dirs = new_dirs.flat()
    // console.log(dirs)
}
console.log(energized.flat().filter(v=>v=="#").length)
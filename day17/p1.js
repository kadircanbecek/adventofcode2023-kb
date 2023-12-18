var fs = require("fs");
const {Heap} = require("heap-js");

try {
    var data = fs.readFileSync("day17/input.txt").toString().split("\n");
} catch (error) {
    console.log('Error:', e.stack);
}
data = data.map(v=>v.split("").map(s=>parseInt(s)));

dirs = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0] // up
];

function get_directions(dir, constdir){
    directions = [0,1,2,3];
    directions = directions.filter(v=>v!==((dir + 2) % 4));
    if (constdir == 3){
        directions = directions.filter(v=>v!==dir);
    }
    return directions
}
function bfs(maze, start){
    let visited = [];
    let distances = {};
    let min_dists = {};
    distances[JSON.stringify(start)]=0;
    min_dists[JSON.stringify([start[0], start[1]])]=0;
    const queue = new Heap((a,b)=>a[0]-b[0]);
    queue.push([0,JSON.stringify(start)]);
    let directions = undefined;

    while (queue.length>0){
        let [curr_dist, curr_node] = queue.pop();
        let [r,c, dir, const_dir] = JSON.parse(curr_node);
        if (visited.includes(curr_node) || r<0 || r>=maze.length|| c<0||c>=maze[0].length)
            continue;
        visited.push(curr_node);
        directions = get_directions(dir, const_dir);
        let nextr = 0;
        let nextc = 0;
        let newdist = 0;
        let newpos = 0;
        // console.log(curr_node)
        // console.log("directions", directions)
        for (let new_dir of directions) {
            nextr = r + dirs[new_dir][0];
            nextc = c + dirs[new_dir][1];
            if (nextr >= maze.length || nextr < 0 || nextc >= maze[0].length || nextc < 0)
                continue;
            newdist = maze[nextr][nextc] + curr_dist;
            newpos = JSON.stringify([nextr, nextc, new_dir, 1 + (new_dir === dir ? const_dir:0)]);
            
            if ((!distances.hasOwnProperty(newpos))|| newdist < distances[newpos]){
                distances[newpos] = newdist;
                queue.push([newdist, newpos]);
                
            }
            newpos = JSON.stringify([nextr, nextc])
            if ((!min_dists.hasOwnProperty(newpos))|| newdist < min_dists[newpos]){
                min_dists[newpos] = newdist;
            }

        }
    }
    return min_dists
}
let result= bfs(data, [0,0,0,0])
console.log(result[JSON.stringify([data.length-1, data[0].length-1])])
// let myheap = heapify([[0,[0,0,1,1]],[4,[0,0,1,3]],[3,[1,10,5]],[2,[0,10,11]]])

// // heappush(myheap, 15)

// console.log(myheap)
// console.log(heappop(myheap))
// console.log(myheap)
// console.log(heappop(myheap))
// console.log(myheap)
// console.log(heappop(myheap))
// console.log(myheap)
// console.log(heappop(myheap))
// console.log(myheap)
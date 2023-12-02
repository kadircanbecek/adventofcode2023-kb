var fs = require('fs');
try {  
    var data = fs.readFileSync('day02/input.txt', 'utf8');
    stringdata=data.toString() 
    listdata = stringdata.split("\n")
    // console.log(listdata)
} catch(e) {
    console.log('Error:', e.stack);
}
max_amounts = {red: 12, green:13, blue:14}
ball_types = ["green", "red", "blue"]

let total = 0 
listdata = listdata.map(str=>{
    str = str.split(":");
    game = parseInt(str[0].slice(4))
    ball_amount = [] 
    balls = str[1].split(';')
    ball_amount = balls.map(b=>{
        ball_amount_per_game = Object.assign({},...ball_types.map((bt)=>({[bt]:0})))
        inst = b.trim().split(",")
        for (i in inst){
            ballinst = inst[i]
            // console.log(ballinst)
            let [amount, bt] = ballinst.trim().split(" ")
            // console.log("bt",bt)
            // console.log(amount)
            ball_amount_per_game[bt] = parseInt(amount)
        }
        return ball_amount_per_game

    })

    return [game, ball_amount]
}).map(f=>{
    let game_id = f[0]
    let games = f[1]
    // console.log(games)
    let is_doable = true;
    is_doable = !!games.map(game=>{
        // console.log(game)
        let is_eligible=true
        Object.entries(game).forEach(entry => {
            const [key,value] = entry
            // console.log(max_amounts[key], value)
            if (max_amounts[key]<value)
                {is_eligible=false}
        });
        return is_eligible
    }).reduce((accumulator, currentValue) => accumulator & currentValue, is_doable)
    if (is_doable)
        return game_id
    else
        return 0 
}).reduce((accumulator, currentValue) => accumulator + currentValue, 0 )

console.log(listdata)
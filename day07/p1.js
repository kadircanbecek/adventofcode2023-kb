var fs = require("fs")

try {
    var data = fs.readFileSync("day07/input.txt").toString().split("\n")
} catch (error) {
    console.log('Error:', e.stack);
}

peek = v=>{
    console.log(v)
    return v
}
card_ranks = ["High","One pair","Two pair","Three of a kind","Full house", "Four of a kind","Five of a kind"]
sorting_order  = "23456789TJQKA" //"AKQJT98765432"
data = data.map(value=>{
    let [hand, bid] = value.split(" ").filter(v=>v.length>0);
    let cards = hand.split("");
    // console.log("cards:",cards);
    cards = cards.map(v=>sorting_order.indexOf(v))
    cards_grouped = cards.reduce((prevItem, currentItem) => ({
        ...prevItem,
        [currentItem]: [...(prevItem[currentItem] || []), currentItem],
      }),
      {});
    cards_grouped = Object.values(cards_grouped).sort((a,b)=> b.length-a.length || b[0]-a[0])
    // console.log("cards:",cards);
    let hand_type=0
    cards_reduced = cards_grouped.map(v=>v[0])
    if (cards_grouped[0].length==5){
        hand_type = 6
    } else if(cards_grouped[0].length==4){
        hand_type = 5
    }else if(cards_grouped[0].length==3){
        if (cards_grouped[1].length==2)
            hand_type = 4
        else{
            hand_type = 3
        }
    } else if (cards_grouped[0].length==2){
        if (cards_grouped[1].length==2){
            hand_type = 2;
        }
        else{
            hand_type = 1;
        }
    }
    // console.log("card_rank",card_ranks[hand_type])
    // console.log("cards_reduced",cards_reduced)
    return [cards, hand_type, parseInt(bid,10)]
}).sort((a,b)=>{
    // console.log(a)
    // console.log(b)
    let [cards_a, hand_a, bid_a] =a
    let [cards_b, hand_b, bid_b] =b
    card_min = Math.min(cards_a.length, cards_b.length)
    cards_a_slice = cards_a.slice(0,card_min).reduce((p,c)=>p*sorting_order.length+c,0)
    cards_b_slice = cards_b.slice(0,card_min).reduce((p,c)=>p*sorting_order.length+c,0)
    // console.log(card_diff)
    return hand_a-hand_b || cards_a_slice-cards_b_slice
})//.map(peek)
.reduce((p,c,i)=>p+c[2]*(i+1),0)

console.log(data)
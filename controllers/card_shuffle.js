var cards_set = new Set(["PA", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "PJ", "PQ", "PK", "CA", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "CJ", "CQ", "CK", "DA", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "DJ", "DQ", "DK", "TA", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "TJ", "TQ", "TK"]);

exports.obtener_carta_siguiente = function(player_cards, stack_cards){
    for(var i = 0; i < player_cards.length; i++){
        var hand_cards = player_cards[i]["mano"];
        for(var j = 0; j < hand_cards.length; j++){
            cards_set.delete(hand_cards[j]);
        }
    }
    for(var i = 0; i < stack_cards.length; i++){
        cards_set.delete(stack_cards[i]);
    }
    var residual_cards = Array.from(cards_set);
    var number = Math.floor(Math.random() * (residual_cards.length - 0));
    return residual_cards[number];
};

//obtener_carta_siguiente([{"mano": ["PA"]}, {"mano": ["TK"]}, {"mano": ["DJ"]}])

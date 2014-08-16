$(document).ready(function() {
    generateNew();
});
var memarray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];
var memvalues = [];
var memtileIds = [];
var tilesFlipped = 0;
var score = 0;
Array.prototype.memshuffle = function() {
    var i = this.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newgame() {
    generateNew();
    $('#score').append('Score:0');
};

function generateNew() {
    tilesFlipped = 0;
    score = 0;
    var output = '';
    memarray.memshuffle();
    for (var i = 0; i < memarray.length; i++) {
        output += '<div id="tile_' + i + '" onclick="flipThisCard(this,\'' + memarray[i] + '\')"></div>';
    }
    $('#game').html(output);
};

function flipThisCard(tile, val) {
    if ($(tile).text() == "" && memvalues.length < 2) {
        $(tile).css({
            'background-color': 'white'
        });
        $(tile).text(val);
        if (memvalues.length == 0) {
            memvalues.push(val);
            memtileIds.push($(tile).attr("id"));
        } else if (memvalues.length == 1) {
            memvalues.push(val);
            memtileIds.push($(tile).attr("id"));
            if (memvalues[0] == memvalues[1]) {
                tilesFlipped += 2;
                score += 20;
                $('#score').empty();
                $('#score').append('Score:' + ' ' + score);
                memvalues = [];
                memtileIds = [];
                if (tilesFlipped == memarray.length) {
                    $('#game').empty();
                    $('#game').append('<div id="showscore">Score:' + score + '</div><br><br><div id="newgame" onclick="newgame()">New Game</div>');
                    $('#score').empty();
                }
            } else {
                function flip2Back() {
                    var tile1 = document.getElementById(memtileIds[0]);
                    var tile2 = document.getElementById(memtileIds[1]);
                    $(tile1).css({
                        'background-color': 'lightgrey'
                    });
                    $(tile1).text("");
                    $(tile2).css({
                        'background-color': 'lightgrey'
                    });
                    $(tile2).text("");
                    memvalues = [];
                    memtileIds = [];
                    score = score - 5;
                    $('#score').empty();
                    $('#score').append('Score:' + ' ' + score);
                }
                setTimeout(flip2Back, 600);
            }
        }
    }
}
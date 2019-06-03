class Morpion {
    constructor() {
        this.reset();
    }

    defaultGrid() {
        var empty = '   '
        return {
            "top": [empty, empty, empty],
            "mid": [empty, empty, empty],
            "bottom": [empty, empty, empty],
        };
    }

    display(message) {
        if (this.statut == 0 || this.statut == 1) {
            message.channel.send('There are no game in progress');
        } else {
            message.channel.send('|' + this.grid['top'][0] + '|' + this.grid['top'][1] + '|' + this.grid['top'][2] + '|\n|' + this.grid['mid'][0] + '|' + this.grid['mid'][1] + '|' + this.grid['mid'][2] + '|\n|' + this.grid['bottom'][0] + '|' + this.grid['bottom'][1] + '|' + this.grid['bottom'][2] + '|')
            this.isWinning(message);
        }
    }

    isWinning(message) {
        if ((this.grid['top'][0] == "X" && this.grid['top'][1] == "X" && this.grid['top'][2] == "X") || (this.grid['top'][0] == "X" && this.grid['mid'][0] == "X" && this.grid['bottom'][0] == "X") || (this.grid['top'][1] == "X" && this.grid['mid'][1] == "X" && this.grid['bottom'][1] == "X") || (this.grid['top'][2] == "X" && this.grid['bottom'][2] == "X" && this.grid['bottom'][3] == "X") || (this.grid['mid'][0] == "X" && this.grid['mid'][1] == "X" && this.grid['mid'][2] == "X") || (this.grid['bottom'][0] == "X" && this.grid['bottom'][1] == "X" && this.grid['bottom'][2] == "X") || (this.grid['bottom'][0] == "X" && this.grid['mid'][1] == "X" && this.grid['top'][2] == "X") || (this.grid['top'][0] == "X" && this.grid['mid'][1] == "X" && this.grid['bottom'][2] == "X")) {
            message.channel.send(this.secondPlayer+" just won the game.");
            this.reset();
        }
        if ((this.grid['top'][0] == "O" && this.grid['top'][1] == "O" && this.grid['top'][2] == "O") || (this.grid['top'][0] == "O" && this.grid['mid'][0] == "O" && this.grid['bottom'][0] == "O") || (this.grid['top'][1] == "O" && this.grid['mid'][1] == "O" && this.grid['bottom'][1] == "O") || (this.grid['top'][2] == "O" && this.grid['bottom'][2] == "O" && this.grid['bottom'][3] == "O") || (this.grid['mid'][0] == "O" && this.grid['mid'][1] == "O" && this.grid['mid'][2] == "O") || (this.grid['bottom'][0] == "O" && this.grid['bottom'][1] == "O" && this.grid['bottom'][2] == "O") || (this.grid['bottom'][0] == "O" && this.grid['mid'][1] == "O" && this.grid['top'][2] == "O") || (this.grid['top'][0] == "O" && this.grid['mid'][1] == "O" && this.grid['bottom'][2] == "O")) {
            message.channel.send(this.firstPlayer+" just won the game.");
            this.reset();

        }
    }
    play(message) {
        switch (this.statut) {
            case 0:
                this.statut = 1;
                this.firstPlayer = message.author;
                message.channel.send(message.author + " is now waiting for a second player");
                break;
            case 1:
                if (message.author.id != this.firstPlayer) {
                    this.turn = this.firstPlayer.id;
                    this.secondPlayer = message.author;
                    message.channel.send(message.author + " is the second play. He get the X \n" + this.firstPlayer + " get the O.");
                    this.statut = 3;
                    this.display(message);
                } else {
                    message.channel.send("You can't play against yourself");
                }
                break;
        }
    }

    insertPosition(position, message) {
        if (message.author.id == this.turn) {
            if (this.turn == this.firstPlayer.id) {
                console.log("Tour du joueur 1");
                this.addSign(position, "O");
                this.turn = this.secondPlayer.id;
            } else {
                console.log("Tour du joueur 2");
                this.addSign(position, "X");
                this.turn = this.firstPlayer.id;
            }
            this.display(message);
        } else {
            message.channel.send("It's not your turn.");
        }
    }

    addSign(position, value) {
        switch (position) {
            case "11":
                this.grid['top'][0] = value;
                break;
            case "12":
                this.grid['top'][1] = value;
                break;
            case "13":
                this.grid['top'][2] = value;
                break;
            case "21":
                this.grid['mid'][0] = value;
                break;
            case "22":
                this.grid['mid'][1] = value;
                break;
            case "23":
                this.grid['mid'][2] = value;
                break;
            case "31":
                this.grid['bottom'][0] = value;
                break;
            case "32":
                this.grid['bottom'][1] = value;
                break;
            case "33":
                this.grid['top'][3] = value;
                break;
        }
    }
    reset(message=null) {
        this.defaultSigne = 'O';
        this.grid = this.defaultGrid();
        this.statut = 0;
        this.firstPlayer = null;
        this.secondPlayer = null;
        this.turn = null;
        if(message!=null){
            message.channel.send('Game has been reseted.');
        }
    }
}
module.exports = new Morpion();
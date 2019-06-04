class Morpion {
    constructor() {
        this.reset();
    }

    defaultGrid() {
        this.empty = '   '
        return {
            "top": [this.empty, this.empty, this.empty],
            "mid": [this.empty, this.empty, this.empty],
            "bottom": [this.empty, this.empty, this.empty],
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
                if(!this.addSign(position, "O")){
                    message.channel.send("You can't play here.");
                }else{
                    this.turn = this.secondPlayer.id;
                }
            } else {
                if(!this.addSign(position, "X")){
                    message.channel.send("You can't play here.");
                }else{
                    this.turn = this.firstPlayer.id;
                }
            }
            this.display(message);
        } else {
            message.channel.send("It's not your turn.");
        }
    }

    addSign(position, value) {
        let isAdded = false;
        switch (position) {
            case "11":
                if(this.grid['top'][0]==this.empty){
                    this.grid['top'][0] = value;
                    isAdded = true;
                }
                break;
            case "12":
                if( this.grid['top'][1]==this.empty){
                    this.grid['top'][1] = value;
                    isAdded = true;
                }
                break;
            case "13":
                if( this.grid['top'][2]==this.empty){
                    this.grid['top'][2] = value;
                    isAdded = true;
                }
                break;            
            case "21":
                if( this.grid['mid'][0]==this.empty){
                    this.grid['mid'][0] = value;
                    isAdded = true;
                }
                break;  
            case "22":
                if( this.grid['mid'][1]==this.empty){
                    this.grid['mid'][1] = value;
                    isAdded = true;
                }
                break;  
            case "23":
                if( this.grid['mid'][2]==this.empty){
                    this.grid['mid'][2] = value;
                    isAdded = true;
                }
                break; 
            case "31":
                if( this.grid['bottom'][0]==this.empty){
                    this.grid['bottom'][0] = value;
                    isAdded = true;
                }
                break; 
            case "32":
                if( this.grid['bottom'][1]==this.empty){
                    this.grid['bottom'][1] = value;
                    isAdded = true;
                }
                break; 
            case "33":
                if( this.grid['bottom'][2]==this.empty){
                    this.grid['bottom'][2] = value;
                    isAdded = true;
                }
                break; 
        }
        return isAdded;
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
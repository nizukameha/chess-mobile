export class Pion{
    name = 'Pion'

    constructor(white:boolean = true){
        if(white){
            this.name += 'Blanc';
        } else {
            this.name += 'Noir';
        }
    }

    moves(row:number, col:number){

    }
}
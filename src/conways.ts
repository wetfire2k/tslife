import { ICell } from './icell';

export class ConwayLifeCell implements ICell<number> {

    private _status: number;

    public constructor( status: number = 0 ){
        this._status = status;
    }

    public get status(): number {
        return this._status;
    }

    public set status( value: number){
        if( value == 0 || value == 1){

            this._status = value;

        }else {
            throw "Lo stato deve essere 1 o 0";
        }
    }

    public get alive() : boolean {
        return this.status == 1;
    }

    public evolve ( neighbours: ConwayLifeCell[] ) : number {
         /**
         * "Conway's Life Game: \n" +
                "1. Any live cell with fewer than two live neighbours dies, as if by loneliness.\n" +
                "2. Any live cell with more than three live neighbours dies, as if by overcrowding.\n" +
                "3. Any live cell with two or three live neighbours lives, unchanged, to the next generation.\n" +
                "4. Any dead cell with exactly three live neighbours comes to life.";
         */
        
        var alives  = -this.status; //Devo levare la cella attuale dal conto
        neighbours.forEach( v => {
           if(v && v.alive){
              alives++;
           }
         });        
         if( this.alive && alives < 2){
             return 0;
         }

         if( this.alive && alives > 3 ){
            return 0;
        }

        if( this.alive && (alives == 3 || alives == 2)  ){
            return 1;
        }

        if( !this.alive && alives == 3  ){
            return 1;
        }

        return this.status;
    }

}
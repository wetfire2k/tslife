import { ICell } from './icell';


export class World<U, T extends ICell<U>> {

    private _layer: number = 0;
    private _space: T[][][] = [[], []];

    private _width: number;
    private _height: number;

    public radius: number = 1;
    /**
     * Dal momento che tutte le informazioni sui tipi vengo rimosse nella conversione in javascript dobbiamo passare le informazioni sul tipo
     * nel costruttore.
     * con "private _cellType: new () => T" oltre a dichiarare il campo nella firma del meteodo lo aggiungiamo anche ai membri della classe.
    */
    public constructor(private _cellType: new () => T, width: number, height: number, radius: number = 1) {
        this._width = width;
        this._height = height;

        this._space[0] = new Array(this._width);
        this._space[1] = new Array(this._width);

        for (var x: number = 0; x < this._width; x++) {
            this._space[0][x] = new Array(this._height);
            this._space[1][x] = new Array(this._height);
            for (var y: number = 0; y < this._height; y++) {
                this._space[0][x][y] = this.getNew();
                this._space[1][x][y] = this.getNew();
            }
        }
    }

    /** metodo per instanziare una nuova cella */
    private getNew(): T {
        return new this._cellType();
    }

    public get width() {
        return this._width;
    }

    public get height() {
        return this._height;
    }

    public getCell(x: number, y: number): U {
        return this._space[this._layer][x][y].status;
    }

    public setCell(x: number, y: number, value: U): void {
        this._space[this._layer][x][y].status = value;
    }

    public swap() {
        this._layer = 1 - this._layer;
    }

    public evolve() {

        let neighbours: Array<T> = new Array((2 * this.radius + 1) * (2 * this.radius + 1));
        let next_layer = 1 - this._layer;

        //Elaboriamo lo stato di tutte le celle dello spazio.
        for (var x: number = 0; x < this._width; x++) {
            for (var y: number = 0; y < this._height; y++) {
                /** per ogni cella (x,y) calcoliamo i vicini */
                let position = 0;
                for (var i = x - this.radius; i <= x + this.radius; i++) {
                    for (var j = y - this.radius; j <= y + this.radius; j++) {
                        let a = (i + this._width) % this._width;
                        let b = (j + this._height) % this._height;
                        neighbours[position] = this._space[this._layer][a][b];
                        position++;
                    }
                }
                this._space[next_layer][x][y].status = this._space[this._layer][x][y].evolve(neighbours);
            }
        }

        this.swap();
    }

    public toString(): string {

        let ret = "";
        for (var y: number = 0; y < this._height; y++) {
            for (var x: number = 0; x < this._width; x++) {
                ret += this.getCell(x, y);
            }
            ret += "\n";
        }

        return ret;

    }

}
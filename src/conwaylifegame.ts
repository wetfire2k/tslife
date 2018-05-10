import { ConwayLifeCell } from './conways';
import { World } from './world';
import { Player } from './player';
export default class ConwayLifeGame extends Player {

    private _frames: number = 0;
    private _world: World<number, ConwayLifeCell> = null;
    private _canvas: HTMLCanvasElement = null;

    public constructor(id: string, width: number, height: number) {
        super();
        this._world = new World<number, ConwayLifeCell>(ConwayLifeCell, width, height);
        this._canvas = document.getElementById(id) as HTMLCanvasElement;
    }

    public init() {
        this._frames = 0;

        for (let x = 0; x < this._world.width; x++) {
            for (let y = 0; y < this._world.height; y++) {
                this._world.setCell(x, y, Math.round(Math.random()*1) );
            }
        }
        ///Glider
        this._world.setCell(20, 21, 1);
        this._world.setCell(21, 21, 1);
        this._world.setCell(22, 21, 1);
        this._world.setCell(22, 22, 1);
        this._world.setCell(21, 23, 1);
    }


    public update() {
        this._world.evolve();
        this._frames++;
    }


    public draw() {

        let ctx = this._canvas.getContext('2d');

        let w = this._canvas.width / this._world.width;
        let h = this._canvas.height / this._world.height;

        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, this._canvas.width, this._canvas.height)
        ctx.fillStyle = '#000';
        for (let x = 0; x < this._world.width; x++) {
            for (let y = 0; y < this._world.height; y++) {
                if (this._world.getCell(x, y) == 1) {
                    ctx.fillRect(x * w, (this._world.height - y) * h, w, h)
                }
            }
        }

    }

}
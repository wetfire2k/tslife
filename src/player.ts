export abstract class Player {

    private _running: boolean = false;
    private _reset: boolean = true;

    private step(): void {
        if (this._running) {
            this.update();
            this.draw();
            let me = this;
            if (typeof (window) !== 'undefined' && window.requestAnimationFrame) {
                setTimeout(function () {
                    window.requestAnimationFrame(function () { me.step() });
                }, 100);
            } else {
                setTimeout(function () { me.step() }, 10);
            }
        }
    }

    public play() {
        if (!this._running) {

            if (this._reset) {
                this.init();
            }

            this._running = true;
            this._reset = false;
            this.step();
        }
    }

    public pause() {
        this._reset = false;
        this._running = false;
    }


    public stop() {
        this._reset = true;
        this._running = false;
    }


    //Metodo chiamato ogni volta che viene riavviata la simulazione
    public abstract init(): void;
    //Metodo chiamato per aggiornare lo stato della simulazione
    public abstract update(): void;
    //Metodo invocato per mostrare il risultato della simulazione
    public abstract draw(): void;

}